import React, { useState, useEffect } from 'react';

interface DynamoidNavReportProps {
  onBack: () => void;
}

export const DynamoidNavReport: React.FC<DynamoidNavReportProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'paper' | 'journey' | 'telemetry'>('paper');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

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
      <nav className="brief-navbar" aria-label="Technical report navigation">
        <div className="brief-nav-container">
          <button
            type="button"
            className="brief-back-btn"
            onClick={onBack}
            title="Return to Selected Work"
          >
            ← BACK TO SELECTED WORK
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
            <span className="brief-badge">CHECKPOINT MEM_GRU_model_6999</span>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.72rem',
                color: 'var(--ink)',
                fontWeight: 700,
              }}
            >
              86.9% Arrival · 11.3% Hits · 128-D GRU Memory · 120° Depth Only
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <a
              href="/assets/reports/MEM_GRU_model_6999_report.pdf"
              target="_blank"
              rel="noreferrer"
              className="brief-back-btn"
              style={{ background: 'var(--acid)', color: 'var(--ink)' }}
            >
              Evaluation PDF ↗
            </a>
            <a
              href="/assets/reports/MEM_GRU_model_6999_journey.pdf"
              target="_blank"
              rel="noreferrer"
              className="brief-back-btn"
              style={{ background: 'var(--ink)', color: 'var(--acid)' }}
            >
              Design Journey PDF ↗
            </a>
          </div>
        </div>
      </nav>

      <main className="section-shell">
        {/* Hero Section */}
        <header className="brief-hero">
          <p className="section-kicker">WHEELED HUMANOID // RECURRENT LOCAL PLANNER</p>
          <h1 className="brief-title">
            A Recurrent Depth-Vision Local Planner<br />for a Wheeled Humanoid
          </h1>
          <p className="brief-subtitle">
            Every 50 ms, turning four depth frames, nine robot state numbers, and a 128-number GRU memory
            into continuous forward speed and yaw rates that track global paths around walking pedestrians.
            Trained in NVIDIA Isaac Lab with asymmetric actor-critic PPO on the Dynamoid v1 humanoid platform.
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
            <span>PLATFORM: <strong>Dynamoid v1 (133 kg Wheeled Humanoid)</strong></span>
            <span>·</span>
            <span>SENSOR: <strong>Femto Bolt 120° × 120° Depth (0.25–2.88 m)</strong></span>
            <span>·</span>
            <span>CHECKPOINT: <strong>MEM_GRU_model_6999</strong></span>
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
              86.9%
            </span>
            <span
              className="metric-lbl"
              style={{ color: '#c5ded8', fontSize: '0.74rem', fontFamily: 'var(--mono)', display: 'block', marginTop: '0.3rem' }}
            >
              GOAL ARRIVAL (95% CI: 84.5–88.9)
            </span>
          </div>
          <div className="brief-metric-item">
            <span
              className="metric-val"
              style={{ color: 'var(--cyan)', fontSize: '2.4rem', fontFamily: 'var(--mono)', fontWeight: 900 }}
            >
              11.3%
            </span>
            <span
              className="metric-lbl"
              style={{ color: '#c5ded8', fontSize: '0.74rem', fontFamily: 'var(--mono)', display: 'block', marginTop: '0.3rem' }}
            >
              PEDESTRIAN HITS (HALVED FROM 22.7%)
            </span>
          </div>
          <div className="brief-metric-item">
            <span
              className="metric-val"
              style={{ color: 'var(--orange)', fontSize: '2.4rem', fontFamily: 'var(--mono)', fontWeight: 900 }}
            >
              128-D
            </span>
            <span
              className="metric-lbl"
              style={{ color: '#c5ded8', fontSize: '0.74rem', fontFamily: 'var(--mono)', display: 'block', marginTop: '0.3rem' }}
            >
              RECURRENT GRU HIDDEN STATE
            </span>
          </div>
          <div className="brief-metric-item">
            <span
              className="metric-val"
              style={{ color: '#ffffff', fontSize: '2.4rem', fontFamily: 'var(--mono)', fontWeight: 900 }}
            >
              2.87M
            </span>
            <span
              className="metric-lbl"
              style={{ color: '#c5ded8', fontSize: '0.74rem', fontFamily: 'var(--mono)', display: 'block', marginTop: '0.3rem' }}
            >
              PARAMETERS (CNN + GRU + MLP)
            </span>
          </div>
        </section>

        {/* Tab Switcher Controls */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '2px solid var(--ink)', paddingBottom: '0.8rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setActiveTab('paper')}
            style={{
              padding: '0.65rem 1.25rem',
              fontFamily: 'var(--mono)',
              fontSize: '0.8rem',
              fontWeight: 800,
              border: '2px solid var(--ink)',
              cursor: 'pointer',
              background: activeTab === 'paper' ? 'var(--ink)' : '#fff',
              color: activeTab === 'paper' ? 'var(--acid)' : 'var(--ink)',
              boxShadow: activeTab === 'paper' ? '3px 3px 0 var(--ink)' : 'none',
            }}
          >
            📄 1. Technical Report (model_6999)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('journey')}
            style={{
              padding: '0.65rem 1.25rem',
              fontFamily: 'var(--mono)',
              fontSize: '0.8rem',
              fontWeight: 800,
              border: '2px solid var(--ink)',
              cursor: 'pointer',
              background: activeTab === 'journey' ? 'var(--ink)' : '#fff',
              color: activeTab === 'journey' ? 'var(--acid)' : 'var(--ink)',
              boxShadow: activeTab === 'journey' ? '3px 3px 0 var(--ink)' : 'none',
            }}
          >
            🗺️ 2. Design Journey (Aug – Oct 2026)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('telemetry')}
            style={{
              padding: '0.65rem 1.25rem',
              fontFamily: 'var(--mono)',
              fontSize: '0.8rem',
              fontWeight: 800,
              border: '2px solid var(--ink)',
              cursor: 'pointer',
              background: activeTab === 'telemetry' ? 'var(--ink)' : '#fff',
              color: activeTab === 'telemetry' ? 'var(--acid)' : 'var(--ink)',
              boxShadow: activeTab === 'telemetry' ? '3px 3px 0 var(--ink)' : 'none',
            }}
          >
            🎥 3. Evaluation Video Report (14 Episodes)
          </button>
        </div>

        {/* ===================================================================
            TAB 1: TECHNICAL REPORT (MEM_GRU_model_6999)
            =================================================================== */}
        {activeTab === 'paper' && (
          <div>
            {/* Abstract */}
            <div className="insight-card" style={{ borderLeft: '6px solid var(--acid)', marginBottom: '2.5rem' }}>
              <p className="section-kicker">ABSTRACT</p>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.6rem', margin: '0.4rem 0 1rem 0' }}>
                End-to-End Recurrent Local Planning under Severe Camera Blindness
              </h2>
              <p style={{ fontSize: '0.96rem', lineHeight: 1.7, color: '#233436' }}>
                We train one neural network to act as the local planner of a wheeled humanoid. Every 50 ms it turns
                four depth frames, nine numbers describing the robot and its route, and a 128-number memory into a
                forward speed and a turn rate that follow a global path around walking pedestrians. The camera sees only
                a 120° cone out to 2.88 m, so pedestrians routinely drop out of view just before they reach the robot.
                Adding a GRU memory of those pedestrians, trained with an auxiliary "where were they?" loss, halved
                pedestrian collisions in simulation (<strong>22.7% → 11.3%</strong>) and raised goal arrival from <strong>75.8% to 86.9%</strong>.
                The policy steers around people at full speed; it does not choose to slow down or stop.
              </p>
            </div>

            {/* Section 1: Problem & Setting */}
            <section style={{ marginBottom: '3rem' }}>
              <p className="section-kicker">01 // PROBLEM &amp; SYSTEM SETTING</p>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: '2rem', margin: '0.4rem 0 1.2rem 0' }}>
                System Context &amp; Sensor Constraints
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1.5rem', alignItems: 'start' }}>
                <div className="insight-card">
                  <h3>Robot &amp; World Specification</h3>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#334446' }}>
                    The robot is a differential-drive base (wheel radius 0.075 m, wheelbase 0.372 m, body radius 0.607 m)
                    carrying a humanoid upper body. In the C++ stack its local planner has been MPPI; this policy takes over
                    the exact same role: <strong>route and obstacles in, (v, ω) out</strong>.
                  </p>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#334446' }}>
                    The training world is a walled corridor with a 10 m reference path and three pedestrians (radius 0.30 m)
                    walking toward the robot, either straight or with random speed (0–1.2 m/s) and heading (±35°).
                    They do not react to the robot. The policy runs at 20 Hz over 120 Hz physics, 64 robots in parallel,
                    episodes of at most 25 s. An episode ends at the goal (within 1 m), on a pedestrian hit (centres within 0.907 m),
                    on a wall hit, or at timeout.
                  </p>
                  <div style={{ background: '#f4fbf9', border: '1px solid rgba(131,221,208,0.4)', padding: '1rem', marginTop: '1rem' }}>
                    <strong style={{ color: 'var(--ink)', fontSize: '0.85rem' }}>The Limiting Sensor Bottleneck:</strong>
                    <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.86rem', color: '#3b514d', lineHeight: 1.5 }}>
                      The Femto Bolt depth camera is 120° × 120°, returns nothing beyond 2.88 m, and is mounted flat, 0.09 m above the floor
                      and 0.40 m ahead of the wheel axis. A pedestrian walking at 1 m/s covers 2.88 m in under 3 seconds.
                      On the feedforward baseline (SOLID_BASE, 143 recorded hits), <strong>99.3% of pedestrian hits involved someone who had been seen
                      and then lost</strong>; median time out of view at impact was 0.3 s. That is the case for memory.
                    </p>
                  </div>
                </div>

                <div style={{ background: '#fff', border: '2px solid var(--ink)', padding: '1rem', boxShadow: '3px 3px 0 var(--ink)' }}>
                  <img
                    src="/assets/figures/model_6999/fig_system.png"
                    alt="System context: Nav2 global planner to MEM_GRU local planner to low-level motor path"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                  <span style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--muted)', marginTop: '0.6rem' }}>
                    FIG 1: System context — Route &amp; 120° depth camera in, (v, ω) out via wall-safety reflex.
                  </span>
                </div>
              </div>
            </section>

            {/* Section 2: Method & Architecture */}
            <section style={{ marginBottom: '3rem' }}>
              <p className="section-kicker">02 // METHOD &amp; ACTOR ARCHITECTURE</p>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: '2rem', margin: '0.4rem 0 1.2rem 0' }}>
                Observations, GRU Side-Branch &amp; Reward Arithmetic
              </h2>

              {/* Observation Table */}
              <div className="insight-card" style={{ marginBottom: '1.8rem' }}>
                <h3>Observation Contract</h3>
                <table className="spec-table">
                  <thead>
                    <tr>
                      <th>Input</th>
                      <th>Shape</th>
                      <th>Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Depth</strong></td>
                      <td>4 × 84 × 84</td>
                      <td>pixel = distance / 2.88 m, invalid = 1; four consecutive frames (0.2 s), newest first</td>
                    </tr>
                    <tr>
                      <td><strong>State</strong></td>
                      <td>9</td>
                      <td>measured v, ω · path point 1.2 m ahead (x, y) · previous raw action (2) · cos, sin of path-heading error · signed cross-track error</td>
                    </tr>
                    <tr>
                      <td><strong>Memory</strong></td>
                      <td>128</td>
                      <td>GRU state from previous tick; zeros at route start</td>
                    </tr>
                    <tr>
                      <td><strong>Critic (Privileged)</strong></td>
                      <td>47</td>
                      <td>24-direction time-to-collision scan, root pose &amp; velocities, ground-truth pedestrian states. (Training only, never deployed)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Actor Architecture */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ background: '#fff', border: '2px solid var(--ink)', padding: '1.2rem', boxShadow: '4px 4px 0 var(--ink)' }}>
                  <img
                    src="/assets/figures/model_6999/fig_arch_actor.png"
                    alt="Actor neural network architecture showing CNN visual stack, GRU side branch, and MLP head"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                  <span style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--muted)', marginTop: '0.6rem' }}>
                    FIG 2: Actor Architecture (2,875,452 parameters) — 4-frame depth stack → 3-layer CNN → detached latent → GRU(256→128) side branch → 4-layer MLP head.
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="insight-card">
                  <h3>Four Architectural Pillars</h3>
                  <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', lineHeight: 1.7, color: '#334446', margin: 0 }}>
                    <li><strong>1. Vision Encoder:</strong> 3 convolutions (32@8×8/4, 64@4×4/2, 64@3×3/1, ELU) reduce depth stack to 3,136 features. Normalized 9 state numbers appended → 3,145-number latent.</li>
                    <li><strong>2. Memory Side-Branch:</strong> Latent is detached, projected 3,145 → 256, fed to one-layer GRU(256 → 128). GRU output joins latent: 3,145 + 128 = 3,273. Starts with zero-initialized weights.</li>
                    <li><strong>3. Decision Head:</strong> MLP 3,273 → 512 → 256 → 128 → 2 outputs means of two Gaussians over (v, ω) with learned widths (σ_v = 1.22, σ_ω = 0.87).</li>
                    <li><strong>4. Motor Path:</strong> v = clip(a_v, ±1) × 1.6 m/s, ω = clip(a_ω, ±1) × 3.0 rad/s. Wall reflex ramps speed down from 1.8 m to 0.6 m, reverse at 0.4 m/s.</li>
                  </ul>
                </div>

                <div className="insight-card">
                  <h3>Training &amp; Auxiliary Loss</h3>
                  <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#334446' }}>
                    <strong>PPO via rsl_rl</strong> with asymmetric critic: 64 envs × 48 steps (2.4 s, matching memory's BPTT window),
                    5 epochs × 4 minibatches, Adam with learning rate adapted to KL 0.01, clip 0.2, γ 0.995, λ 0.95.
                  </p>
                  <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#334446' }}>
                    <strong>Auxiliary Spatial Supervision:</strong> The GRU state is additionally trained to predict, for each 15° bearing slice,
                    how close the nearest pedestrian <em>seen earlier this episode</em> was (1 − d/4 m; 0 if none). This provides the essential
                    gradient signal before terminal collision penalties.
                  </p>
                  <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#334446', margin: 0 }}>
                    <strong>Optimizer State Warm-Start:</strong> Each stage warm-starts the previous one with its full Adam momentum state:
                    resetting Adam dropped goal arrivals from 75% to 8% in 10 iterations!
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Empirical Results */}
            <section style={{ marginBottom: '3rem' }}>
              <p className="section-kicker">03 // EMPIRICAL EVALUATION RESULTS</p>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: '2rem', margin: '0.4rem 0 1.2rem 0' }}>
                Monotone Progression &amp; Blind-Time Breakdown
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="insight-card">
                  <h3>Benchmark Progression Across Checkpoints</h3>
                  <table className="spec-table">
                    <thead>
                      <tr>
                        <th>Metric</th>
                        <th>SOLID_BASE 4499</th>
                        <th>+ Action Rate (5499)</th>
                        <th>+ GRU Memory (6999)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Episodes</strong></td>
                        <td>507</td>
                        <td>1,038</td>
                        <td><strong>929</strong></td>
                      </tr>
                      <tr>
                        <td><strong>Reached Goal</strong></td>
                        <td>69.4%</td>
                        <td>75.8% (73.1–78.3)</td>
                        <td><strong style={{ color: '#038270' }}>86.9% (84.5–88.9)</strong></td>
                      </tr>
                      <tr>
                        <td><strong>Pedestrian Hit</strong></td>
                        <td>28.2%</td>
                        <td>22.7% (20.3–25.4)</td>
                        <td><strong style={{ color: '#038270' }}>11.3% (9.4–13.5)</strong></td>
                      </tr>
                      <tr>
                        <td><strong>Timeout</strong></td>
                        <td>–</td>
                        <td>1.4%</td>
                        <td><strong>1.6%</strong></td>
                      </tr>
                      <tr>
                        <td><strong>Passing L / R</strong></td>
                        <td>–</td>
                        <td>44 / 56</td>
                        <td><strong>44 / 56</strong></td>
                      </tr>
                    </tbody>
                  </table>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.8rem', fontFamily: 'var(--mono)' }}>
                    * 95% Wilson score intervals do not overlap between 5499 and 6999. Passing side split is unchanged, confirming memory introduces zero swerve bias.
                  </p>
                </div>

                <div style={{ background: '#fff', border: '2px solid var(--ink)', padding: '1rem', boxShadow: '3px 3px 0 var(--ink)' }}>
                  <img
                    src="/assets/figures/model_6999/fig_outcomes.png"
                    alt="Evaluation outcomes graph showing Wilson intervals across 4499, 5499, and 6999"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                  <span style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--muted)', marginTop: '0.6rem' }}>
                    FIG 3: Episode outcomes across 3 model evolutions with 95% Wilson confidence bounds.
                  </span>
                </div>
              </div>

              {/* Where the hits went */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="insight-card">
                  <h3>Where the Hits Went (Per 1,000 Episodes)</h3>
                  <table className="spec-table">
                    <thead>
                      <tr>
                        <th>Time Out of View at Hit</th>
                        <th>Feedforward 5499</th>
                        <th>GRU Memory 6999</th>
                        <th>Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Still in view</td>
                        <td>46</td>
                        <td><strong>6.5</strong></td>
                        <td>−86% (fewer close encounters)</td>
                      </tr>
                      <tr>
                        <td>≤ 0.2 s</td>
                        <td>18</td>
                        <td><strong>7.5</strong></td>
                        <td>−58%</td>
                      </tr>
                      <tr>
                        <td><strong>0.2 – 1.2 s</strong></td>
                        <td>118</td>
                        <td><strong>41</strong></td>
                        <td><strong style={{ color: '#038270' }}>−65% (target memory zone)</strong></td>
                      </tr>
                      <tr>
                        <td>1.2 – 3.0 s</td>
                        <td>30</td>
                        <td>39</td>
                        <td>+30%</td>
                      </tr>
                      <tr>
                        <td>&gt; 3.0 s</td>
                        <td>3.9</td>
                        <td>10.8</td>
                        <td>Residual long-blind</td>
                      </tr>
                      <tr style={{ background: '#f3efe5', fontWeight: 800 }}>
                        <td>TOTAL HITS</td>
                        <td>216</td>
                        <td>104</td>
                        <td>−52% total reduction</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ background: '#fff', border: '2px solid var(--ink)', padding: '1rem', boxShadow: '3px 3px 0 var(--ink)' }}>
                  <img
                    src="/assets/figures/model_6999/fig_memory_skill.png"
                    alt="Memory skill retention by blind age"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                  <span style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--muted)', marginTop: '0.6rem' }}>
                    FIG 4: Memory skill decay vs time out of view. Smooth linear decline without a cliff at 2.4 s.
                  </span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ===================================================================
            TAB 2: DESIGN JOURNEY (AUG - OCT 2026)
            =================================================================== */}
        {activeTab === 'journey' && (
          <div>
            <div className="insight-card" style={{ borderLeft: '6px solid var(--cyan)', marginBottom: '2.5rem' }}>
              <p className="section-kicker">CHRONOLOGICAL DISCOVERY LOG</p>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.6rem', margin: '0.4rem 0 1rem 0' }}>
                How model_6999 Was Built: From Static Clutter to a Remembering Local Planner
              </h2>
              <p style={{ fontSize: '0.96rem', lineHeight: 1.7, color: '#233436' }}>
                The final policy (<code>MEM_GRU_model_6999</code>) is the fourth design, not the first.
                Each earlier design failed in a way that told us what the next one needed. Below is the unvarnished
                engineering journey across three months of simulation research.
              </p>
            </div>

            {/* The 4 Eras Table */}
            <div className="insight-card" style={{ marginBottom: '2.5rem' }}>
              <h3>The Four Development Eras</h3>
              <table className="spec-table">
                <thead>
                  <tr>
                    <th>Era</th>
                    <th>What We Built</th>
                    <th>What It Taught Us</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>1. Static clutter (Aug)</strong></td>
                    <td>RL policy on BARN-style box courses, LiDAR input</td>
                    <td>Static traversal plateaued at ~46% success; the real target was <em>dynamic</em> avoidance.</td>
                  </tr>
                  <tr>
                    <td><strong>2. Privileged teacher (Aug–early Sep)</strong></td>
                    <td>PPO teacher that sees pedestrians as a time-to-collision (TTC) scan → <code>model_699</code></td>
                    <td>TTC is the right language for risk; but a teacher that sees more than the camera cannot be distilled into a camera student.</td>
                  </tr>
                  <tr>
                    <td><strong>3. Rebuild (mid Sep)</strong></td>
                    <td>Policy = local planner inside global trajectory, end-to-end from depth, asymmetric critic → <code>SOLID_BASE_4499</code></td>
                    <td>The formulation and reward arithmetic were as wrong as the architecture; coverage is not the whole problem.</td>
                  </tr>
                  <tr>
                    <td><strong>4. Smooth, then remember (late Sep)</strong></td>
                    <td>Action-rate penalty → <code>5499</code>; GRU memory → <code>model_6999</code></td>
                    <td>Pedestrians leave the 120° view just before impact; spatial memory halves the collisions.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Comparison: model_699 vs model_6999 */}
            <div className="insight-card" style={{ marginBottom: '2.5rem' }}>
              <h3>Head-to-Head: Privileged Teacher (model_699) vs Deployable Student (model_6999)</h3>
              <table className="spec-table">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>model_699 (Stage 5 Teacher)</th>
                    <th>MEM_GRU_model_6999 (Current Local Planner)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Role</strong></td>
                    <td>Privileged teacher (theoretical ceiling)</td>
                    <td>Deployable local planner intended for the robot</td>
                  </tr>
                  <tr>
                    <td><strong>Environment</strong></td>
                    <td>Open arena, no walls or path, 8 pedestrians</td>
                    <td>Walled corridor, 10 m global path, 3 pedestrians</td>
                  </tr>
                  <tr>
                    <td><strong>Sensing</strong></td>
                    <td>Analytic TTC scan from ground truth, 200°, omniscient</td>
                    <td>4 depth frames, 120° × 120°, 2.88 m, plus 128-number GRU memory</td>
                  </tr>
                  <tr>
                    <td><strong>Task</strong></td>
                    <td>Reach an unconstrained goal (clipped to 3 m)</td>
                    <td>Follow a global trajectory, dodge, and cleanly rejoin</td>
                  </tr>
                  <tr>
                    <td><strong>Actor Input</strong></td>
                    <td>32 numbers (scalar scan)</td>
                    <td>28,224 (depth pixels) + 9 (state) + 128 (memory)</td>
                  </tr>
                  <tr>
                    <td><strong>Network</strong></td>
                    <td>MLP 32-256-128-64-2</td>
                    <td>CNN + GRU + MLP (2,875,452 parameters)</td>
                  </tr>
                  <tr>
                    <td><strong>Reward Pricing</strong></td>
                    <td>Goal +100, collision −100, timeout −100</td>
                    <td>Goal +100, hit −200, timeout −30, TTC −4, personal −14, track +1, action rate −0.5</td>
                  </tr>
                  <tr>
                    <td><strong>Result</strong></td>
                    <td>91.5% goal, 8.5% hit (n = 1,024)</td>
                    <td><strong>86.9% goal, 11.3% hit (n = 929)</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Runs on Robot?</strong></td>
                    <td>No (requires omniscient simulation scan)</td>
                    <td><strong>Yes</strong> (purely on Femto Bolt depth + wheel encoders)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* What Failed and What Worked Table */}
            <div className="insight-card" style={{ marginBottom: '2.5rem' }}>
              <h3>Engineering Retrospective: What Failed vs What Worked</h3>
              <table className="spec-table">
                <thead>
                  <tr>
                    <th>Failed or Retracted Hypotheses</th>
                    <th>What Actually Worked in Practice</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Fixed 8 m goal (9 million steps, exactly 0 arrivals)</td>
                    <td>Reverse start sampling so initial episodes are winnable in 2 seconds</td>
                  </tr>
                  <tr>
                    <td>Pedestrian slot list sorted by Euclidean threat</td>
                    <td>Directional Time-to-Collision (TTC) scan encoding free gaps</td>
                  </tr>
                  <tr>
                    <td>200° "camera-matched" arc (unverified placeholder constant)</td>
                    <td>Measuring real mount: 120° × 120°, 2.88 m range, flat 0.09 m up</td>
                  </tr>
                  <tr>
                    <td>Privileged teacher distilled into depth student</td>
                    <td>End-to-end depth actor trained with asymmetric privileged critic only</td>
                  </tr>
                  <tr>
                    <td>Action-rate penalty on unconstrained raw action outputs</td>
                    <td>Penalizing the <em>clamped</em> action rate to kill 5 Hz white noise chatter</td>
                  </tr>
                  <tr>
                    <td>"100% of hits happen blind outside the cone for 3.9 s"</td>
                    <td>Re-measurement via frame check: 99.3% were seen, then lost (median 0.3 s blind)</td>
                  </tr>
                  <tr>
                    <td>Resetting Adam optimizer state between training phases</td>
                    <td>Carrying Adam momentum state across stages (resetting dropped arrival 75% → 8%)</td>
                  </tr>
                  <tr>
                    <td>Longer memory BPTT window or CNN trained by memory loss</td>
                    <td>128-D GRU side branch + auxiliary 15° sector proximity loss</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: VIDEO TELEMETRY & 14-EPISODE BENCHMARK
            =================================================================== */}
        {activeTab === 'telemetry' && (
          <div>
            <div className="insight-card" style={{ borderLeft: '6px solid var(--orange)', marginBottom: '2rem' }}>
              <p className="section-kicker">1080P SIMULATION &amp; DEPTH TENSOR RUNS</p>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.6rem', margin: '0.4rem 0 0.8rem 0' }}>
                14-Episode Complete Video Evaluation Benchmark
              </h2>
              <p style={{ fontSize: '0.94rem', lineHeight: 1.6, color: '#334446', margin: 0 }}>
                High-definition synchronized recording featuring 11 successful goal arrivals and 3 pedestrian hit edge cases.
                Displays simulation third-person camera viewport alongside the real 4×84×84 depth tensor and live motor telemetry.
              </p>
            </div>

            {/* Video Player Box */}
            <div style={{ background: '#060d0e', border: '2px solid var(--ink)', boxShadow: '4px 4px 0 var(--ink)', overflow: 'hidden', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1.2rem', background: '#0d1a1c', borderBottom: '1px solid rgba(131,221,208,0.25)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: '#cde2de', marginLeft: '8px', fontWeight: 700 }}>
                    MEM_GRU_MODEL_6999 // 14-EPISODE BENCHMARK ROLLOUT // 1080P 20Hz
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.66rem', color: 'var(--acid)', background: 'rgba(230,255,88,0.15)', padding: '0.2rem 0.5rem', border: '1px solid rgba(230,255,88,0.3)', fontWeight: 800 }}>
                  86.9% GOAL · 11.3% HIT
                </span>
              </div>

              <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#000' }}>
                <video
                  src="/assets/videos/model_6999_video_report.mp4"
                  autoPlay
                  loop
                  muted
                  controls
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                />
              </div>

              <div style={{ padding: '1.2rem', background: '#081315', borderTop: '1px solid rgba(131,221,208,0.2)', color: '#cde2de' }}>
                <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.6 }}>
                  <strong>Video Telemetry Inspection:</strong> Displays the agent maintaining a brisk 1.37–1.60 m/s forward speed while
                  actively weaving through counter-walking pedestrians. Watch the depth HUD in the lower quadrant: as pedestrians slip outside
                  the 120° visual frustum, the internal 128-D GRU state retains their trajectory, preventing the robot from turning back into their path.
                </p>
              </div>
            </div>

            {/* Training curves & vectors */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: '#fff', border: '2px solid var(--ink)', padding: '1rem', boxShadow: '3px 3px 0 var(--ink)' }}>
                <img
                  src="/assets/figures/model_6999/fig_training.png"
                  alt="Training loss curves and reward progression"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <span style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--muted)', marginTop: '0.6rem' }}>
                  FIG 5: Training dynamics across iterations — Value loss, policy entropy, and auxiliary sector MSE.
                </span>
              </div>

              <div style={{ background: '#fff', border: '2px solid var(--ink)', padding: '1rem', boxShadow: '3px 3px 0 var(--ink)' }}>
                <img
                  src="/assets/figures/model_6999/fig_reward_shapes.png"
                  alt="Reward terms breakdown and cost balancing"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <span style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--muted)', marginTop: '0.6rem' }}>
                  FIG 6: Reward term geometry — Time-to-Collision penalty curve vs personal space disc.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Card */}
        <div
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
            <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.6rem', margin: '0 0 0.5rem 0' }}>
              Explore the Dynamoid Checkpoint &amp; Artifacts
            </h3>
            <p style={{ margin: 0, color: '#a4beba', fontSize: '0.88rem', maxWidth: '620px' }}>
              Complete code snapshot, configuration YAMLs, evaluation logs, and model checkpoints are available in the project archives.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="brief-back-btn"
              onClick={onBack}
            >
              ← Back to Selected Work
            </button>
            <a
              href="/assets/reports/MEM_GRU_model_6999_report.pdf"
              target="_blank"
              rel="noreferrer"
              className="brief-back-btn"
              style={{ background: 'var(--acid)', color: 'var(--ink)' }}
            >
              Evaluation PDF ↗
            </a>
            <a
              href="/assets/reports/MEM_GRU_model_6999_journey.pdf"
              target="_blank"
              rel="noreferrer"
              className="brief-back-btn"
              style={{ background: 'var(--cyan)', color: 'var(--ink)' }}
            >
              Journey PDF ↗
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};
