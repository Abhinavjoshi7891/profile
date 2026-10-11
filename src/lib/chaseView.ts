// Chase-cam view of the Sim: a plain pinhole projection onto the same 2D canvas (no 3D engine, no models).
// Dark tile floor, white walls, green path dots, red trail, green goal arrow and a rear-view sprite of the robot,
// like the Isaac Lab viewport. The robot sprite is rendered from the URDF meshes (rl/web_export/render_sprites.py).

import { ROBOT_R, PED_R, PED_H, WALL_H } from './socialNav.ts';
import type { Sim } from './socialNav.ts';

type V3 = [number, number, number];

const HFOV = (75 * Math.PI) / 180, BACK = 3.8, HEIGHT = 1.9, PITCH = (16 * Math.PI) / 180, NEAR = 0.25;

// rear sprite geometry (printed by render_sprites.py): px per metre, ground-contact anchor, size
export const REAR = { ppm: 190, ax: 180, ay: 381, w: 360, h: 420 };

interface Cam { pos: V3; fw: V3; right: V3; up: V3; F: number; W: number; H: number }

const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

function makeCam(sim: Sim, yaw: number, W: number, H: number): Cam {
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(PITCH), sp = Math.sin(PITCH);
  return {
    pos: [Math.min(sim.xMax - 0.35, Math.max(sim.xMin + 0.35, sim.robot.x - cy * BACK)),     // keep the camera inside the walls
      Math.min(sim.yMax - 0.35, Math.max(sim.yMin + 0.35, sim.robot.y - sy * BACK)), HEIGHT],
    fw: [cp * cy, cp * sy, -sp], right: [sy, -cy, 0], up: [sp * cy, sp * sy, cp],
    F: W / 2 / Math.tan(HFOV / 2), W, H,
  };
}

// world point -> camera space (x right, y up, z depth)
const toCam = (c: Cam, p: V3): V3 => {
  const r: V3 = [p[0] - c.pos[0], p[1] - c.pos[1], p[2] - c.pos[2]];
  return [dot(r, c.right), dot(r, c.up), dot(r, c.fw)];
};
const scr = (c: Cam, p: V3): [number, number] => [c.W / 2 + (c.F * p[0]) / p[2], c.H / 2 - (c.F * p[1]) / p[2]];

// clip a camera-space polygon against the near plane (Sutherland-Hodgman)
function clipNear(poly: V3[]): V3[] {
  const out: V3[] = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const ina = a[2] >= NEAR, inb = b[2] >= NEAR;
    if (ina) out.push(a);
    if (ina !== inb) {
      const t = (NEAR - a[2]) / (b[2] - a[2]);
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, NEAR]);
    }
  }
  return out;
}

