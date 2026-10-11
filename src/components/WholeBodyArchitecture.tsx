import React, { useState, useEffect } from 'react';

interface WholeBodyArchitectureProps {
  onBack: () => void;
}

type DiagramKey = 'core' | 'tasks1_5' | 'task6a' | 'task6b';

interface DiagramInfo {
  key: DiagramKey;
  number: string;
  title: string;
  subtitle: string;
  filename: string;
  src: string;
  tags: string[];
  description: string;
}

const DIAGRAMS: DiagramInfo[] = [
  {
    key: 'core',
    number: 'DIAGRAM 01',
    title: 'Core Whole-Body Loco-Manipulation Architecture',
    subtitle: 'Single unified neural policy controlling 18 actuated DOFs (12 Go2 leg joints + 6 SO-101 arm joints) end-to-end.',
    filename: 'whole_body_locomotion.png',
    src: '/assets/whole_body/whole_body_locomotion.png',
    tags: ['18-DOF UNIFIED POLICY', 'ACTOR-CRITIC PPO', 'GENESIS SIMULATOR', 'NO DECOUPLING'],
    description:
      'Unlike traditional hierarchical pipelines that separate mobile base locomotion from robotic arm manipulation, our system trains a single unified neural policy. Proprioceptive joint states, base velocities, projected gravity, and target 6D end-effector poses are fed into a shared network that directly outputs PD position targets for all 18 actuators simultaneously, completely eliminating base-arm coordination latency.',
  },
  {
    key: 'tasks1_5',
    number: 'DIAGRAM 02',
    title: 'Curriculum & Task Families 1–5: Locomotion & Agility',
    subtitle: 'From omnidirectional walking to high-speed sprinting, bounding leaps, and dynamic yaw rotation.',
    filename: '1-5.png',
    src: '/assets/whole_body/1-5.png',
    tags: ['TASK FAMILIES 1–5', 'TROT GAIT', 'SPRINT', 'BOUNDING LEAP', 'CURRICULUM RL'],
    description:
      'The policy is trained against a procedural six-family trajectory curriculum. Tasks 1 through 5 instill robust base locomotion: forward trotting, reverse stepping, rapid in-place turning, high-speed sprinting, and explosive vertical bounding. Domain randomization over terrain restitution, surface friction, motor strength, and joint damping ensures rugged physical transfer.',
  },
  {
    key: 'task6a',
    number: 'DIAGRAM 03',
    title: 'Task Family 6A: Dynamic End-Effector Trajectory Tracking',
    subtitle: 'Coordinated body-arm reaching where quadruped base automatically steps to extend manipulation workspace.',
    filename: '6a.png',
    src: '/assets/whole_body/6a.png',
    tags: ['TASK 6A', '6D POSE TRACKING', 'EXPANDED WORKSPACE', 'WHOLE-BODY REACH'],
    description:
      'Task 6A evaluates continuous 6D Cartesian trajectory tracking of the SO-101 end-effector. When the target trajectory moves beyond the kinematic reach of the arm alone, the policy naturally steps the quadruped base, rotates the pelvis, and tilts the torso to bring the arm into optimal manipulation position while tracking operator commands within 1–3 cm.',
  },
  {
    key: 'task6b',
    number: 'DIAGRAM 04',
    title: 'Task Family 6B: Biped Rearing & Extreme High-Reach Manipulation',
    subtitle: 'Dynamic bipedal posture balancing on hind legs to manipulate objects at extreme vertical heights.',
    filename: '6b.png',
    src: '/assets/whole_body/6b.png',
    tags: ['TASK 6B', 'BIPED REARING', 'EXTREME VERTICAL REACH', 'DYNAMIC BALANCE'],
    description:
      'Task 6B pushes the morphological envelope by training the quadruped to rear up onto its two rear legs, maintaining dynamic balance while extending the SO-101 arm to high shelves and overhead interaction zones. The front limbs act as dynamic counter-weights to stabilize the center of mass during vigorous end-effector tracking.',
  },
];

