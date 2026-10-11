// Behavioural replica of the Dynamoid social-navigation policies, for the portfolio's Autonomy Lab.
//
// WHAT THIS IS: a small hand-written controller built on the same observation idea the Stage 5 teacher uses (a
// 24-bearing time-to-collision scan), plus the camera limits and memory of the depth-vision model. It reproduces
// how the learned policies behave (full-speed steering, no stopping, camera blind spots, memory) in a few hundred
// lines with no network weights, so it is cheap to host. The learned networks run in Isaac Sim, not here.
//
// Numbers that come from the real work: robot disc 0.6067 m, pedestrian radius 0.30 m, contact 0.9067 m, 8 m wide
// corridor, camera 120 deg / 2.88 m mounted 0.398 m ahead of the root and 9 cm off the floor, 20 Hz policy,
// 24-bearing / 200 deg / 3 s TTC scan, and a velocity response fitted to the recorded Isaac Sim run
// (forward: ~0.31 s lag, 0.87 gain, one-step delay; turn: ~0.17 s lag, 0.57 gain).

export const ROBOT_R = 0.6067;
export const PED_R = 0.3;
export const CONTACT_R = ROBOT_R + PED_R;
export const CAM_FWD = 0.398;
export const CAM_FOV = (120 * Math.PI) / 180;
export const CAM_RANGE = 2.88;
export const CAM_H = 0.09;
export const N_BEARINGS = 24;
export const ARC = (200 * Math.PI) / 180;
export const HORIZON = 3.0;
export const CTRL_DT = 1 / 20;
export const CORRIDOR_HALF_W = 4.0;
export const WALL_H = 1.2;
export const PED_H = 1.7;

export type Mode = 'mem6999' | 'ttc699' | 'distance';
export type Kind = 'corridor' | 'arena';
export type Outcome = 'none' | 'arrived' | 'contact' | 'wall' | 'timeout';

export interface Vec { x: number; y: number }
export interface Ped {
  id: number; x: number; y: number; vx: number; vy: number;
  tx: number; ty: number; speed: number; pause: number; phase: number; polite: boolean;
}
export interface Track { id: number; x: number; y: number; vx: number; vy: number; seenAt: number }
export interface Robot { x: number; y: number; th: number; v: number; w: number }
export interface Mission {
  target: Vec; path: Vec[]; cum: number[]; t0: number; outcome: Outcome; docking: boolean; graceUntil: number;
}
export interface Stats { arrived: number; contacts: number; walls: number; timeouts: number }

