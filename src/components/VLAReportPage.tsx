import React, { useState, useEffect } from 'react';

interface VLAReportPageProps {
  onBack: () => void;
}

const REPORT_PAGES = Array.from({ length: 14 }, (_, i) => {
  const pageNum = i + 1;
  const padNum = String(pageNum).padStart(2, '0');
  const titles = [
    'Title, Abstract & Introduction // Vision-Language-Action Framing',
    'Task Definition & Tricycle AMR Simulation Platform in Isaac Sim',
    'Privileged Expert & DART-style Noise Injected Demonstrations',
    'SmolVLA 450M Architecture & Flow-Matching Action Expert',
    'Evaluation Protocol // 128 Fixed Random Starts Benchmark',
    'Ablation 1 // Velocity Proprioception Copycat Diagnosis (41% → 66%)',
    'Ablation 2 // Expert Maneuver Redesign & Decisive Fixes (66% → 94%)',
    'Closed-Loop Trajectory Comparisons & Convergence Metrics',
    'Latency-Aware Inference & 20 Hz Control Loop Timings',
    'Zero-Jam Reliability Analysis & Collision Free Entry Bounds',
    'Gated Hardware Deployment Path & Safety Interlocks',
    'Related Work // Classical vs Neural End-to-End Docking',
    'Discussion, Failure Cases & Language Conditioning Roadmap',
    'Appendix // Hyperparameters, Loss Curves & Simulation Setup',
  ];
  return {
    page: pageNum,
    title: titles[i] || `Page ${pageNum}`,
    src: `/assets/vla_dock/report_pages/page-${padNum}.png`,
  };
});

