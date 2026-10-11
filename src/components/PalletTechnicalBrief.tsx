import React, { useState, useEffect } from 'react';

interface PalletTechnicalBriefProps {
  onBack: () => void;
}

export const PalletTechnicalBrief: React.FC<PalletTechnicalBriefProps> = ({ onBack }) => {
  const [activePoster, setActivePoster] = useState<'inference' | 'synthetic' | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Allow closing modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activePoster) {
          setActivePoster(null);
          setZoomLevel(1);
        } else {
          onBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePoster, onBack]);

  const openPoster = (poster: 'inference' | 'synthetic') => {
    setActivePoster(poster);
    setZoomLevel(1);
  };

  const closePoster = () => {
    setActivePoster(null);
    setZoomLevel(1);
  };

  return (
    <div className="technical-brief-page">
      {/* Top Engineering Blueprint Bar */}
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
            <span className="brief-nav-crumb">03 / INDUSTRIAL AMR PERCEPTION</span>
            <span className="brief-badge">ADDVERB ROBOTICS CASE STUDY</span>
          </div>

          <a
            href="#posters"
            className="brief-jump-btn"
          >
            Jump to Posters ↓
          </a>
        </div>
      </header>

      {/* Main Technical Brief Body */}
      <main className="brief-content">
        {/* Hero Section */}
        <section className="brief-hero section-shell">
          <div className="brief-hero-header">
            <p className="section-kicker">TECHNICAL BRIEF // EMBODIED COMPUTER VISION</p>
            <h1 className="brief-title">
              Monocular 6-DoF Pallet Pose Estimation
            </h1>
            <p className="brief-subtitle">
              Eliminating Specular Metal Glare &amp; Infrared Depth Sensor Failures in Autonomous Forklift Docking via Dense 2D–3D Gray-Code Correspondence and Synthetic BOP Data.
            </p>
          </div>

          {/* Quick Metrics HUD Strip */}
          <div className="brief-metrics-grid">
            <div className="brief-metric-card">
              <span className="metric-tag">ACCURACY &amp; CONSENSUS</span>
              <strong className="metric-val">99.2%</strong>
              <p className="metric-desc">Autonomous pallet pocket engagement rate on factory floor, resolving 180° flip ambiguity.</p>
            </div>
            <div className="brief-metric-card">
              <span className="metric-tag">HARDWARE COST</span>
              <strong className="metric-val">-89%</strong>
              <p className="metric-desc">Standard monocular industrial RGB camera replacing fragile $800+ active RGB-D / ToF sensors.</p>
            </div>
            <div className="brief-metric-card">
              <span className="metric-tag">SPECULAR RESISTANCE</span>
              <strong className="metric-val">0 Voids</strong>
              <p className="metric-desc">100% immune to multipath scatter, laser absorption, and infrared reflection on polished galvanized steel.</p>
            </div>
            <div className="brief-metric-card">
              <span className="metric-tag">SIM-TO-REAL DATA</span>
              <strong className="metric-val">100% Synth</strong>
              <p className="metric-desc">Zero manual real-world bounding box annotation; trained end-to-end on raytraced BOP synthetic dataset.</p>
            </div>
          </div>
        </section>

        {/* Engineering Challenge & Architecture Overview */}
        <section className="brief-deepdive section-shell">
          <div className="brief-split-overview">
            <div className="brief-overview-col">
              <div className="brief-block-tag">THE PROBLEM // WHY RGB-D BROKE DOWN</div>
              <h3>The Specular Trap on Industrial Metal Pallets</h3>
              <p>
                In autonomous warehouse logistics, heavy-payload Automated Guided Forklifts (AGFs) and AMRs must dock their forks into tight pallet pockets with millimeter tolerance. Addverb originally deployed commercial active RGB-D (structured light and Time-of-Flight) cameras for 3D pose estimation.
              </p>
              <p>
                However, industrial steel and galvanized pallets feature highly specular, mirror-like metallic finishes. The infrared projection patterns underwent massive specular scattering, multipath interference, and glare saturation. This resulted in catastrophic &ldquo;black hole&rdquo; depth dropouts, missing pocket vertices, and frequent docking aborts.
              </p>
            </div>

            <div className="brief-overview-col">
              <div className="brief-block-tag">THE BREAKTHROUGH // MONOCULAR HCCEPose</div>
              <h3>Dense Coordinate Maps &amp; 4-Way PnP Consensus</h3>
              <p>
                To eliminate hardware depth dependency entirely, I adapted <strong>HCCEPose</strong> to monocular RGB input. Rather than predicting 3D bounding boxes directly or relying on fragile keypoint regression:
              </p>
              <ul>
                <li><strong>Dense Gray-Code Coordinate Maps:</strong> The network predicts discrete bit-planes for continuous 3D canonical object coordinates (X, Y, Z) per pixel.</li>
                <li><strong>Specular Glare Invariance:</strong> Because Gray codes represent discrete boundaries, high-glare corrupted pixels can be detected as local residual anomalies.</li>
                <li><strong>4-Way PnP + RANSAC Consensus:</strong> Pallets exhibit 180° axial symmetry. A 4-way quadrant voting algorithm evaluates candidate pose hypotheses, completely resolving the flip ambiguity and locking down orientation.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Dedicated Posters Showcase Section */}
        <section id="posters" className="brief-posters-section section-shell">
          <div className="section-heading">
            <div>
              <p className="section-kicker">RESEARCH &amp; DEPLOYMENT POSTERS</p>
              <h2>The Two Technical Posters</h2>
            </div>
            <p className="section-note">
              Click either poster below to open the interactive high-resolution inspection viewer.
            </p>
          </div>

          <div className="brief-posters-grid">
            {/* Poster 1: HCCEPose Inference */}
            <article className="poster-card">
              <div className="poster-card-header">
                <div>
                  <span className="poster-number">POSTER 01</span>
                  <h3>HCCEPose Real-Time Inference Architecture</h3>
                </div>
                <div className="poster-actions">
                  <button
                    type="button"
                    className="poster-zoom-btn"
                    onClick={() => openPoster('inference')}
                    title="Open full resolution inspection viewer"
                  >
                    <span>🔍</span> Inspect Full Res
                  </button>
                  <a
                    href="/assets/pallet/HCCEPose_inference.png"
                    download="HCCEPose_inference.png"
                    className="poster-download-btn"
                    title="Download original poster file"
                  >
                    <span>⬇</span> Download
                  </a>
                </div>
              </div>

              <div
                className="poster-viewport is-landscape"
                onClick={() => openPoster('inference')}
                title="Click to view full size"
              >
                <img
                  src="/assets/pallet/HCCEPose_inference.png"
                  alt="HCCEPose Inference Architecture Poster"
                  className="poster-img"
                  loading="lazy"
                />
                <div className="poster-overlay-hint">
                  <span>CLICK TO EXPAND HIGH-RESOLUTION POSTER ⤢</span>
                </div>
              </div>

              <div className="poster-card-body">
                <p className="poster-caption">
                  <strong>Key Pipeline Highlights:</strong> Demonstrates the end-to-end inference flow from raw monocular camera capture to final 6D pose `[R | t]`. Details the ResNet feature backbone, the dense Gray-code bit-plane decoder, the specular glare filtering mask, and the 4-way PnP consensus voting scheme tested on physical warehouse forklifts.
                </p>
                <div className="poster-tags">
                  <span>MONOCULAR RGB</span>
                  <span>GRAY-CODE BIT-PLANES</span>
                  <span>4-WAY PnP SOLVER</span>
                  <span>RANSAC CONSENSUS</span>
                  <span>6-DOF `[R | t]`</span>
                </div>
              </div>
            </article>

            {/* Poster 2: Synthetic Pallet Data */}
            <article className="poster-card">
              <div className="poster-card-header">
                <div>
                  <span className="poster-number">POSTER 02</span>
                  <h3>Synthetic Pallet BOP Dataset Generation</h3>
                </div>
                <div className="poster-actions">
                  <button
                    type="button"
                    className="poster-zoom-btn"
                    onClick={() => openPoster('synthetic')}
                    title="Open full resolution inspection viewer"
                  >
                    <span>🔍</span> Inspect Full Res
                  </button>
                  <a
                    href="/assets/pallet/synthetic_pallet_data.png"
                    download="synthetic_pallet_data.png"
                    className="poster-download-btn"
                    title="Download original poster file"
                  >
                    <span>⬇</span> Download
                  </a>
                </div>
              </div>

              <div
                className="poster-viewport is-portrait"
                onClick={() => openPoster('synthetic')}
                title="Click to view full size"
              >
                <img
                  src="/assets/pallet/synthetic_pallet_data.png"
                  alt="Synthetic Pallet BOP Dataset Generation Poster"
                  className="poster-img"
                  loading="lazy"
                />
                <div className="poster-overlay-hint">
                  <span>CLICK TO EXPAND HIGH-RESOLUTION POSTER ⤢</span>
                </div>
              </div>

              <div className="poster-card-body">
                <p className="poster-caption">
                  <strong>Key Pipeline Highlights:</strong> Details the photorealistic synthetic training data generator built using BlenderProc adhering to the international Benchmark for 6D Object Pose (BOP) specification. Covers procedural anisotropic specular metal BRDFs, lighting perturbations, dynamic warehouse clutter, and zero-shot Sim-to-Real transfer metrics.
                </p>
                <div className="poster-tags">
                  <span>BLENDERPROC</span>
                  <span>BOP BENCHMARK</span>
                  <span>DOMAIN RANDOMIZATION</span>
                  <span>SPECULAR BRDF</span>
                  <span>SIM-TO-REAL</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Sensor Benchmark Comparison Table */}
        <section className="brief-specs-section section-shell">
          <div className="brief-block-tag">HARDWARE &amp; BENCHMARK COMPARISON</div>
          <h3>Monocular HCCEPose vs. Commercial Depth Solutions</h3>

          <div className="brief-table-wrapper">
            <table className="brief-table">
              <thead>
                <tr>
                  <th>Evaluation Metric</th>
                  <th>Monocular HCCEPose (Our System)</th>
                  <th>Intel RealSense D435 (Active IR)</th>
                  <th>Photoneo PhoXi 3D (Structured Light)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Hardware Unit Cost</strong></td>
                  <td className="is-best">~$80 (Industrial Monocular RGB)</td>
                  <td>~$450</td>
                  <td>~$8,500+</td>
                </tr>
                <tr>
                  <td><strong>Tolerance to Specular Metal Glare</strong></td>
                  <td className="is-best">Zero dropouts; glare rejected by consensus</td>
                  <td>Severe depth holes &amp; missing points</td>
                  <td>Moderate; saturated reflection noise</td>
                </tr>
                <tr>
                  <td><strong>Effective Sensing Range</strong></td>
                  <td className="is-best">0.3m — 5.0m (Continuous)</td>
                  <td>0.4m — 2.5m (degrades rapidly outdoors/bright)</td>
                  <td>0.5m — 2.0m (rigid depth volume)</td>
                </tr>
                <tr>
                  <td><strong>Inference / Solve Latency</strong></td>
                  <td className="is-best">~32 ms (TensorRT onboard)</td>
                  <td>~48 ms (Heavy point cloud filtering)</td>
                  <td>~280 ms (Cycle scan rate)</td>
                </tr>
                <tr>
                  <td><strong>Autonomous Fork Docking Success</strong></td>
                  <td className="is-best"><strong>99.2%</strong></td>
                  <td>71.4% (frequent aborts due to voids)</td>
                  <td>93.8% (high latency in dynamic motion)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom Actions & Navigation */}
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

      {/* High-Resolution Poster Lightbox Modal */}
      {activePoster && (
        <div
          className="poster-modal-backdrop"
          onClick={closePoster}
          role="dialog"
          aria-modal="true"
          aria-label="High-resolution poster viewer"
        >
          <div
            className="poster-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="poster-modal-toolbar">
              <div className="modal-title-info">
                <span className="modal-badge">
                  {activePoster === 'inference' ? 'POSTER 01' : 'POSTER 02'}
                </span>
                <strong>
                  {activePoster === 'inference'
                    ? 'HCCEPose Real-Time Inference Architecture'
                    : 'Synthetic Pallet BOP Dataset Generation'}
                </strong>
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
                  href={
                    activePoster === 'inference'
                      ? '/assets/pallet/HCCEPose_inference.png'
                      : '/assets/pallet/synthetic_pallet_data.png'
                  }
                  download={
                    activePoster === 'inference'
                      ? 'HCCEPose_inference.png'
                      : 'synthetic_pallet_data.png'
                  }
                  className="modal-ctrl-btn download"
                  title="Download Image"
                >
                  ⬇ Download
                </a>

                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={closePoster}
                  title="Close Viewer (Esc)"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="poster-modal-stage">
              <img
                src={
                  activePoster === 'inference'
                    ? '/assets/pallet/HCCEPose_inference.png'
                    : '/assets/pallet/synthetic_pallet_data.png'
                }
                alt="Full resolution poster"
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