// behaviour knobs (tuned against the headless test in scripts/test-nav.ts)
export const TUNE = { mrg6999: 0.35, mrg699: 0.3, wClear: 3.2, kw: 3.4, slow699: 0.5, memOff: 0.25, memOn: 3.0, rev699: 0.18, yieldCorridor: 0.35, yieldArena: 0.88, darc: (300 * Math.PI) / 180 };

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));
const wrap = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class Sim {
  kind: Kind;
  mode: Mode = 'mem6999';
  memory = true;
  rng: () => number;
  // world extent (metres): corridor is 8 m wide, arena is open
  xMin: number; xMax: number; yMin: number; yMax: number;
  robot: Robot;
  dock: Vec;
  peds: Ped[] = [];
  tracks = new Map<number, Track>();
  seen = new Set<number>();
  mission: Mission | null = null;
  time = 0;
  scan = new Float32Array(N_BEARINGS).fill(1);
  memSectors = new Float32Array(24);
  trail: Vec[] = [];
  stats: Stats = { arrived: 0, contacts: 0, walls: 0, timeouts: 0 };
  battery = 100;
  charging = false;
  info = { minDist: Infinity, minTtc: Infinity, cmdV: 0, cmdW: 0, bearing: 0, blocked: false };
  private cmdQueue: [number, number][] = [[0, 0]];
  private accum = 0;
  private lastBearing = 0;
  private trailT = 0;
  private nextId = 1;

  constructor(kind: Kind, seed = 1) {
    this.kind = kind;
    this.rng = mulberry32(seed);
    if (kind === 'corridor') {
      this.xMin = -15; this.xMax = 15; this.yMin = -CORRIDOR_HALF_W; this.yMax = CORRIDOR_HALF_W;
      this.robot = { x: -10.8, y: 0, th: 0, v: 0, w: 0 };           // far enough from the end wall for the chase cam
      this.dock = { x: -11.5, y: 0 };
    } else {
      this.xMin = -10; this.xMax = 10; this.yMin = -6; this.yMax = 6;
      this.robot = { x: -5.8, y: 0, th: 0, v: 0, w: 0 };
      this.dock = { x: -6.5, y: 0 };
    }
    const n = kind === 'corridor' ? 3 : 8;
    for (let i = 0; i < n; i++) this.addPed();
  }

  private yieldP(): number { return this.kind === 'corridor' ? TUNE.yieldCorridor : TUNE.yieldArena; }

  // ---------------------------------------------------------------- pedestrians (non-reactive, as in training)
  addPed(): void {
    const r = this.rng;
    let x = 0, y = 0;
    for (let k = 0; k < 40; k++) {
      x = this.xMin + 1.5 + r() * (this.xMax - this.xMin - 3);
      y = this.yMin + 1 + r() * (this.yMax - this.yMin - 2);
      if (Math.hypot(x - this.robot.x, y - this.robot.y) > 3.5) break;
    }
    const p: Ped = { id: this.nextId++, x, y, vx: 0, vy: 0, tx: x, ty: y, speed: 0, pause: 0, phase: r() * 6.28, polite: r() < this.yieldP() };
    this.retarget(p);
    this.peds.push(p);
  }

  private retarget(p: Ped): void {
    const r = this.rng;
    if (this.kind === 'corridor') {
      // counter-flow along the corridor: the head-on encounters the policy was trained on
      const dir = r() < 0.5 ? -1 : 1;
      p.speed = 0.7 + r() * 0.6;
      p.tx = dir > 0 ? this.xMax - 1 : this.xMin + 1;
      p.ty = (r() * 2 - 1) * (CORRIDOR_HALF_W - 0.9);
    } else {
      p.speed = 1.0 + r() * 0.5;                               // training range 1.0-1.5 m/s
      p.tx = this.xMin + 1 + r() * (this.xMax - this.xMin - 2);
      p.ty = this.yMin + 1 + r() * (this.yMax - this.yMin - 2);
    }
    const dx = p.tx - p.x, dy = p.ty - p.y, d = Math.hypot(dx, dy) || 1;
    p.vx = (dx / d) * p.speed;
    p.vy = (dy / d) * p.speed;
  }

  // steer a few pedestrians onto genuine encounter courses with the route (no teleporting: they just change heading)
  private stageEncounters(target: Vec): void {
    const r = this.rng;
    const dx = target.x - this.robot.x, dy = target.y - this.robot.y, L = Math.hypot(dx, dy) || 1;
    const ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
    const n = Math.min(this.peds.length, this.kind === 'corridor' ? 2 : 3);
    for (let i = 0; i < n; i++) {
      const p = this.peds[i];
      const s = Math.min(L - 1, 4 + r() * 5), lat = (r() * 2 - 1) * 1.2;
      const qx = this.robot.x + ux * s + nx * lat, qy = this.robot.y + uy * s + ny * lat;   // meeting point on the route
      const d = Math.hypot(qx - p.x, qy - p.y) || 1, sp = 0.8 + r() * 0.5;
      p.speed = sp; p.vx = ((qx - p.x) / d) * sp; p.vy = ((qy - p.y) / d) * sp;
      p.tx = p.x + (p.vx / sp) * 60; p.ty = p.y + (p.vy / sp) * 60;       // keep walking on this course until a bound
      p.pause = 0;
    }
  }

  private stepPeds(dt: number): void {
    for (const p of this.peds) {
      if (p.pause > 0) { p.pause -= dt; p.vx = 0; p.vy = 0; if (p.pause <= 0) this.retarget(p); continue; }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      const hitX = p.x < this.xMin + 0.4 || p.x > this.xMax - 0.4;
      const hitY = p.y < this.yMin + 0.45 || p.y > this.yMax - 0.45;
      const arrived = Math.hypot(p.tx - p.x, p.ty - p.y) < 0.5;
      if (hitX || hitY || arrived) {
        p.x = clamp(p.x, this.xMin + 0.4, this.xMax - 0.4);
        p.y = clamp(p.y, this.yMin + 0.45, this.yMax - 0.45);
        if (this.kind === 'arena' && this.rng() < 0.4) p.pause = 0.3 + this.rng() * 1.2;
        else this.retarget(p);
      }
      if (this.kind === 'corridor') {                               // slow weave, like the real pedestrians
        p.phase += dt * 1.1;
        p.vy += Math.sin(p.phase) * 0.15 * dt;
      }
      // game rig: a parked robot is a person-sized obstacle people walk around, and "polite" pedestrians sidestep a
      // robot that is heading at them. TUNE.yield* is the share of polite pedestrians, i.e. the demo's difficulty knob.
      const parked = !this.mission || this.mission.outcome !== 'none' || Math.abs(this.robot.v) < 0.12;
      const dx = p.x - this.robot.x, dy = p.y - this.robot.y, d = Math.hypot(dx, dy);
      if (parked && d < 1.7 && d > 0.01) { p.x += (dx / d) * 0.9 * dt; p.y += (dy / d) * 0.9 * dt; }
      else if (p.polite && d < 2.2) {
        const lat = -Math.sin(this.robot.th) * dx + Math.cos(this.robot.th) * dy;   // + = pedestrian is on the robot's left
        const sgn = lat >= 0 ? 1 : -1;
        p.x += -Math.sin(this.robot.th) * sgn * 1.7 * dt;
        p.y += Math.cos(this.robot.th) * sgn * 1.7 * dt;
      }
    }
  }

  // ---------------------------------------------------------------- mission / path
  dispatch(target: Vec, docking = false): void {
    const m = this.kind === 'corridor' ? CORRIDOR_HALF_W - ROBOT_R - 0.15 : 5.4;
    const t = { x: clamp(target.x, this.xMin + 1, this.xMax - 1), y: clamp(target.y, -m, m) };
    const dx = t.x - this.robot.x, dy = t.y - this.robot.y, L = Math.hypot(dx, dy);
    const n = Math.max(2, Math.ceil(L / 0.16) + 1);                  // vertex spacing ~0.16 m, as in training
    const path: Vec[] = [], cum: number[] = [];
    for (let i = 0; i < n; i++) {
      path.push({ x: this.robot.x + (dx * i) / (n - 1), y: this.robot.y + (dy * i) / (n - 1) });
      cum.push((L * i) / (n - 1));
    }
    this.mission = { target: t, path, cum, t0: this.time, outcome: 'none', docking, graceUntil: this.time + 1.2 };
    this.charging = false;
    this.tracks.clear();
    this.lastBearing = 0;
    this.cmdQueue = [[0, 0]];
    this.trail = [];
    this.stageEncounters(t);
    for (const p of this.peds) p.polite = this.rng() < this.yieldP();
  }

  clearMission(): void { this.mission = null; }

  // pure-pursuit point 1.2 m ahead on the path (nearest-vertex projection, as in the training command term)
  private lookahead(m: Mission): Vec {
    let bi = 0, bd = Infinity;
    for (let i = 0; i < m.path.length; i++) {
      const d = Math.hypot(m.path[i].x - this.robot.x, m.path[i].y - this.robot.y);
      if (d < bd) { bd = d; bi = i; }
    }
    const tgt = m.cum[bi] + 1.2;
    let k = m.cum.findIndex((c) => c >= tgt);
    if (k < 0) k = m.path.length - 1;
    const j = Math.min(bi + 1, m.path.length - 1);
    let tx = m.path[j].x - m.path[bi].x, ty = m.path[j].y - m.path[bi].y;
    if (j === bi) { tx = m.path[bi].x - m.path[Math.max(bi - 1, 0)].x; ty = m.path[bi].y - m.path[Math.max(bi - 1, 0)].y; }
    const tl = Math.hypot(tx, ty) || 1;
    tx /= tl; ty /= tl;
    const over = Math.max(0, (this.robot.x - m.path[bi].x) * tx + (this.robot.y - m.path[bi].y) * ty);
    const left = Math.max(0, tgt - m.cum[k]) + over;
    return { x: m.path[k].x + tx * left, y: m.path[k].y + ty * left };
  }

  // ---------------------------------------------------------------- sensing
  private toRobot(px: number, py: number): Vec {
    const c = Math.cos(this.robot.th), s = Math.sin(this.robot.th);
    const dx = px - this.robot.x, dy = py - this.robot.y;
    return { x: c * dx + s * dy, y: -s * dx + c * dy };
  }

  private inCamera(p: Ped): boolean {
    const cx = this.robot.x + Math.cos(this.robot.th) * CAM_FWD, cy = this.robot.y + Math.sin(this.robot.th) * CAM_FWD;
    const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy);
    if (d > CAM_RANGE + PED_R) return false;
    const ang = Math.abs(wrap(Math.atan2(dy, dx) - this.robot.th));
    return ang < CAM_FOV / 2 + Math.atan2(PED_R, Math.max(d, 0.3));
  }

  // known pedestrians for the current mode: ground truth (teacher) or camera + memory (depth-vision model)
  private known(): { x: number; y: number; vx: number; vy: number; w: number }[] {
    this.seen.clear();
    if (this.mode === 'ttc699' || this.mode === 'distance') {
      return this.peds.map((p) => ({ x: p.x, y: p.y, vx: p.vx, vy: p.vy, w: 1 }));
    }
    const out: { x: number; y: number; vx: number; vy: number; w: number }[] = [];
    for (const p of this.peds) {
      if (this.inCamera(p)) {
        this.seen.add(p.id);
        this.tracks.set(p.id, { id: p.id, x: p.x, y: p.y, vx: p.vx, vy: p.vy, seenAt: this.time });
        out.push({ x: p.x, y: p.y, vx: p.vx, vy: p.vy, w: 1 });
      }
    }
    this.memSectors.fill(0);
    const keep = this.memory ? TUNE.memOn : TUNE.memOff;
    for (const t of this.tracks.values()) {
      if (this.seen.has(t.id)) continue;
      const age = this.time - t.seenAt;
      if (age > keep) { this.tracks.delete(t.id); continue; }
      // dead-reckon the remembered pedestrian forward, with confidence fading over the memory horizon
      const x = t.x + t.vx * age, y = t.y + t.vy * age, conf = 1 - age / (keep + 0.2);
      out.push({ x, y, vx: t.vx, vy: t.vy, w: conf });
      if (this.memory) {
        const r = this.toRobot(x, y), d = Math.hypot(r.x, r.y);
        const sec = clamp(Math.floor(((Math.atan2(r.y, r.x) + Math.PI) / (2 * Math.PI)) * 24), 0, 23);
        this.memSectors[sec] = Math.max(this.memSectors[sec], clamp(1 - d / 4, 0, 1) * conf);
      }
    }
    return out;
  }

  // time to contact for a robot travelling along bearing b at 1 m/s (the Stage 5 teacher's observation)
  private ttcAlong(b: number, ks: { x: number; y: number; vx: number; vy: number; w: number }[], radius: number): number {
    const qx = Math.cos(b), qy = Math.sin(b);
    const c = Math.cos(this.robot.th), s = Math.sin(this.robot.th);
    let best = Infinity;
    for (const k of ks) {
      const r = this.toRobot(k.x, k.y);
      const ux = c * k.vx + s * k.vy, uy = -s * k.vx + c * k.vy;    // pedestrian velocity in the robot frame
      const vx = ux - qx, vy = uy - qy;
      const vv = Math.max(vx * vx + vy * vy, 1e-6), pv = r.x * vx + r.y * vy, pp = r.x * r.x + r.y * r.y;
      const disc = Math.max(0, pv * pv - vv * (pp - radius * radius));
      const tca = Math.max(0, -pv / vv);
      const miss = Math.hypot(r.x + vx * tca, r.y + vy * tca);
      const th = (-pv - Math.sqrt(disc)) / vv;
      if (miss <= radius && th >= 0) best = Math.min(best, th / Math.max(k.w, 0.2));
    }
    return best;
  }

  // free distance to the walls / fence along a world direction
  private wallFree(b: number): number {
    const a = this.robot.th + b, dx = Math.cos(a), dy = Math.sin(a);
    const m = ROBOT_R + 0.25;
    let t = Infinity;
    if (dy > 1e-6) t = Math.min(t, (this.yMax - m - this.robot.y) / dy);
    if (dy < -1e-6) t = Math.min(t, (this.yMin + m - this.robot.y) / dy);
    if (dx > 1e-6) t = Math.min(t, (this.xMax - m - this.robot.x) / dx);
    if (dx < -1e-6) t = Math.min(t, (this.xMin + m - this.robot.x) / dx);
    return Math.max(0, t);
  }

  // ---------------------------------------------------------------- controller (20 Hz)
  private decide(): void {
    const m = this.mission;
    const R = this.robot;
    if (!m || m.outcome !== 'none') { this.cmdQueue.push([0, 0]); this.info.cmdV = 0; this.info.cmdW = 0; return; }

    const ks = this.known();
    // the displayed scan is the teacher's 24-bearing, 200 deg, 3 s observation
    for (let i = 0; i < N_BEARINGS; i++) {
      const b = -ARC / 2 + (ARC * i) / (N_BEARINGS - 1);
      this.scan[i] = clamp(this.ttcAlong(b, ks, CONTACT_R) / HORIZON, 0, 1);
    }
    let minD = Infinity;
    for (const p of this.peds) minD = Math.min(minD, Math.hypot(p.x - R.x, p.y - R.y));
    this.info.minDist = minD;

    const tdist = Math.hypot(m.target.x - R.x, m.target.y - R.y);
    // goal direction: pure-pursuit point on the global path (vision model) or the clipped goal vector (teacher)
    const g = this.mode === 'mem6999' ? this.lookahead(m) : (() => {
      const dx = m.target.x - R.x, dy = m.target.y - R.y, d = Math.hypot(dx, dy) || 1, s = Math.min(1, 3 / d);
      return { x: R.x + dx * s, y: R.y + dy * s };
    })();
    const gr = this.toRobot(g.x, g.y);
    const phi = Math.atan2(gr.y, gr.x);

    let cmdV = 0, cmdW = 0;
    if (this.mode === 'distance') {
      // illustrative baseline: a distance penalty. Any pedestrian inside 2.2 m and the robot stops (the frozen-robot trap)
      if (minD < 2.2) { cmdV = 0; cmdW = 0; this.info.blocked = true; }
      else { this.info.blocked = false; cmdW = clamp(3 * phi, -3, 3); cmdV = 1.25 * Math.max(0.3, Math.cos(phi)); }
    } else {
      const margin = CONTACT_R + (this.mode === 'mem6999' ? TUNE.mrg6999 : TUNE.mrg699);
      let best = Infinity, bb = 0, frontClear = 1;
      const NB = 91, DARC = TUNE.darc;                              // decide over a wider arc than the displayed scan
      for (let i = 0; i < NB; i++) {
        const b = -DARC / 2 + (DARC * i) / (NB - 1);
        const cp = clamp(this.ttcAlong(b, ks, margin) / HORIZON, 0, 1);
        const cw = clamp(this.wallFree(b) / 3.0, 0, 1);
        const c = Math.min(cp, cw);
        if (Math.abs(b) < 0.12) frontClear = c;
        const cost = 1.0 * (1 - Math.cos(b - phi)) + TUNE.wClear * (1 - c) * (1 - c) + 0.12 * Math.abs(b) / Math.PI
          - 0.18 * Math.exp(-(((b - this.lastBearing) / 0.3) ** 2));
        if (cost < best) { best = cost; bb = b; }
      }
      this.lastBearing = bb;
      this.info.bearing = bb;
      this.info.blocked = frontClear < 0.35;
      cmdW = clamp(TUNE.kw * bb, -3, 3);
      cmdV = 1.25 * Math.max(0.28, Math.cos(bb));
      if (this.mode === 'ttc699') {
        // the teacher eases off and, when truly boxed in, backs away; the vision model keeps full speed
        cmdV *= TUNE.slow699 + (1 - TUNE.slow699) * frontClear;
        if (frontClear < TUNE.rev699 && Math.abs(bb) > 1.1) cmdV = -0.45;
      }
    }
    // roll the speed off over the last 1.5 m
    if (tdist < 1.5) cmdV *= clamp((tdist - 0.3) / 1.2, 0.2, 1);
    this.cmdQueue.push([cmdV, cmdW]);
    this.info.cmdV = cmdV;
    this.info.cmdW = cmdW;
  }

  // ---------------------------------------------------------------- plant + outcomes
  step(dt: number): void {
    dt = Math.min(dt, 0.1);
    this.time += dt;
    this.stepPeds(dt);
    const R = this.robot;

    this.accum += dt;
    while (this.accum >= CTRL_DT) { this.accum -= CTRL_DT; this.decide(); }
    // one control step (50 ms) of command delay on speed, then first-order responses fitted to the Isaac recordings
    const [cv] = this.cmdQueue.length > 1 ? this.cmdQueue[this.cmdQueue.length - 2] : this.cmdQueue[0];
    const [, cw] = this.cmdQueue[this.cmdQueue.length - 1];
    while (this.cmdQueue.length > 3) this.cmdQueue.shift();
    R.v += ((0.874 * cv - R.v) / 0.314) * dt;
    R.w += ((0.57 * cw - R.w) / 0.17) * dt;
    R.th += R.w * dt;
    R.x += Math.cos(R.th) * R.v * dt;
    R.y += Math.sin(R.th) * R.v * dt;

    this.trailT += dt;
    if (this.trailT > 0.1) {
      this.trailT = 0;
      if (this.mission && this.mission.outcome === 'none') this.trail.push({ x: R.x, y: R.y });
      if (this.trail.length > 400) this.trail.shift();
    }

    // battery
    if (this.charging) this.battery = Math.min(100, this.battery + 6 * dt);
    else if (Math.abs(R.v) > 0.1) this.battery = Math.max(0, this.battery - 0.45 * dt);

    const m = this.mission;
    if (m && m.outcome === 'none') {
      // outcomes: same predicates as the real environment (disc contact 0.9067 m, wall contact, goal, timeout)
      let minTtc = Infinity;
      for (const p of this.peds) {
        const dx = p.x - R.x, dy = p.y - R.y, d = Math.hypot(dx, dy);
        if (this.time > m.graceUntil && d <= CONTACT_R) { m.outcome = 'contact'; this.stats.contacts++; break; }
        const rvx = p.vx - Math.cos(R.th) * R.v, rvy = p.vy - Math.sin(R.th) * R.v;
        const closing = -(dx * rvx + dy * rvy) / Math.max(d, 0.01);
        if (closing > 0.05) minTtc = Math.min(minTtc, (d - CONTACT_R) / closing);
      }
      this.info.minTtc = minTtc;
      if (m.outcome === 'none' && (R.y + ROBOT_R > this.yMax - 0.0 || R.y - ROBOT_R < this.yMin + 0.0)) {
        m.outcome = 'wall'; this.stats.walls++;
      }
      if (m.outcome === 'none' && Math.hypot(m.target.x - R.x, m.target.y - R.y) < 0.45) {
        m.outcome = 'arrived'; this.stats.arrived++;
        if (m.docking) this.charging = true;
      }
      if (m.outcome === 'none' && this.time - m.t0 > 90) { m.outcome = 'timeout'; this.stats.timeouts++; }
    } else {
      this.info.minTtc = Infinity;
    }
  }

  // ---------------------------------------------------------------- depth feed (what the camera sees)
  // Analytic render of the 84x84, 120 deg depth image the vision policy receives: floor ramp, 1.2 m walls, 1.7 m boxes.
  depthImage(out: Uint8ClampedArray, n = 84): void {
    const f = n / 2 / Math.tan(CAM_FOV / 2);
    const cos = Math.cos(this.robot.th), sin = Math.sin(this.robot.th);
    const cx = this.robot.x + cos * CAM_FWD, cy = this.robot.y + sin * CAM_FWD;
    const hits: [number, number][] = [];
    for (let u = 0; u < n; u++) {
      const xc = (u + 0.5 - n / 2) / f;                            // rightward in the camera
      const dx = cos + sin * xc, dy = sin - cos * xc;               // world ray for forward-component 1 (t = depth)
      hits.length = 0;
      if (this.kind === 'corridor' || true) {
        if (dy > 1e-9) hits.push([(this.yMax - cy) / dy, WALL_H]);
        if (dy < -1e-9) hits.push([(this.yMin - cy) / dy, WALL_H]);
      }
      for (const p of this.peds) {                                   // axis-aligned 0.6 x 0.6 boxes, like the simulator's
        let t0 = -Infinity, t1 = Infinity, ok = true;
        for (const [o, d, lo, hi] of [[cx, dx, p.x - PED_R, p.x + PED_R], [cy, dy, p.y - PED_R, p.y + PED_R]] as const) {
          if (Math.abs(d) < 1e-9) { if (o < lo || o > hi) ok = false; continue; }
          const a = (lo - o) / d, b = (hi - o) / d;
          t0 = Math.max(t0, Math.min(a, b)); t1 = Math.min(t1, Math.max(a, b));
        }
        if (ok && t1 > Math.max(t0, 0.05)) hits.push([Math.max(t0, 0.05), PED_H]);
      }
      hits.sort((a, b) => a[0] - b[0]);
      for (let v = 0; v < n; v++) {
        const yc = (v + 0.5 - n / 2) / f;                           // downward in the camera
        let z = Infinity;
        if (yc > 1e-6) z = CAM_H / yc;                               // floor
        for (const [t, h] of hits) {
          if (t >= z) break;
          if (CAM_H - yc * t <= h && CAM_H - yc * t >= 0) { z = t; break; }
        }
        const d = z > CAM_RANGE ? 1 : clamp(z / CAM_RANGE, 0, 1);    // beyond 2.88 m the sensor returns nothing
        const [r, g, b] = turbo(d);
        const o = (v * n + u) * 4;
        out[o] = r; out[o + 1] = g; out[o + 2] = b; out[o + 3] = 255;
      }
    }
  }
}

// Google's Turbo colormap (polynomial approximation)
export function turbo(x: number): [number, number, number] {
  x = clamp(x, 0, 1);
  const r = 0.13572138 + x * (4.6153926 + x * (-42.66032258 + x * (132.13108234 + x * (-152.94239396 + x * 59.28637943))));
  const g = 0.09140261 + x * (2.19418839 + x * (4.84296658 + x * (-14.18503333 + x * (4.27729857 + x * 2.82956604))));
  const b = 0.1066733 + x * (12.64194608 + x * (-60.58204836 + x * (110.36276771 + x * (-89.90310912 + x * 27.34824973))));
  return [clamp(r, 0, 1) * 255, clamp(g, 0, 1) * 255, clamp(b, 0, 1) * 255];
}