export const VLAReportPage: React.FC<VLAReportPageProps> = ({ onBack }) => {
  const [activePage, setActivePage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'paged' | 'continuous' | 'native'>('paged');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      } else if (e.key === 'ArrowLeft' && viewMode === 'paged') {
        setActivePage((prev) => Math.max(1, prev - 1));
      } else if (e.key === 'ArrowRight' && viewMode === 'paged') {
        setActivePage((prev) => Math.min(14, prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack, viewMode]);

  return (
    <div className="brief-page-wrapper">
      {/* Sticky Navigation Bar */}
      <nav className="brief-navbar" aria-label="Report navigation">
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
            <span className="brief-badge">RESEARCH REPORT // ISAAC SIM</span>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.72rem',
                color: 'var(--ink)',
                fontWeight: 700,
              }}
            >
              SmolVLA 450M · 94% Docking
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <a
              href="/assets/vla_dock/vla_dock_report.pdf"
              target="_blank"
              rel="noreferrer"
              className="brief-back-btn"
              style={{ background: '#182527', color: '#ffffff' }}
              title="Open raw PDF in new browser tab"
            >
              ↗ OPEN PDF
            </a>
            <a
              href="/assets/vla_dock/vla_dock_report.pdf"
              download="VLA_Pallet_Truck_Docking_Report.pdf"
              className="brief-back-btn"
              style={{ background: 'var(--acid)', color: 'var(--ink)' }}
              title="Download full PDF document (882 KB)"
            >
              ⬇ DOWNLOAD (882 KB)
            </a>
          </div>
        </div>
      </nav>

      <main className="section-shell">
        {/* Hero Section */}
        <header className="brief-hero">
          <p className="section-kicker">AGILE AMR PROJECT // MINI RESEARCH REPORT · SIMULATION EVALUATION</p>
          <h1 className="brief-title">
            Learning to Dock a Pallet Truck<br />from One Camera
          </h1>
          <p className="brief-subtitle">
            Imitating a privileged expert with a 450M vision-language-action policy in Isaac Sim —
            achieving 94% closed-loop success from a single forward-facing RGB camera without runtime pose estimation.
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
            <span>AUTHOR: <strong>Abhinav Joshi</strong></span>
            <span>·</span>
            <span>SIMULATOR: <strong>NVIDIA Isaac Sim 6.0.1 / Isaac Lab</strong></span>
            <span>·</span>
            <span>STATUS: <strong>Closed-Loop 128-Start Benchmark (v4.1)</strong></span>
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
              94%
            </span>
            <span
              className="metric-lbl"
              style={{ color: '#c5ded8', fontSize: '0.74rem', fontFamily: 'var(--mono)', display: 'block', marginTop: '0.3rem' }}
            >
              CLOSED-LOOP SUCCESS (41% → 94% OVER 7 GENS)
            </span>
          </div>
          <div className="brief-metric-item">
            <span
              className="metric-val"
              style={{ color: 'var(--cyan)', fontSize: '2.4rem', fontFamily: 'var(--mono)', fontWeight: 900 }}
            >
              19 s
            </span>
            <span
              className="metric-lbl"
              style={{ color: '#c5ded8', fontSize: '0.74rem', fontFamily: 'var(--mono)', display: 'block', marginTop: '0.3rem' }}
            >
              MEDIAN DOCKING TIME (EXPERT: 18 s)
            </span>
          </div>
          <div className="brief-metric-item">
            <span
              className="metric-val"
              style={{ color: 'var(--acid)', fontSize: '2.4rem', fontFamily: 'var(--mono)', fontWeight: 900 }}
            >
              0
            </span>
            <span
              className="metric-lbl"
              style={{ color: '#c5ded8', fontSize: '0.74rem', fontFamily: 'var(--mono)', display: 'block', marginTop: '0.3rem' }}
            >
              STALL JAMS IN 128 TEST RUNS (v4.1)
            </span>
          </div>
          <div className="brief-metric-item">
            <span
              className="metric-val"
              style={{ color: 'var(--orange)', fontSize: '2.4rem', fontFamily: 'var(--mono)', fontWeight: 900 }}
            >
              450M
            </span>
            <span
              className="metric-lbl"
              style={{ color: '#c5ded8', fontSize: '0.74rem', fontFamily: 'var(--mono)', display: 'block', marginTop: '0.3rem' }}
            >
              SMOLVLA + 98M FLOW ACTION EXPERT
            </span>
          </div>
        </section>

        {/* Breakthrough Insights Summary Cards */}
        <section style={{ margin: '3.5rem 0' }}>
          <p className="section-kicker">CRITICAL EXPERIMENTAL FINDINGS</p>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: '2rem', margin: '0.2rem 0 1.5rem 0' }}>
            Closed-Loop Diagnoses That Unlocked 94% Reliability
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
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
                DIAGNOSIS 01 · 41% → 66%
              </span>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.25rem', margin: '0 0 0.6rem 0' }}>
                Hiding Velocity Eliminates Copycat Causal Confusion
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#334446', lineHeight: 1.6, margin: 0 }}>
                Analysing failure videos revealed the policy stalled whenever it stopped: observing near-zero
                traction wheel velocity led it to predict continued zero velocity ("stationary, therefore stay stationary").
                Completely withholding velocity proprioception forced the model to infer motion intention from sequential visual
                observations and steering angle, surging success by <strong>+25 percentage points</strong>.
              </p>
            </article>

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
                DIAGNOSIS 02 · 66% → 94%
              </span>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.25rem', margin: '0 0 0.6rem 0' }}>
                Privileged Expert Redesign for Decisive Recoveries
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#334446', lineHeight: 1.6, margin: 0 }}>
                The original expert triggered subtle, ambiguous micro-corrections whenever lateral error drifted by 2 cm.
                Because the monocular camera could not resolve such subtle offsets, the cloned policy became hesitant.
                Broadening alignment bands to the pocket tolerance (4 cm / 3°) and instituting decisive, high-yaw-rate pivot maneuvers
                boosted closed-loop performance to <strong>94% (120 / 128 starts)</strong> with zero jams.
              </p>
            </article>

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
                MODEL ARCHITECTURE
              </span>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.25rem', margin: '0 0 0.6rem 0' }}>
                SmolVLA + 98M Flow-Matching Action Expert
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#334446', lineHeight: 1.6, margin: 0 }}>
                Operates at 20 Hz from 256×144 scaled RGB images. Truncated SmolVLM2 (16 layers, 350M parameters)
                processes image tokens and the frozen instruction prompt "dock into the pallet". A dedicated 98M parameter action expert
                generates continuous 2-DoF control commands [steering angle target δ, wheel speed u] via conditional flow matching.
              </p>
            </article>
          </div>
        </section>

        {/* Document Viewer Section */}
        <section id="report-document" style={{ margin: '4rem 0' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '1rem',
              marginBottom: '1.5rem',
              borderBottom: '2px solid var(--ink)',
              paddingBottom: '1rem',
            }}
          >
            <div>
              <p className="section-kicker">COMPLETE 14-PAGE RESEARCH DOCUMENT</p>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: '2rem', margin: '0.2rem 0 0 0' }}>
                Full Technical Report Inspection
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
              <div
                style={{
                  display: 'inline-flex',
                  border: '1px solid var(--ink)',
                  background: '#ffffff',
                  padding: '2px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setViewMode('paged')}
                  style={{
                    padding: '0.45rem 0.9rem',
                    fontFamily: 'var(--mono)',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    background: viewMode === 'paged' ? 'var(--ink)' : 'transparent',
                    color: viewMode === 'paged' ? 'var(--acid)' : 'var(--ink)',
                  }}
                >
                  📖 Paged View
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('continuous')}
                  style={{
                    padding: '0.45rem 0.9rem',
                    fontFamily: 'var(--mono)',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    background: viewMode === 'continuous' ? 'var(--ink)' : 'transparent',
                    color: viewMode === 'continuous' ? 'var(--acid)' : 'var(--ink)',
                  }}
                >
                  📜 All 14 Pages
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('native')}
                  style={{
                    padding: '0.45rem 0.9rem',
                    fontFamily: 'var(--mono)',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    background: viewMode === 'native' ? 'var(--ink)' : 'transparent',
                    color: viewMode === 'native' ? 'var(--acid)' : 'var(--ink)',
                  }}
                >
                  📄 Native PDF
                </button>
              </div>

              <a
                href="/assets/vla_dock/vla_dock_report.pdf"
                download="VLA_Pallet_Truck_Docking_Report.pdf"
                className="brief-back-btn"
                style={{ background: 'var(--acid)', color: 'var(--ink)', fontSize: '0.72rem' }}
              >
                ⬇ PDF (882 KB)
              </a>
            </div>
          </div>

          {/* Mode 1: Paged Interactive View */}
          {viewMode === 'paged' && (
            <div
              style={{
                background: '#0a1416',
                border: '2px solid var(--ink)',
                boxShadow: '4px 4px 0 var(--ink)',
                padding: '1.2rem',
              }}
            >
              {/* Pagination Toolbar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#04090a',
                  border: '1px solid rgba(131, 221, 208, 0.3)',
                  padding: '0.8rem 1.2rem',
                  marginBottom: '1.2rem',
                  color: '#ffffff',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.8rem',
                }}
              >
                <div>
                  <span style={{ color: 'var(--acid)', fontWeight: 800 }}>
                    PAGE {String(activePage).padStart(2, '0')} / 14
                  </span>
                  <span style={{ marginLeft: '1rem', color: '#c5ded8' }}>
                    {REPORT_PAGES[activePage - 1].title}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button
                    type="button"
                    disabled={activePage <= 1}
                    onClick={() => setActivePage((p) => Math.max(1, p - 1))}
                    style={{
                      background: activePage <= 1 ? '#182527' : 'var(--ink)',
                      color: activePage <= 1 ? '#556668' : 'var(--acid)',
                      border: '1px solid rgba(131,221,208,0.3)',
                      padding: '0.4rem 0.8rem',
                      fontFamily: 'var(--mono)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      cursor: activePage <= 1 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    ← PREV PAGE
                  </button>
                  <button
                    type="button"
                    disabled={activePage >= 14}
                    onClick={() => setActivePage((p) => Math.min(14, p + 1))}
                    style={{
                      background: activePage >= 14 ? '#182527' : 'var(--ink)',
                      color: activePage >= 14 ? '#556668' : 'var(--acid)',
                      border: '1px solid rgba(131,221,208,0.3)',
                      padding: '0.4rem 0.8rem',
                      fontFamily: 'var(--mono)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      cursor: activePage >= 14 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    NEXT PAGE →
                  </button>
                </div>
              </div>

              {/* Page Display */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  background: '#040809',
                  padding: '1rem',
                  overflowX: 'auto',
                }}
              >
                <img
                  src={REPORT_PAGES[activePage - 1].src}
                  alt={REPORT_PAGES[activePage - 1].title}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                />
              </div>

              {/* Page Quick Picker */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  justifyContent: 'center',
                  marginTop: '1.2rem',
                  padding: '0.6rem',
                  background: '#060e10',
                }}
              >
                {REPORT_PAGES.map((p) => (
                  <button
                    key={p.page}
                    type="button"
                    onClick={() => setActivePage(p.page)}
                    style={{
                      width: '36px',
                      height: '32px',
                      fontFamily: 'var(--mono)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      border: p.page === activePage ? '2px solid var(--acid)' : '1px solid rgba(131,221,208,0.2)',
                      background: p.page === activePage ? 'var(--acid)' : '#0d1a1c',
                      color: p.page === activePage ? 'var(--ink)' : '#cde2de',
                      cursor: 'pointer',
                    }}
                    title={p.title}
                  >
                    {p.page}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mode 2: Continuous Stacked View */}
          {viewMode === 'continuous' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5rem',
                alignItems: 'center',
                background: '#040809',
                padding: '2rem 1rem',
                border: '2px solid var(--ink)',
              }}
            >
              {REPORT_PAGES.map((p) => (
                <div
                  key={p.page}
                  style={{
                    maxWidth: '900px',
                    width: '100%',
                    background: '#081214',
                    border: '1px solid rgba(131,221,208,0.3)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
                  }}
                >
                  <div
                    style={{
                      background: '#030809',
                      padding: '0.6rem 1rem',
                      borderBottom: '1px solid rgba(131,221,208,0.2)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontFamily: 'var(--mono)',
                      fontSize: '0.72rem',
                      color: 'var(--cyan)',
                    }}
                  >
                    <span>PAGE {String(p.page).padStart(2, '0')} OF 14</span>
                    <span style={{ color: '#ffffff' }}>{p.title}</span>
                  </div>
                  <img
                    src={p.src}
                    alt={p.title}
                    loading="lazy"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Mode 3: Native PDF Iframe View */}
          {viewMode === 'native' && (
            <div
              style={{
                border: '2px solid var(--ink)',
                background: '#060e10',
                padding: '0.8rem',
              }}
            >
              <div
                style={{
                  padding: '0.6rem 1rem',
                  background: '#0d1a1c',
                  color: 'var(--acid)',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.76rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.6rem',
                }}
              >
                <span>NATIVE EMBEDDED PDF VIEWER (882 KB)</span>
                <a
                  href="/assets/vla_dock/vla_dock_report.pdf"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#ffffff', textDecoration: 'underline' }}
                >
                  Open in External Viewer ↗
                </a>
              </div>
              <iframe
                src="/assets/vla_dock/vla_dock_report.pdf#toolbar=1"
                title="VLA Pallet Truck Docking Report PDF"
                width="100%"
                height="880px"
                style={{ border: 'none', background: '#ffffff' }}
              />
            </div>
          )}
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
              EXPLORE MORE SELECTED WORK
            </p>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.6rem', margin: 0 }}>
              Return to Autonomous Systems &amp; Whole-Body Deployments.
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
