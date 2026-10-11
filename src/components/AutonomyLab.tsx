import React, { useEffect, useRef, useState } from 'react';
import { Sim, CAM_FOV, CAM_FWD, CAM_RANGE, ROBOT_R, PED_R } from '../lib/socialNav.ts';
import type { Mode, Outcome } from '../lib/socialNav.ts';
import { drawChase, chaseUnproject } from '../lib/chaseView.ts';

// Simple top-down game view of the Dynamoid sim. The learned networks run in Isaac Sim; this is a lightweight
// behavioural re-creation (see lib/socialNav.ts), so the page stays a few KB and needs no model files.

const W = 1000, H = 600, PPM = 50;
const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

const POLICIES: { id: Mode; label: string; scene: 'corridor' | 'arena'; note: string; result: string }[] = [
  { id: 'mem6999', label: '6999 · Depth + Memory', scene: 'corridor',
    note: 'Femto depth camera (120°, 2.88 m) + GRU memory. Walkers that leave the view are remembered for ~3 s.',
    result: '86.9% goal · 11.3% ped hit (n=929)' },
  { id: 'ttc699', label: '699 · TTC Teacher', scene: 'arena',
    note: 'Stage 5 teacher: sees every pedestrian as a time-to-collision, open arena.',
    result: '91.5% goal · 8.5% ped hit (n=1024)' },
  { id: 'distance', label: 'Distance cost (trap)', scene: 'corridor',
    note: 'Baseline: stop whenever anyone is close. This is the frozen-robot trap the TTC reward avoids.',
    result: 'illustrative baseline' },
];

const stateText = (sim: Sim): string => {
  const m = sim.mission;
  if (!m) return sim.charging ? 'CHARGING' : 'IDLE';
  if (m.outcome === 'arrived') return sim.charging ? 'CHARGING' : 'ARRIVED';
  if (m.outcome === 'contact') return 'CONTACT';
  if (m.outcome === 'wall') return 'WALL HIT';
  if (m.outcome === 'timeout') return 'TIMEOUT';
  if (sim.mode === 'distance' && sim.info.blocked) return 'FROZEN (DISTANCE COST)';
  return sim.info.blocked ? 'EVADING' : 'NAVIGATING';
};