function fillPoly(ctx: CanvasRenderingContext2D, c: Cam, pts: V3[], fill: string | null, stroke?: string, lw = 1): void {
  const q = clipNear(pts.map((p) => toCam(c, p)));
  if (q.length < 3) return;
  ctx.beginPath();
  q.forEach((p, i) => { const [x, y] = scr(c, p); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
  ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
}

function line3(ctx: CanvasRenderingContext2D, c: Cam, a: V3, b: V3): void {
  let p = toCam(c, a), q = toCam(c, b);
  if (p[2] < NEAR && q[2] < NEAR) return;
  if (p[2] < NEAR) { const t = (NEAR - p[2]) / (q[2] - p[2]); p = [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t, NEAR]; }
  if (q[2] < NEAR) { const t = (NEAR - q[2]) / (p[2] - q[2]); q = [q[0] + (p[0] - q[0]) * t, q[1] + (p[1] - q[1]) * t, NEAR]; }
  const [x0, y0] = scr(c, p), [x1, y1] = scr(c, q);
  ctx.moveTo(x0, y0); ctx.lineTo(x1, y1);
}

function ball(ctx: CanvasRenderingContext2D, c: Cam, p: V3, r: number, fill: string): void {
  const q = toCam(c, p);
  if (q[2] < NEAR) return;
  const [x, y] = scr(c, q), rr = Math.max(1.6, (r * c.F) / q[2]);
  ctx.fillStyle = fill;
  ctx.beginPath(); ctx.arc(x, y, rr, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.55)';                          // specular dot: reads as a little sphere
  ctx.beginPath(); ctx.arc(x - rr * 0.3, y - rr * 0.3, rr * 0.3, 0, 7); ctx.fill();
}

export function drawChase(ctx: CanvasRenderingContext2D, sim: Sim, yaw: number, rear: HTMLImageElement | undefined, W: number, H: number): void {
  const c = makeCam(sim, yaw, W, H);
  const R = sim.robot, m = sim.mission;
  const horizon = H / 2 - c.F * Math.tan(PITCH);

  const sky = ctx.createLinearGradient(0, 0, 0, Math.max(horizon, 1));
  sky.addColorStop(0, '#0c1618'); sky.addColorStop(1, '#2a3f44');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#0d1315'; ctx.fillRect(0, Math.max(0, horizon), W, H);

  const { xMin, xMax, yMin, yMax } = sim;
  fillPoly(ctx, c, [[xMin, yMin, 0], [xMax, yMin, 0], [xMax, yMax, 0], [xMin, yMax, 0]], '#25282c');   // tile floor
  ctx.strokeStyle = 'rgba(226,231,233,0.5)'; ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = Math.ceil(xMin); x <= xMax; x++) if (Math.abs(x - R.x) < 24) line3(ctx, c, [x, yMin, 0], [x, yMax, 0]);
  for (let y = Math.ceil(yMin); y <= yMax; y++) line3(ctx, c, [Math.max(xMin, R.x - 24), y, 0], [Math.min(xMax, R.x + 24), y, 0]);
  ctx.stroke();

  fillPoly(ctx, c, [[sim.dock.x - 0.9, -1.2, 0.01], [sim.dock.x + 0.9, -1.2, 0.01], [sim.dock.x + 0.9, 1.2, 0.01], [sim.dock.x - 0.9, 1.2, 0.01]],
    'rgba(230,255,88,0.18)', '#e6ff58', 2);

  const wall = (a: [number, number], b: [number, number]) => {        // 1.2 m wall segment, white block
    fillPoly(ctx, c, [[a[0], a[1], 0], [b[0], b[1], 0], [b[0], b[1], WALL_H], [a[0], a[1], WALL_H]], '#d6dadd', '#ffffff', 2);
  };
  wall([xMax, yMin], [xMax, yMax]); wall([xMin, yMin], [xMin, yMax]);
  wall([xMin, yMax], [xMax, yMax]); wall([xMin, yMin], [xMax, yMin]);

  if (m) {                                                           // planned path (green) and driven path (red)
    for (let i = 0; i < m.path.length; i += 3) {
      const p = m.path[i];
      if (m.outcome === 'none' && (p.x - R.x) * Math.cos(R.th) + (p.y - R.y) * Math.sin(R.th) < -0.3) continue;
      ball(ctx, c, [p.x, p.y, 0.06], 0.06, '#3dff55');
    }
  }
  for (let i = 0; i < sim.trail.length; i += 2) ball(ctx, c, [sim.trail[i].x, sim.trail[i].y, 0.05], 0.05, '#ff4d6d');

  if (m && m.outcome === 'none') {                                   // goal arrow lying on the floor, pointing along the route
    const p0 = m.path[0], dx = m.target.x - p0.x, dy = m.target.y - p0.y, L = Math.hypot(dx, dy) || 1;
    const ux = dx / L, uy = dy / L, tx = m.target.x, ty = m.target.y;
    const a: [number, number][] = [[-0.5, -0.13], [0.1, -0.13], [0.1, -0.34], [0.62, 0], [0.1, 0.34], [0.1, 0.13], [-0.5, 0.13]];
    fillPoly(ctx, c, a.map(([f, s]) => [tx + ux * f - uy * s, ty + uy * f + ux * s, 0.04] as V3), '#3dff55', '#12902a', 2);
  }

  // footprint disc, drawn on the floor under the robot
  const ring: V3[] = [];
  for (let i = 0; i < 28; i++) { const a = (i / 28) * Math.PI * 2; ring.push([R.x + Math.cos(a) * ROBOT_R, R.y + Math.sin(a) * ROBOT_R, 0.02]); }
  const bad = m?.outcome === 'contact';
  fillPoly(ctx, c, ring, bad ? 'rgba(255,91,53,0.25)' : 'rgba(131,221,208,0.12)', bad ? '#ff5b35' : 'rgba(131,221,208,0.85)', 2);

  // pedestrians (0.6 x 0.6 x 1.7 m boxes) and the robot, far to near
  type Item = { d: number; draw: () => void };
  const items: Item[] = [];
  const blind = sim.mode === 'mem6999' && !!m && m.outcome === 'none';
  for (const p of sim.peds) {
    const d = toCam(c, [p.x, p.y, PED_H / 2])[2];
    if (d < NEAR) continue;
    const hit = m?.outcome === 'contact' && Math.hypot(p.x - R.x, p.y - R.y) <= ROBOT_R + PED_R + 0.05;
    const base = hit ? [255, 91, 53] : [131, 221, 208];
    const alpha = blind && !sim.seen.has(p.id) ? 0.35 : 0.8;
    items.push({ d, draw: () => {
      const x0 = p.x - PED_R, x1 = p.x + PED_R, y0 = p.y - PED_R, y1 = p.y + PED_R, h = PED_H;
      const faces: { pts: V3[]; k: number }[] = [
        { pts: [[x0, y0, 0], [x1, y0, 0], [x1, y0, h], [x0, y0, h]], k: 0.8 }, { pts: [[x0, y1, 0], [x1, y1, 0], [x1, y1, h], [x0, y1, h]], k: 0.8 },
        { pts: [[x0, y0, 0], [x0, y1, 0], [x0, y1, h], [x0, y0, h]], k: 0.65 }, { pts: [[x1, y0, 0], [x1, y1, 0], [x1, y1, h], [x1, y0, h]], k: 0.65 },
        { pts: [[x0, y0, h], [x1, y0, h], [x1, y1, h], [x0, y1, h]], k: 1.15 },
      ];
      faces.map((f) => ({ f, d: f.pts.reduce((s, q) => s + toCam(c, q)[2], 0) / 4 })).sort((a, b) => b.d - a.d).forEach(({ f }) => {
        fillPoly(ctx, c, f.pts, `rgba(${Math.min(255, base[0] * f.k) | 0},${Math.min(255, base[1] * f.k) | 0},${Math.min(255, base[2] * f.k) | 0},${alpha})`,
          'rgba(255,255,255,0.85)', 1.2);
      });
      const t = toCam(c, [p.x, p.y, h + 0.22]);
      if (t[2] > NEAR) {
        const [x, y] = scr(c, t);
        ctx.fillStyle = '#fff'; ctx.font = 'bold 11px Courier New'; ctx.textAlign = 'center';
        ctx.fillText(`P${p.id}`, x, y);
      }
    } });
  }
  const rc = toCam(c, [R.x, R.y, 0.5]);
  items.push({ d: rc[2], draw: () => {
    const g = toCam(c, [R.x, R.y, 0]);
    if (g[2] < NEAR) return;
    const [x, y] = scr(c, g), k = c.F / g[2] / REAR.ppm;
    if (rear?.complete && rear.naturalWidth) ctx.drawImage(rear, x - REAR.ax * k, y - REAR.ay * k, REAR.w * k, REAR.h * k);
  } });
  items.sort((a, b) => b.d - a.d).forEach((it) => it.draw());
}

// click on the canvas -> point on the floor (null if the ray misses the ground)
export function chaseUnproject(sim: Sim, yaw: number, px: number, py: number, W: number, H: number): { x: number; y: number } | null {
  const c = makeCam(sim, yaw, W, H);
  const xr = (px - W / 2) / c.F, yu = -(py - H / 2) / c.F;
  const dir: V3 = [c.fw[0] + xr * c.right[0] + yu * c.up[0], c.fw[1] + xr * c.right[1] + yu * c.up[1], c.fw[2] + xr * c.right[2] + yu * c.up[2]];
  if (dir[2] >= -1e-4) return null;
  const t = -c.pos[2] / dir[2];
  return { x: c.pos[0] + dir[0] * t, y: c.pos[1] + dir[1] * t };
}