const PROPOSAL_PAGES = [
  { page: 1, title: 'Problem & Motivation // Disaster Relief Context', src: '/assets/whole_body/proposal_pages/page-1.png' },
  { page: 2, title: 'State of the Art & Evidence of Feasibility', src: '/assets/whole_body/proposal_pages/page-2.png' },
  { page: 3, title: 'System Architecture & Research Phases 1–3', src: '/assets/whole_body/proposal_pages/page-3.png' },
  { page: 4, title: 'Expected Results, Milestones & Timeline', src: '/assets/whole_body/proposal_pages/page-4.png' },
];

export const WholeBodyArchitecture: React.FC<WholeBodyArchitectureProps> = ({ onBack }) => {
  const [activeDiagram, setActiveDiagram] = useState<DiagramInfo | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [proposalPage, setProposalPage] = useState<number>(1);
  const [proposalMode, setProposalMode] = useState<'paged' | 'continuous' | 'native'>('paged');

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeDiagram) {
          setActiveDiagram(null);
          setZoomLevel(1);
        } else {
          onBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDiagram, onBack]);

  const openDiagram = (d: DiagramInfo) => {
    setActiveDiagram(d);
    setZoomLevel(1);
  };

  const closeDiagram = () => {
    setActiveDiagram(null);
    setZoomLevel(1);
  };

  return (
    <div className="technical-brief-page">
      {/* Top Navigation Bar */}
      <header className="brief-navbar">
        <div className="brief-nav-container">
          <button
            type="button"
            className="brief-back-btn"
            onClick={onBack}
            title="Return to Main Portfolio (Esc)"
          >
            <span className="arrow">←</span>
            <span>Return to Portfolio</span>
          </button>

          <div className="brief-nav-meta">
            <span className="brief-nav-crumb">04 / EMBODIED AI · WHOLE-BODY CONTROL</span>
            <span className="brief-badge">UNITREE GO2 + SO-101 ARCHITECTURE</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <a
              href="#proposal"
              className="brief-jump-btn"
              style={{ background: 'var(--acid)', color: 'var(--ink)', borderColor: 'var(--ink)', fontWeight: 800 }}
            >
              📄 Read Research Proposal ↓
            </a>
            <a href="#diagrams" className="brief-jump-btn">
              Jump to Diagrams ↓
            </a>
          </div>
        </div>
      </header>

      <main className="brief-content">
        {/* Hero Section */}
        <section className="brief-hero section-shell">
          <div className="brief-hero-header">
            <p className="section-kicker">SYSTEM ARCHITECTURE // EMBODIED AI &amp; LOCO-MANIPULATION</p>
            <h1 className="brief-title">
              Whole-Body Loco-Manipulation: Go2 + SO-101
            </h1>
            <p className="brief-subtitle">
              Unified 18-DOF neural control policy, six-family 6-D trajectory curriculum in Genesis simulation, and physical leader-follower teleoperation deployment.
            </p>

            {/* Direct Action Buttons for Proposal */}
            <div style={{ marginTop: '1.4rem', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a
                href="#proposal"
                className="proposal-btn-primary"
                style={{ padding: '0.65rem 1.3rem', fontSize: '0.82rem' }}
              >
                <span>📄</span> Read Research Proposal (Centaur PDF) ↓
              </a>
              <a
                href="/assets/whole_body/Centaur_Proposal.pdf"
                target="_blank"
                rel="noreferrer"
                className="proposal-btn-secondary"
                style={{ padding: '0.65rem 1.2rem', fontSize: '0.82rem' }}
              >
                <span>↗</span> Open PDF in New Tab
              </a>
              <a
                href="/assets/whole_body/Centaur_Proposal.pdf"
                download="Centaur_Proposal.pdf"
                className="proposal-btn-secondary"
                style={{ padding: '0.65rem 1.2rem', fontSize: '0.82rem' }}
              >
                <span>⬇</span> Download PDF (9.6 MB)
              </a>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="brief-metrics-grid">
            <div className="brief-metric-card">
              <span className="metric-tag">ACTUATED FREEDOM</span>
              <strong className="metric-val">18 DOFs</strong>
              <p className="metric-desc">12 quadruped leg motors + 6 arm joints driven simultaneously by a single unified policy.</p>
            </div>
            <div className="brief-metric-card">
              <span className="metric-tag">POLICY ARCHITECTURE</span>
              <strong className="metric-val">1 Network</strong>
              <p className="metric-desc">Zero hierarchical decoupling; base stepping and arm reaching solve jointly in real time.</p>
            </div>
            <div className="brief-metric-card">
              <span className="metric-tag">TRACKING PRECISION</span>
              <strong className="metric-val">1–3 cm</strong>
              <p className="metric-desc">End-effector Cartesian tracking error during live leader-follower teleoperation.</p>
            </div>
            <div className="brief-metric-card">
              <span className="metric-tag">SIMULATION ENGINE</span>
              <strong className="metric-val">Genesis</strong>
              <p className="metric-desc">High-throughput GPU simulation ported from Isaac Gym for fast policy convergence.</p>
            </div>
          </div>
        </section>

        {/* Overview Split */}
        <section className="brief-deepdive section-shell">
          <div className="brief-split-overview">
            <div className="brief-overview-col">
              <div className="brief-block-tag">THE PROBLEM // DECOUPLED CONTROL DRIFT</div>
              <h3>Why Traditional Mobile Manipulation Fails</h3>
              <p>
                Classical mobile manipulation treats the mobile platform and the robotic arm as two separate systems: an inverse kinematics (IK) planner commands the arm, while a base controller independently navigates the chassis.
              </p>
              <p>
                In high-speed dynamic tasks, this decoupling causes extreme tracking lag, base-arm oscillations, and workspace singularities. If the quadruped pitches or rolls over rough ground, decoupled arms fail to compensate in real time, causing dropped objects and unstable tipping.
              </p>
            </div>

            <div className="brief-overview-col">
              <div className="brief-block-tag">THE BREAKTHROUGH // UNIFIED 18-DOF POLICY</div>
              <h3>End-to-End Coordinated Whole-Body Policy</h3>
              <p>
                We replicated and extended MLM (Liu et al.) on the Unitree Go2 quadruped equipped with an open-source 6-DOF SO-101 manipulator arm.
              </p>
              <ul>
                <li><strong>Unified State-Action Mapping:</strong> The policy receives full-body proprioception and outputs 18 joint position offsets simultaneously at 50 Hz.</li>
                <li><strong>Emergent Coordination:</strong> The quadruped naturally bends its knees, crouches, leans forward, or steps into position to enable the arm to reach extreme poses.</li>
                <li><strong>Live Physical Teleoperation:</strong> Driven by an intuitive desktop SO-101 leader arm, mirroring human operator manipulation in real-time.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Embedded Research Proposal Document Section */}
        <section id="proposal" className="brief-proposal-section section-shell">
          <div className="section-heading">
            <div>
              <p className="section-kicker">OFFICIAL RESEARCH PROPOSAL DOCUMENT</p>
              <h2>Centaur Research Proposal</h2>
            </div>
            <p className="section-note">
              Whole-Body Loco-Manipulation and Morphology-Control Co-Design in Unstructured &amp; Non-Stationary Environments.
            </p>
          </div>

          <article className="proposal-card">
            <div className="proposal-card-header">
              <div className="proposal-meta-title">
                <span className="poster-number">RESEARCH PROPOSAL // CENTAUR PROJECT</span>
                <h3>Centaur: Whole-Body Loco-Manipulation &amp; Morphology-Control Co-Design</h3>
              </div>
              <div className="proposal-actions">
                <a
                  href="/assets/whole_body/Centaur_Proposal.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="proposal-btn-primary"
                  title="Open original PDF in browser tab"
                >
                  <span>↗</span> Open PDF in New Tab
                </a>
                <a
                  href="/assets/whole_body/Centaur_Proposal.pdf"
                  download="Centaur_Proposal.pdf"
                  className="proposal-btn-secondary"
                  title="Download complete PDF"
                >
                  <span>⬇</span> Download PDF (9.6 MB)
                </a>
              </div>
            </div>

            {/* View Mode Switcher Toolbar */}
            <div className="proposal-view-modes">
              <div className="proposal-mode-tabs">
                <button
                  type="button"
                  className={`proposal-mode-tab ${proposalMode === 'paged' ? 'is-active' : ''}`}
                  onClick={() => setProposalMode('paged')}
                >
                  📄 Page-by-Page View
                </button>
                <button
                  type="button"
                  className={`proposal-mode-tab ${proposalMode === 'continuous' ? 'is-active' : ''}`}
                  onClick={() => setProposalMode('continuous')}
                >
                  📜 Continuous All Pages
                </button>
                <button
                  type="button"
                  className={`proposal-mode-tab ${proposalMode === 'native' ? 'is-active' : ''}`}
                  onClick={() => setProposalMode('native')}
                >
                  🔍 Native PDF Reader
                </button>
              </div>

              {proposalMode === 'paged' && (
                <div className="proposal-page-nav">
                  <button
                    type="button"
                    className="proposal-page-btn"
                    disabled={proposalPage === 1}
                    onClick={() => setProposalPage((p) => Math.max(1, p - 1))}
                  >
                    ← Prev
                  </button>
                  <span className="proposal-page-counter">
                    PAGE {proposalPage} OF 4
                  </span>
                  <button
                    type="button"
                    className="proposal-page-btn"
                    disabled={proposalPage === 4}
                    onClick={() => setProposalPage((p) => Math.min(4, p + 1))}
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>

            {/* Document Viewer Stage */}
            <div className="proposal-viewer-stage">
              {proposalMode === 'paged' && (
                <div
                  className="proposal-sheet-wrapper"
                  onClick={() => openDiagram({
                    key: 'core',
                    number: `PROPOSAL PAGE ${proposalPage}`,
                    title: `Centaur Proposal — ${PROPOSAL_PAGES[proposalPage - 1].title}`,
                    subtitle: 'Full resolution view of the official research proposal.',
                    filename: `centaur_proposal_page_${proposalPage}.png`,
                    src: PROPOSAL_PAGES[proposalPage - 1].src,
                    tags: ['RESEARCH PROPOSAL', 'CENTAUR PROJECT', 'CO-DESIGN', `PAGE ${proposalPage}/4`],
                    description: 'Official proposal submitted for whole-body loco-manipulation and morphology-control co-design on quadrupedal/bipedal platforms in non-stationary and post-disaster environments.',
                  })}
                  title="Click to inspect full resolution"
                >
                  <img
                    src={PROPOSAL_PAGES[proposalPage - 1].src}
                    alt={`Centaur Proposal Page ${proposalPage}`}
                    className="proposal-sheet-img"
                  />
                  <div className="proposal-sheet-footer">
                    <span>PAGE {proposalPage} OF 4 · CLICK TO EXPAND ⤢</span>
                  </div>
                </div>
              )}

              {proposalMode === 'continuous' && (
                <div className="proposal-continuous-stack">
                  {PROPOSAL_PAGES.map((pg) => (
                    <div
                      key={pg.page}
                      className="proposal-sheet-wrapper"
                      onClick={() => openDiagram({
                        key: 'core',
                        number: `PROPOSAL PAGE ${pg.page}`,
                        title: `Centaur Proposal — ${pg.title}`,
                        subtitle: 'Full resolution view of the official research proposal.',
                        filename: `centaur_proposal_page_${pg.page}.png`,
                        src: pg.src,
                        tags: ['RESEARCH PROPOSAL', 'CENTAUR PROJECT', 'CO-DESIGN', `PAGE ${pg.page}/4`],
                        description: 'Official proposal submitted for whole-body loco-manipulation and morphology-control co-design.',
                      })}
                      title="Click to inspect full resolution"
                    >
                      <img
                        src={pg.src}
                        alt={`Centaur Proposal Page ${pg.page}`}
                        className="proposal-sheet-img"
                        loading="lazy"
                      />
                      <div className="proposal-sheet-footer">
                        <span>PAGE {pg.page} OF 4 · CLICK TO EXPAND ⤢</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {proposalMode === 'native' && (
                <iframe
                  src="/assets/whole_body/Centaur_Proposal.pdf#toolbar=1"
                  title="Centaur Research Proposal PDF"
                  className="proposal-native-frame"
                />
              )}
            </div>
          </article>
        </section>

        {/* Diagrams Section */}
        <section id="diagrams" className="brief-posters-section section-shell">
          <div className="section-heading">
            <div>
              <p className="section-kicker">SYSTEM SCHEMATICS &amp; CURRICULUM</p>
              <h2>The 4 Architecture Diagrams</h2>
            </div>
            <p className="section-note">
              Click any diagram to inspect full-resolution schematics, network layers, and curriculum charts.
            </p>
          </div>

          <div className="brief-posters-grid">
            {DIAGRAMS.map((diag) => (
              <article key={diag.key} className="poster-card">
                <div className="poster-card-header">
                  <div>
                    <span className="poster-number">{diag.number}</span>
                    <h3>{diag.title}</h3>
                  </div>
                  <div className="poster-actions">
                    <button
                      type="button"
                      className="poster-zoom-btn"
                      onClick={() => openDiagram(diag)}
                      title="Inspect full resolution schematic"
                    >
                      <span>🔍</span> Inspect Full Res
                    </button>
                    <a
                      href={diag.src}
                      download={diag.filename}
                      className="poster-download-btn"
                      title="Download schematic image"
                    >
                      <span>⬇</span> Download
                    </a>
                  </div>
                </div>

                <div
                  className="poster-viewport is-landscape"
                  onClick={() => openDiagram(diag)}
                  title="Click to view full size"
                >
                  <img
                    src={diag.src}
                    alt={diag.title}
                    className="poster-img"
                    loading="lazy"
                  />
                  <div className="poster-overlay-hint">
                    <span>CLICK TO EXPAND HIGH-RESOLUTION SCHEMATIC ⤢</span>
                  </div>
                </div>

                <div className="poster-card-body">
                  <p className="poster-caption">
                    <strong>Technical Breakdown:</strong> {diag.description}
                  </p>
                  <div className="poster-tags">
                    {diag.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Bottom Actions */}
        <section className="brief-footer-nav section-shell">
          <div className="brief-footer-card">
            <div>
              <p className="section-kicker">READY TO RETURN</p>
              <h3>Explore more robotics systems &amp; autonomous stacks.</h3>
            </div>
            <button
              type="button"
              className="brief-return-large-btn"
              onClick={onBack}
            >
              <span>← Return to Selected Work</span>
            </button>
          </div>
        </section>
      </main>

      {/* High-Resolution Modal Viewer */}
      {activeDiagram && (
        <div
          className="poster-modal-backdrop"
          onClick={closeDiagram}
          role="dialog"
          aria-modal="true"
          aria-label="High-resolution diagram viewer"
        >
          <div
            className="poster-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="poster-modal-toolbar">
              <div className="modal-title-info">
                <span className="modal-badge">{activeDiagram.number}</span>
                <strong>{activeDiagram.title}</strong>
              </div>

              <div className="modal-zoom-controls">
                <button
                  type="button"
                  className="modal-ctrl-btn"
                  onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.2))}
                  title="Zoom Out"
                >
                  −
                </button>
                <span className="modal-zoom-display">{Math.round(zoomLevel * 100)}%</span>
                <button
                  type="button"
                  className="modal-ctrl-btn"
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
                  title="Zoom In"
                >
                  +
                </button>
                <button
                  type="button"
                  className="modal-ctrl-btn reset"
                  onClick={() => setZoomLevel(1)}
                  title="Reset Zoom"
                >
                  Reset
                </button>

                <a
                  href={activeDiagram.src}
                  download={activeDiagram.filename}
                  className="modal-ctrl-btn download"
                  title="Download Image"
                >
                  ⬇ Download
                </a>

                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={closeDiagram}
                  title="Close Viewer (Esc)"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="poster-modal-stage">
              <img
                src={activeDiagram.src}
                alt={activeDiagram.title}
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'top center',
                  transition: 'transform 160ms ease-out',
                }}
                className="poster-modal-image"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