export const AutonomyLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const depthRef = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<Sim>(new Sim('corridor', 7));
  const imgs = useRef<{ top?: HTMLImageElement; rear?: HTMLImageElement }>({});
  const viewRef = useRef<'top' | 'chase'>('top');
  const camYaw = useRef(0);
  const lastOutcome = useRef<Outcome>('none');
  const [policy, setPolicy] = useState<Mode>('mem6999');
  const [memory, setMemory] = useState(true);
  const [view, setView] = useState<'top' | 'chase'>('top');
  const [tele, setTele] = useState({ state: 'IDLE', pos: '', speed: '0.00', ttc: '—', battery: 100, ok: 0, bad: 0, clock: 0 });
  const [toast, setToast] = useState('Dynamoid online. Click the floor to dispatch it.');
  const [alert, setAlert] = useState(false);

  const say = (msg: string, isAlert = false) => { setToast(msg); setAlert(isAlert); };

  const newSim = (mode: Mode, mem: boolean) => {
    const cur = simRef.current;
    const scene = mode === 'distance' ? cur.kind : POLICIES.find((p) => p.id === mode)!.scene;
    const s = new Sim(scene, Math.floor(Math.random() * 1e6));
    s.mode = mode; s.memory = mem;
    simRef.current = s;
    camYaw.current = s.robot.th;
    lastOutcome.current = 'none';
  };

  const pickPolicy = (mode: Mode) => {
    setPolicy(mode);
    newSim(mode, memory);
    say(POLICIES.find((p) => p.id === mode)!.note);
  };

  useEffect(() => {
    const im = new Image();
    im.src = `${import.meta.env.BASE_URL}assets/lab/robot_top.png`;
    imgs.current.top = im;
    const rear = new Image();
    rear.src = `${import.meta.env.BASE_URL}assets/lab/robot_back.png`;
    imgs.current.rear = rear;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    let raf = 0, last = performance.now(), acc = 0, teleT = 0, depthT = 0, visible = true;
    const depthBuf = new ImageData(84, 84);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.05 });
    io.observe(canvas);

    const draw = (sim: Sim) => {
      const R = sim.robot;
      const cx = sim.kind === 'corridor' ? clamp(R.x, sim.xMin + 10, sim.xMax - 10) : 0;
      const sx = (x: number) => W / 2 + (x - cx) * PPM;
      const sy = (y: number) => H / 2 - y * PPM;

      ctx.fillStyle = '#0a1315';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#122023';                                    // floor
      ctx.fillRect(sx(sim.xMin), sy(sim.yMax), (sim.xMax - sim.xMin) * PPM, (sim.yMax - sim.yMin) * PPM);
      ctx.strokeStyle = 'rgba(131,221,208,0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = Math.ceil(sim.xMin); x <= sim.xMax; x++) { ctx.moveTo(sx(x), sy(sim.yMax)); ctx.lineTo(sx(x), sy(sim.yMin)); }
      for (let y = Math.ceil(sim.yMin); y <= sim.yMax; y++) { ctx.moveTo(sx(sim.xMin), sy(y)); ctx.lineTo(sx(sim.xMax), sy(y)); }
      ctx.stroke();
      ctx.strokeStyle = '#264a9f';                                  // walls / fence
      ctx.lineWidth = 5;
      ctx.strokeRect(sx(sim.xMin), sy(sim.yMax), (sim.xMax - sim.xMin) * PPM, (sim.yMax - sim.yMin) * PPM);
      ctx.fillStyle = 'rgba(131,221,208,0.35)';
      ctx.font = '10px Courier New';
      ctx.textAlign = 'center';
      for (let x = Math.ceil(sim.xMin / 5) * 5; x <= sim.xMax; x += 5) ctx.fillText(`${x} m`, sx(x), sy(sim.yMin) - 8);

      // charging dock
      ctx.fillStyle = 'rgba(230,255,88,0.1)';
      ctx.fillRect(sx(sim.dock.x) - 45, sy(1.2), 90, 120);
      ctx.strokeStyle = '#e6ff58';
      ctx.lineWidth = 2;
      ctx.strokeRect(sx(sim.dock.x) - 45, sy(1.2), 90, 120);
      ctx.fillStyle = '#e6ff58';
      ctx.font = 'bold 10px Courier New';
      ctx.fillText('DOCK', sx(sim.dock.x), sy(1.2) + 14);

      const m = sim.mission;
      if (m) {
        ctx.fillStyle = '#56b84d';                                  // planned path
        for (let i = 0; i < m.path.length; i += 3) {
          const p = m.path[i];
          if ((p.x - R.x) * Math.cos(R.th) + (p.y - R.y) * Math.sin(R.th) < -0.3 && m.outcome === 'none') continue;
          ctx.beginPath(); ctx.arc(sx(p.x), sy(p.y), 2.5, 0, 7); ctx.fill();
        }
      }
      if (sim.trail.length > 1) {                                   // where it actually drove
        ctx.strokeStyle = 'rgba(255,91,53,0.85)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        sim.trail.forEach((p, i) => (i ? ctx.lineTo(sx(p.x), sy(p.y)) : ctx.moveTo(sx(p.x), sy(p.y))));
        ctx.stroke();
      }

      if (sim.mode === 'mem6999') {                                 // camera field of view: 120 deg, 2.88 m
        const ox = sx(R.x + Math.cos(R.th) * CAM_FWD), oy = sy(R.y + Math.sin(R.th) * CAM_FWD);
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.arc(ox, oy, CAM_RANGE * PPM, -(R.th + CAM_FOV / 2), -(R.th - CAM_FOV / 2));
        ctx.closePath();
        ctx.fillStyle = 'rgba(131,221,208,0.12)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(131,221,208,0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const half = PED_R * PPM;
      const box = (x: number, y: number, fill: string, stroke: string, dash: number[], label: string, vx: number, vy: number) => {
        ctx.setLineDash(dash);
        ctx.fillStyle = fill; ctx.strokeStyle = stroke; ctx.lineWidth = 2;
        ctx.fillRect(sx(x) - half, sy(y) - half, half * 2, half * 2);
        ctx.strokeRect(sx(x) - half, sy(y) - half, half * 2, half * 2);
        ctx.setLineDash([]);
        ctx.fillStyle = '#fff'; ctx.font = 'bold 10px Courier New'; ctx.textAlign = 'center';
        ctx.fillText(label, sx(x), sy(y) + 3);
        if (vx || vy) {
          ctx.strokeStyle = '#e6ff58'; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(sx(x), sy(y)); ctx.lineTo(sx(x) + vx * 0.9 * PPM * 0.5, sy(y) - vy * 0.9 * PPM * 0.5); ctx.stroke();
        }
      };
      if (sim.mode === 'mem6999' && sim.memory) {                   // remembered walkers: dashed ghosts, dead-reckoned
        for (const t of sim.tracks.values()) {
          if (sim.seen.has(t.id)) continue;
          const age = sim.time - t.seenAt;
          box(t.x + t.vx * age, t.y + t.vy * age, 'rgba(131,221,208,0.08)', 'rgba(131,221,208,0.7)', [4, 3], `P${t.id}`, 0, 0);
        }
      }
      const blindFade = sim.mode === 'mem6999' && !!m && m.outcome === 'none';
      for (const p of sim.peds) {
        const hit = m?.outcome === 'contact' && Math.hypot(p.x - R.x, p.y - R.y) <= ROBOT_R + PED_R + 0.05;
        const unseen = blindFade && !sim.seen.has(p.id);
        box(p.x, p.y, hit ? 'rgba(255,91,53,0.9)' : unseen ? 'rgba(131,221,208,0.3)' : 'rgba(131,221,208,0.85)',
          hit ? '#ff5b35' : '#fff', [], `P${p.id}`, p.vx, p.vy);
      }

      if (m && m.outcome === 'none') {                              // goal marker
        const gx = sx(m.target.x), gy = sy(m.target.y);
        ctx.strokeStyle = '#e6ff58'; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.arc(gx, gy, 14, 0, 7); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(gx - 20, gy); ctx.lineTo(gx + 20, gy); ctx.moveTo(gx, gy - 20); ctx.lineTo(gx, gy + 20); ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#ff5b35'; ctx.beginPath(); ctx.arc(gx, gy, 4, 0, 7); ctx.fill();
      }

      // robot: the real Dynamoid top view (rendered from the URDF meshes), plus its 0.607 m footprint disc
      const rx = sx(R.x), ry = sy(R.y), bad = m?.outcome === 'contact';
      ctx.save();
      ctx.translate(rx, ry);
      ctx.rotate(-R.th);
      const top = imgs.current.top;
      if (top?.complete && top.naturalWidth) {
        const k = PPM / 300;                                        // sprite is 300 px per metre
        ctx.drawImage(top, -200 * k, -200 * k, 400 * k, 400 * k);
      } else {
        ctx.fillStyle = '#182527'; ctx.fillRect(-22, -18, 44, 36);
      }
      ctx.restore();
      ctx.beginPath();
      ctx.arc(rx, ry, ROBOT_R * PPM, 0, 7);
      ctx.setLineDash([6, 5]);
      ctx.strokeStyle = bad ? '#ff5b35' : sim.mode === 'distance' ? 'rgba(255,91,53,0.6)' : 'rgba(131,221,208,0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.25);
      last = now;
      if (!visible) return;
      const sim = simRef.current;
      acc += dt;
      while (acc >= 1 / 60) { sim.step(1 / 60); acc -= 1 / 60; }
      camYaw.current += Math.atan2(Math.sin(sim.robot.th - camYaw.current), Math.cos(sim.robot.th - camYaw.current)) * Math.min(1, dt * 5);
      if (viewRef.current === 'chase') drawChase(ctx, sim, camYaw.current, imgs.current.rear, W, H);
      else draw(sim);

      depthT += dt;                                                 // mock Femto depth feed, 20 Hz like the policy
      const dctx = depthRef.current?.getContext('2d');
      if (dctx && sim.mode === 'mem6999' && depthT > 0.05) {
        depthT = 0;
        sim.depthImage(depthBuf.data);
        dctx.putImageData(depthBuf, 0, 0);
      }

      const o = sim.mission?.outcome ?? 'none';
      if (o !== lastOutcome.current) {
        lastOutcome.current = o;
        const T = sim.mission ? (sim.time - sim.mission.t0).toFixed(1) : '0';
        if (o === 'arrived') say(sim.charging ? 'Docked. Battery charging.' : `Arrived in ${T} s. No contact.`);
        if (o === 'contact') say('Contact with a pedestrian. The real policy does this too: see the hit rate on the right.', true);
        if (o === 'wall') say('Hit the wall. Click to dispatch again.', true);
        if (o === 'timeout') say('Timed out. Click to dispatch again.', true);
      }
      if (sim.mode === 'distance' && sim.info.blocked && o === 'none') say('FROZEN-ROBOT TRAP: a pedestrian is close, so the distance cost stops the robot.', true);

      teleT += dt;
      if (teleT > 0.15) {
        teleT = 0;
        setTele({
          state: stateText(sim),
          pos: `${sim.robot.x.toFixed(1)} m, ${sim.robot.y.toFixed(1)} m`,
          speed: sim.robot.v.toFixed(2),
          ttc: Number.isFinite(sim.info.minTtc) ? `${sim.info.minTtc.toFixed(2)} s` : 'clear',
          battery: Math.round(sim.battery),
          ok: sim.stats.arrived, bad: sim.stats.contacts + sim.stats.walls,
          clock: Math.floor(sim.time),
        });
      }
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  const toWorld = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current!, r = c.getBoundingClientRect(), sim = simRef.current;
    const px = ((e.clientX - r.left) / r.width) * W, py = ((e.clientY - r.top) / r.height) * H;
    if (viewRef.current === 'chase') return chaseUnproject(sim, camYaw.current, px, py, W, H);
    const cx = sim.kind === 'corridor' ? clamp(sim.robot.x, sim.xMin + 10, sim.xMax - 10) : 0;
    return { x: cx + (px - W / 2) / PPM, y: (H / 2 - py) / PPM };
  };

  const dispatch = (t: { x: number; y: number }, docking = false) => {
    const sim = simRef.current;
    sim.dispatch(t, docking);
    lastOutcome.current = 'none';
    say(docking ? 'Returning to the dock to charge.' : `Mission accepted: (${sim.mission!.target.x.toFixed(1)} m, ${sim.mission!.target.y.toFixed(1)} m).`);
  };

  const randomMission = () => {
    const sim = simRef.current;
    if (sim.kind === 'corridor') {
      const x = clamp(sim.robot.x + 6 + Math.random() * 8, sim.xMin + 1, sim.xMax - 1);
      dispatch({ x, y: (Math.random() * 2 - 1) * 2.8 });
    } else {
      dispatch({ x: -6 + Math.random() * 14, y: (Math.random() * 2 - 1) * 5 });
    }
  };

  const cur = POLICIES.find((p) => p.id === policy)!;
  const mm = String(Math.floor(tele.clock / 60)).padStart(2, '0'), ss = String(tele.clock % 60).padStart(2, '0');

  return (
    <section id="lab" className="robot-lab section-shell">
      <div className="lab-heading">
        <div>
          <p className="section-kicker">02 / Autonomy lab</p>
          <h2>Dispatch the<br /><em>Wheeled Humanoid.</em></h2>
        </div>
        <div className="lab-brief">
          <span className="lab-live"><i /> SIMULATION LIVE — ELEXIS-W</span>
          <p>
            Click the floor. The robot drives a global path while a social-navigation policy steers it around walking
            pedestrians, in the style of our two trained models. Switch the policy to compare them, and to see the{' '}
            <strong>frozen-robot trap</strong> the time-to-collision reward avoids.
          </p>
        </div>
      </div>

      <div className="lab-console">
        <div className="lab-window-bar">
          <span className="window-dots"><i /><i /><i /></span>
          <span>ELEXIS_SIM // SOCIAL_NAV_{policy === 'ttc699' ? 'ARENA' : 'CORRIDOR'}.ENV</span>
          <span id="lab-clock">T+ {mm}:{ss}</span>
        </div>

        <div className="lab-main">
          <div className="lab-map-wrap">
            <canvas
              ref={canvasRef}
              id="robot-lab-canvas"
              width={W}
              height={H}
              onClick={(e) => { const t = toWorld(e); if (t) dispatch(t); else say('Click on the floor, below the horizon.'); }}
              aria-label="Interactive wheeled humanoid social navigation simulator"
            />
            {policy === 'mem6999' && (
              <div className="lab-depth" aria-label="Depth camera feed">
                <canvas ref={depthRef} width={84} height={84} />
                <span>FEMTO DEPTH · 84×84 · 120° · 2.88 m</span>
              </div>
            )}
            <div className="map-hint"><span>＋</span> CLICK THE FLOOR TO DISPATCH THE ROBOT</div>
            <div className={`lab-toast ${alert ? 'is-alert' : ''}`} role="status">{toast}</div>
          </div>

          <aside className="lab-telemetry" aria-label="Robot telemetry">
            <div className="telemetry-title">
              <span>PLATFORM</span>
              <strong>ELEXIS-W / 01</strong>
            </div>
            <div className="telemetry-radar lab-robot-card">
              <img src={`${import.meta.env.BASE_URL}assets/lab/robot_iso.png`} alt="Dynamoid wheeled humanoid" />
            </div>
            <dl>
              <div><dt>STATE</dt><dd>{tele.state}</dd></div>
              <div><dt>POSITION</dt><dd>{tele.pos}</dd></div>
              <div><dt>SPEED</dt><dd>{tele.speed} m/s</dd></div>
              <div><dt>MIN TTC</dt><dd>{tele.ttc}</dd></div>
              <div><dt>FOOTPRINT / CONTACT</dt><dd>0.607 m / 0.907 m</dd></div>
              <div><dt>TRAINED RESULT</dt><dd style={{ color: 'var(--acid)' }}>{cur.result}</dd></div>
              <div><dt>THIS SESSION</dt><dd>{tele.ok} arrived · {tele.bad} failed</dd></div>
              <div><dt>BATTERY</dt><dd>{tele.battery}%</dd></div>
            </dl>
            <div className="lab-battery-track">
              <span id="lab-battery-fill" style={{ width: `${tele.battery}%`, background: tele.battery < 20 ? '#ff5b35' : tele.battery < 50 ? '#83ddd0' : '#e6ff58' }} />
            </div>
          </aside>
        </div>

        <div className="lab-controls">
          <p>
            <span className="control-key">POLICY</span>
            Behavioural replica of the Isaac Sim policies · 26-DOF Dynamoid · asymmetric PPO
          </p>
          <div>
            {POLICIES.map((p) => (
              <button key={p.id} type="button" className={`lab-btn ${policy === p.id ? 'is-active' : ''}`} onClick={() => pickPolicy(p.id)}>
                {p.label}
              </button>
            ))}
            {policy === 'mem6999' && (
              <button type="button" className={`lab-btn ${memory ? 'is-active' : ''}`}
                onClick={() => { setMemory(!memory); simRef.current.memory = !memory; say(!memory ? 'GRU memory on: hidden walkers are remembered.' : 'Memory off: out of sight, out of mind.'); }}>
                Memory: {memory ? 'ON' : 'OFF'}
              </button>
            )}
            <button className="lab-btn" type="button"
              onClick={() => { const v = view === 'top' ? 'chase' : 'top'; viewRef.current = v; setView(v); }}>
              View: {view === 'top' ? 'TOP' : 'CHASE'} <span>◫</span>
            </button>
            <button className="lab-btn" type="button" onClick={randomMission}>Random Mission <span>⌁</span></button>
            <button className="lab-btn" type="button" onClick={() => simRef.current.addPed()}>Add Pedestrian <span>＋</span></button>
            <button className="lab-btn" type="button" onClick={() => dispatch(simRef.current.dock, true)}>Go Charge <span>⌂</span></button>
            <button className="lab-btn" type="button" onClick={() => { newSim(policy, memory); say('Scene reset.'); }}>Reset <span>↺</span></button>
          </div>
        </div>
      </div>
    </section>
  );
};
