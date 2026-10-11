import React, { useState, useEffect } from 'react';

interface RLDockingBriefProps {
  onBack: () => void;
}

export const RLDockingBrief: React.FC<RLDockingBriefProps> = ({ onBack }) => {
  const [activeVideo, setActiveVideo] = useState<'video1' | 'video2'>('video1');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  return (
    <div className="brief-page-wrapper">
      {/* Sticky Navigation Bar */}
      <nav className="brief-navbar" aria-label="Technical brief navigation">
        <div className="brief-nav-container">
          <button
            type="button"
            className="brief-back-btn"
            onClick={onBack}
            title="Return to Selected Work"
          >
            ← BACK TO SELECTED WORK
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span className="brief-badge">ISAAC LAB · PPO REINFORCEMENT LEARNING</span>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.72rem',
                color: 'var(--ink)',
                fontWeight: 700,
              }}
            >
              16-Observation Policy · 90.6% Docked
            </span>
          </div>

          <a
            href="https://github.com/Abhinavjoshi7891"
            target="_blank"
            rel="noreferrer"
            className="brief-back-btn"
            style={{ background: 'var(--acid)', color: 'var(--ink)' }}
          >
            GitHub Repository ↗
          </a>
        </div>
      </nav>

      <main className="section-shell">
        {/* Hero Section */}
        <header className="brief-hero">
          <p className="section-kicker">AGILE AMR // REINFORCEMENT LEARNING TECHNICAL BRIEF</p>
          <h1 className="brief-title">
            Teaching a Pallet Truck to Dock &amp;<br />Manoeuvre in Tight Spaces
          </h1>
          <p className="brief-subtitle">
            Training a 1.65 m tricycle pallet truck in NVIDIA Isaac Lab with PPO to execute 90° reverse-pivot
            docking into 1.6 m slots inside 2.0 m corridors — using only 16 scalar inputs with no camera or LiDAR.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              marginTop: '1.2rem',
              fontFamily: 'var(--mono)',
              fontSize: '0.76rem',
              color: 'var(--muted)',
            }}
          >
            <span>RESEARCHER: <strong>Abhinav Joshi</strong></span>
            <span>·</span>
            <span>SIMULATOR: <strong>NVIDIA Isaac Lab (GPU Vectorized)</strong></span>
            <span>·</span>
            <span>ALGORITHM: <strong>PPO (Proximal Policy Optimization)</strong></span>
          </div>
        </header>

        {/* High-Impact Metrics Strip */}
        <section
          className="brief-metrics-grid"
          style={{
            margin: '2rem 0',
            background: 'var(--ink)',
            color: '#fff',
            padding: '1.8rem',
            border: '2px solid var(--ink)',
            boxShadow: '4px 4px 0 rgba(24, 37, 39, 0.4)',
          }}
        >
          <div className="brief-metric-item">
            <span
              className="metric-val"
              style={{ color: 'var(--acid)', fontSize: '2.4rem', fontFamily: 'var(--mono)', fontWeight: 900 }}
            >
              90.6%
            </span>
            <span
              className="metric-lbl"
              style={{ color: '#c5ded8', fontSize: '0.74rem', fontFamily: 'var(--mono)', display: 'block', marginTop: '0.3rem' }}
            >
              DOCKED IN TIGHT 1.6 m SLOTS
            </span>
          </div>
          <div className="brief-metric-item">
            <span
              className="metric-val"
              style={{ color: 'var(--cyan)', fontSize: '2.4rem', fontFamily: 'var(--mono)', fontWeight: 900 }}
            >
              5.7 s
            </span>
            <span
              className="metric-lbl"
              style={{ color: '#c5ded8', fontSize: '0.74rem', fontFamily: 'var(--mono)', display: 'block', marginTop: '0.3rem' }}
            >
              AVERAGE TIME PER DOCK
            </span>
          </div>
          <div className="brief-metric-item">
            <span
              className="metric-val"
              style={{ color: 'var(--acid)', fontSize: '2.4rem', fontFamily: 'var(--mono)', fontWeight: 900 }}
            >
              0.4° / 1.5 cm
            </span>
            <span
              className="metric-lbl"
              style={{ color: '#c5ded8', fontSize: '0.74rem', fontFamily: 'var(--mono)', display: 'block', marginTop: '0.3rem' }}
            >
              MEDIAN HEADING &amp; LATERAL ERROR
            </span>
          </div>
          <div className="brief-metric-item">
            <span
              className="metric-val"
              style={{ color: 'var(--orange)', fontSize: '2.4rem', fontFamily: 'var(--mono)', fontWeight: 900 }}
            >
              16
            </span>
            <span
              className="metric-lbl"
              style={{ color: '#c5ded8', fontSize: '0.74rem', fontFamily: 'var(--mono)', display: 'block', marginTop: '0.3rem' }}
            >
              INPUT NUMBERS · NO CAMERA / LIDAR
            </span>
          </div>
        </section>

        {/* Video Player Section with Multi-Clip Switcher */}
        <section style={{ margin: '3.5rem 0' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.2rem',
              borderBottom: '2px solid var(--ink)',
              paddingBottom: '0.8rem',
            }}
          >
            <div>
              <p className="section-kicker">SIMULATION ROLLOUT CAPTURES</p>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: '2rem', margin: '0.2rem 0 0 0' }}>
                Isaac Lab Parallel Rollouts &amp; Precision Slot Docking
              </h2>
            </div>

            {/* Video Switcher Tabs */}
            <div style={{ display: 'inline-flex', border: '1px solid var(--ink)', background: '#fff', padding: '2px' }}>
              <button
                type="button"
                onClick={() => setActiveVideo('video1')}
                style={{
                  padding: '0.5rem 1rem',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  background: activeVideo === 'video1' ? 'var(--ink)' : 'transparent',
                  color: activeVideo === 'video1' ? 'var(--acid)' : 'var(--ink)',
                }}
              >
                🎬 Clip 1: Parallel Isaac Lab Training
              </button>
              <button
                type="button"
                onClick={() => setActiveVideo('video2')}
                style={{
                  padding: '0.5rem 1rem',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  background: activeVideo === 'video2' ? 'var(--ink)' : 'transparent',
                  color: activeVideo === 'video2' ? 'var(--acid)' : 'var(--ink)',
                }}
              >
                🎬 Clip 2: 90° Reverse-Pivot Slot Dock
              </button>
            </div>
          </div>

          <div
            style={{
              background: '#060d0e',
              border: '2px solid var(--ink)',
              boxShadow: '4px 4px 0 var(--ink)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.6rem 1.2rem',
                background: '#0d1a1c',
                borderBottom: '1px solid rgba(131,221,208,0.25)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: '#cde2de', marginLeft: '8px', fontWeight: 700 }}>
                  {activeVideo === 'video1'
                    ? 'ISAAC_LAB_PARALLEL_TRAINING // HUNDREDS OF COPIES EXPLORING CONTROL POLICY'
                    : 'REVERSE_PIVOT_PRECISION_DOCK // 90° TIGHT CORRIDOR SLOT ENTRY'}
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.66rem',
                  color: 'var(--acid)',
                  background: 'rgba(230,255,88,0.15)',
                  padding: '0.2rem 0.5rem',
                  border: '1px solid rgba(230,255,88,0.3)',
                  fontWeight: 800,
                }}
              >
                {activeVideo === 'video1' ? 'POLICY CONVERGENCE' : '±2 cm TOLERANCE ACHIEVED'}
              </span>
            </div>

            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#000' }}>
              <video
                key={activeVideo}
                src={activeVideo === 'video1' ? 'assets/projects/rl_docking_1.mp4' : 'assets/projects/rl_docking_2.mp4'}
                autoPlay
                loop
                muted
                controls
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>

            <div
              style={{
                padding: '1rem 1.4rem',
                background: '#091416',
                borderTop: '1px solid rgba(131,221,208,0.2)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <p style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: '0.76rem', color: '#cde2de' }}>
                {activeVideo === 'video1'
                  ? 'Massively parallel GPU rollouts in Isaac Lab exploring corridor approach and collision boundaries.'
                  : 'Single AMR executing a sharp 90° reverse pivot into a 1.6 m slot from a 2.0 m corridor in ~5.7 s.'}
              </p>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--cyan)' }}>
                MEDIAN ERROR: 0.4° YAW · 1.5 cm LATERAL
              </span>
            </div>
          </div>
        </section>

        {/* Technical Writeup Section */}
        <section style={{ margin: '3.5rem 0' }}>
          <p className="section-kicker">TECHNICAL METHODOLOGY &amp; ANALYSIS</p>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: '2rem', margin: '0.2rem 0 1.5rem 0' }}>
            Closing Loopholes the Learner Found
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Loophole 1 */}
            <article
              style={{
                background: '#ffffff',
                border: '2px solid var(--ink)',
                padding: '1.6rem',
                boxShadow: '3px 3px 0 var(--ink)',
              }}
            >
              <span
                style={{
                  background: 'var(--orange)',
                  color: '#fff',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.5rem',
                  display: 'inline-block',
                  marginBottom: '0.8rem',
                }}
              >
                LOOPHOLE 01 · SKEWED DOCKING
              </span>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.25rem', margin: '0 0 0.6rem 0' }}>
                Two-Point Fork Axis Measurement
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#334446', lineHeight: 1.6, margin: 0 }}>
                The agent learned it could get its fork tips within 2 cm of the target without squaring up,
                because the original reward didn't constrain heading relative to the slot.
                We added the slot heading error directly to its 16 scalar inputs and measured error across
                two distinct points along the fork axis, strictly enforcing a square, parallel entry.
              </p>
            </article>

            {/* Loophole 2 */}
            <article
              style={{
                background: '#ffffff',
                border: '2px solid var(--ink)',
                padding: '1.6rem',
                boxShadow: '3px 3px 0 var(--ink)',
              }}
            >
              <span
                style={{
                  background: 'var(--cyan)',
                  color: 'var(--ink)',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.5rem',
                  display: 'inline-block',
                  marginBottom: '0.8rem',
                }}
              >
                LOOPHOLE 02 · WALL PIVOTING
              </span>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.25rem', margin: '0 0 0.6rem 0' }}>
                Contact Sensors &amp; Proximity Penalties
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#334446', lineHeight: 1.6, margin: 0 }}>
                In ultra-narrow 2.0 m corridors, the robot discovered it could physically bounce against the wall
                to whip its rear chassis around. We added contact force sensors, terminated the episode immediately
                on any hard impact (9.4% crash rate), and applied a shaping penalty for getting dangerously close to walls.
              </p>
            </article>

            {/* Loophole 3 */}
            <article
              style={{
                background: '#ffffff',
                border: '2px solid var(--ink)',
                padding: '1.6rem',
                boxShadow: '3px 3px 0 var(--ink)',
              }}
            >
              <span
                style={{
                  background: 'var(--acid)',
                  color: 'var(--ink)',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.5rem',
                  display: 'inline-block',
                  marginBottom: '0.8rem',
                }}
              >
                LOOPHOLE 03 · HOVER EXPLOITATION
              </span>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.25rem', margin: '0 0 0.6rem 0' }}>
                Hold-the-Dock Time Incentive
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#334446', lineHeight: 1.6, margin: 0 }}>
                Because ending the episode on successful dock terminated reward collection, the learner learned to
                hover indefinitely right next to the slot without docking.
                We restructured the reward to pay the agent for every continuous second it holds the docked position,
                driving median docking completion time down to <strong>5.7 seconds</strong>.
              </p>
            </article>
          </div>
        </section>

        {/* Detailed Overview Section */}
        <section
          style={{
            background: '#ffffff',
            border: '2px solid var(--ink)',
            padding: '2rem',
            margin: '3rem 0',
            boxShadow: '4px 4px 0 var(--ink)',
          }}
        >
          <p className="section-kicker">PROBLEM SPECIFICATION &amp; TIGHT-SPACE CURRICULUM</p>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.8rem', margin: '0.2rem 0 1rem 0' }}>
            Docking a 1.65 m Pallet Truck in a 2.0 m Corridor
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <h4 style={{ fontFamily: 'var(--mono)', fontSize: '0.9rem', color: 'var(--orange)', margin: '0 0 0.5rem 0' }}>
                ROBOT MORPHOLOGY &amp; TOLERANCE
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#334446', lineHeight: 1.6 }}>
                The robot is a tricycle pallet truck with one steered drive wheel at the chassis end and two fork tines
                on load wheels at the other end, spanning 1.65 m in overall length. It docks fork-first, reversing into a slot.
                To count as docked, it must stop with both tines within <strong>2 cm of the slot centreline</strong> and square to it.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'var(--mono)', fontSize: '0.9rem', color: 'var(--orange)', margin: '0 0 0.5rem 0' }}>
                STEP-BY-STEP CURRICULUM TIGHTENING
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#334446', lineHeight: 1.6 }}>
                The robot drives along a corridor and reverses 90° into a slot on either side.
                We tightened the space step by step: the corridor from <strong>2.5 m to 2.0 m wide</strong>,
                then the slots from <strong>2.2 m to 1.6 m</strong>. For a 1.65 m truck, a 2.0 m corridor leaves
                negligible room for the swing, requiring near-zero-radius pivoting maneuvers.
              </p>
            </div>
          </div>
        </section>

        {/* Footer Return Card */}
        <div
          className="brief-footer-card"
          style={{
            margin: '4rem 0 3rem 0',
            background: 'var(--ink)',
            color: '#fff',
            padding: '2.5rem',
            border: '2px solid var(--ink)',
            boxShadow: '4px 4px 0 var(--ink)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <p className="section-kicker" style={{ color: 'var(--acid)', margin: '0 0 0.4rem 0' }}>
              READY TO RETURN
            </p>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.6rem', margin: 0 }}>
              Explore more robotics systems, AMR stacks &amp; whole-body policies.
            </h3>
          </div>
          <button
            type="button"
            className="brief-back-btn"
            onClick={onBack}
            style={{
              background: 'var(--acid)',
              color: 'var(--ink)',
              fontSize: '0.86rem',
              padding: '0.8rem 1.6rem',
            }}
          >
            ← Return to Selected Work
          </button>
        </div>
      </main>
    </div>
  );
};
