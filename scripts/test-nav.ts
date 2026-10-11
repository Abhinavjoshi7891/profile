// Headless behaviour check of the browser sim: run many missions per mode and report outcomes. Not shipped.
//   node scripts/test-nav.ts
import { Sim, TUNE } from '../src/lib/socialNav.ts';
import type { Kind, Mode } from '../src/lib/socialNav.ts';

function run(kind: Kind, mode: Mode, memory: boolean, n: number, nPeds?: number) {
  const out = { arrived: 0, contact: 0, wall: 0, timeout: 0 };
  let meanT = 0;
  for (let i = 0; i < n; i++) {
    const sim = new Sim(kind, 1000 + i);
    sim.mode = mode; sim.memory = memory;
    if (nPeds) while (sim.peds.length < nPeds) sim.addPed();
    // random mission: corridor = go the long way along the corridor; arena = anywhere
    const r = sim.rng;
    const tx = kind === 'corridor' ? sim.robot.x + 8 + r() * 5 : -6 + r() * 14;
    const ty = kind === 'corridor' ? (r() * 2 - 1) * 2.8 : (r() * 2 - 1) * 5;
    sim.dispatch({ x: tx, y: ty });
    for (let k = 0; k < 60 * 100 && sim.mission!.outcome === 'none'; k++) sim.step(1 / 60);
    const o = sim.mission!.outcome;
    if (o === 'arrived') { out.arrived++; meanT += sim.time - sim.mission!.t0; }
    else if (o === 'contact') out.contact++;
    else if (o === 'wall') out.wall++;
    else out.timeout++;
  }
  const pc = (v: number) => (100 * v / n).toFixed(1).padStart(5) + '%';
  console.log(`${kind.padEnd(8)} ${mode.padEnd(8)} mem=${String(memory).padEnd(5)} peds=${String(nPeds ?? 'def').padEnd(3)}  arrived ${pc(out.arrived)}  contact ${pc(out.contact)}  wall ${pc(out.wall)}  timeout ${pc(out.timeout)}  mean ${(meanT / Math.max(out.arrived, 1)).toFixed(1)}s`);
}
const N = Number(process.argv[2] ?? 300);
if (process.argv[3]) Object.assign(TUNE, JSON.parse(process.argv[3]));
run('corridor', 'mem6999', true, N);
run('corridor', 'mem6999', false, N);
run('corridor', 'ttc699', true, N);
run('corridor', 'distance', true, N);
run('arena', 'ttc699', true, N);
run('arena', 'mem6999', true, N);
run('arena', 'distance', true, N);
