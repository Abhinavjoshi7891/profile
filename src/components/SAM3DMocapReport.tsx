import React, { useState, useEffect } from 'react';

interface SAM3DMocapReportProps {
  onBack: () => void;
}

export const SAM3DMocapReport: React.FC<SAM3DMocapReportProps> = ({ onBack }) => {
  const [activeVideo, setActiveVideo] = useState<'boxing' | 'multiobj'>('boxing');

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
            <span className="brief-badge">META SAM 3D BODY · DINOv3 + MHR</span>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.72rem',
                color: 'var(--ink)',
                fontWeight: 700,
              }}
            >
              18,439 Vertices · 127 Joints · 8GB VRAM Optimized
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
          <p className="section-kicker">COMPUTER VISION &amp; BIOMECHANICS // TECHNICAL REPORT</p>
          <h1 className="brief-title">
            SAM 3D Body Video Motion Capture System
          </h1>
          <p className="brief-subtitle">
            A research-grade computer vision and kinematics pipeline designed to extract dense 3D human body and hand
            motion capture (mocap) from standard 2D monocular and multi-view video sequences — coupling Meta's SAM 3D Body (DINOv3)
            with SAM 3 promptable video segmentation, MoGe metric depth estimation, and interactive Rerun 3D spatial streaming.
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
            <span>FOUNDATION MODELS: <strong>Meta SAM 3D Body (DINOv3) + SAM 3 + MoGe Depth</strong></span>
            <span>·</span>
            <span>KINEMATICS: <strong>MHR (127 Joints) + SMPL-X Compatible</strong></span>
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
              18,439
            </span>
            <span
              className="metric-lbl"
              style={{ color: '#c5ded8', fontSize: '0.74rem', fontFamily: 'var(--mono)', display: 'block', marginTop: '0.3rem' }}
            >
              DENSE 3D MESH VERTICES
            </span>
          </div>
          <div className="brief-metric-item">
            <span
              className="metric-val"
              style={{ color: 'var(--cyan)', fontSize: '2.4rem', fontFamily: 'var(--mono)', fontWeight: 900 }}
            >
              127
            </span>
            <span
              className="metric-lbl"
              style={{ color: '#c5ded8', fontSize: '0.74rem', fontFamily: 'var(--mono)', display: 'block', marginTop: '0.3rem' }}
            >
              MHR KINEMATIC JOINTS
            </span>
          </div>
          <div className="brief-metric-item">
            <span
              className="metric-val"
              style={{ color: 'var(--orange)', fontSize: '2.4rem', fontFamily: 'var(--mono)', fontWeight: 900 }}
            >
              8 GB
            </span>
            <span
              className="metric-lbl"
              style={{ color: '#c5ded8', fontSize: '0.74rem', fontFamily: 'var(--mono)', display: 'block', marginTop: '0.3rem' }}
            >
              VRAM OPTIMIZED (RTX 4060)
            </span>
          </div>
          <div className="brief-metric-item">
            <span
              className="metric-val"
              style={{ color: '#ffffff', fontSize: '2.4rem', fontFamily: 'var(--mono)', fontWeight: 900 }}
            >
              4 FORMATS
            </span>
            <span
              className="metric-lbl"
              style={{ color: '#c5ded8', fontSize: '0.74rem', fontFamily: 'var(--mono)', display: 'block', marginTop: '0.3rem' }}
            >
              NOKOV · OPENSIM · BLENDER · RERUN
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
              <p className="section-kicker">MOCAP RECONSTRUCTION CAPTURES</p>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: '2rem', margin: '0.2rem 0 0 0' }}>
                Monocular Video to 3D Biomechanical Kinematics
              </h2>
            </div>

            {/* Video Switcher Tabs */}
            <div style={{ display: 'inline-flex', border: '1px solid var(--ink)', background: '#fff', padding: '2px' }}>
              <button
                type="button"
                onClick={() => setActiveVideo('boxing')}
                style={{
                  padding: '0.5rem 1rem',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  background: activeVideo === 'boxing' ? 'var(--ink)' : 'transparent',
                  color: activeVideo === 'boxing' ? 'var(--acid)' : 'var(--ink)',
                }}
              >
                🥊 Clip 1: Boxing Combat Mocap
              </button>
              <button
                type="button"
                onClick={() => setActiveVideo('multiobj')}
                style={{
                  padding: '0.5rem 1rem',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  background: activeVideo === 'multiobj' ? 'var(--ink)' : 'transparent',
                  color: activeVideo === 'multiobj' ? 'var(--acid)' : 'var(--ink)',
                }}
              >
                🏒 Clip 2: Multi-Object Track (Athlete + Prop)
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
                  {activeVideo === 'boxing'
                    ? 'SAM_3D_BODY // BOXING STRIKE KINEMATICS & 18,439-VERTEX MESH RECONSTRUCTION'
                    : 'SAM3_POINT_VIDEO_SEGMENT // MULTI-OBJECT ATHLETE + HANDHELD PROP TRACKING'}
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
                {activeVideo === 'boxing' ? 'SAVGOL SMOOTHING' : 'DUAL ENTITY MASK TRACK'}
              </span>
            </div>

            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#000' }}>
              <video
                key={activeVideo}
                src={activeVideo === 'boxing' ? 'assets/projects/sam3d_boxing_mocap.mp4' : 'assets/projects/sam3d_multiobj_mocap.mp4'}
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
                {activeVideo === 'boxing'
                  ? 'Source combat sports video overlaid with dense 3D shaded body surface mesh, 127-joint skeleton, and calibrated camera frustum.'
                  : 'Point-prompted SAM3 tracking segmenting both the athlete and handheld athletic equipment with concurrent metric depth extraction.'}
              </p>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--cyan)' }}>
                127 JOINTS · 70 KEYPOINTS · QUATERNION &amp; EULER ROTATIONS
              </span>
            </div>
          </div>
        </section>

        {/* 1. System Architecture & Data Flow */}
        <section style={{ margin: '3.5rem 0' }}>
          <p className="section-kicker">PIPELINE ARCHITECTURE &amp; DATA FLOW</p>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: '2rem', margin: '0.2rem 0 1.5rem 0' }}>
            From Raw Monocular Pixels to Biomechanical Kinematics
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.2rem',
            }}
          >
            {/* Stage 1 */}
            <article style={{ background: '#fff', border: '2px solid var(--ink)', padding: '1.4rem', boxShadow: '3px 3px 0 var(--ink)' }}>
              <span style={{ background: 'var(--ink)', color: 'var(--acid)', fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 800, padding: '0.2rem 0.5rem', display: 'inline-block', marginBottom: '0.6rem' }}>
                STAGE 01 · INPUT MODALITIES
              </span>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.15rem', margin: '0 0 0.5rem 0' }}>Video &amp; Guiding Prompts</h3>
              <p style={{ fontSize: '0.86rem', color: '#334446', lineHeight: 1.55, margin: 0 }}>
                Accepts standard monocular video files (.mp4, .avi, .mov at 24–60 fps) and multi-view sequences (.rrd recordings). Supports optional zero-shot text prompts (<code style={{ background: '#eee', padding: '1px 4px' }}>--text "person"</code>) or interactive 2D point clicks for athletes and handheld props.
              </p>
            </article>

            {/* Stage 2 */}
            <article style={{ background: '#fff', border: '2px solid var(--ink)', padding: '1.4rem', boxShadow: '3px 3px 0 var(--ink)' }}>
              <span style={{ background: 'var(--cyan)', color: 'var(--ink)', fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 800, padding: '0.2rem 0.5rem', display: 'inline-block', marginBottom: '0.6rem' }}>
                STAGE 02 · TRACKING &amp; MASKS
              </span>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.15rem', margin: '0 0 0.5rem 0' }}>SAM 3 Video Tracker</h3>
              <p style={{ fontSize: '0.86rem', color: '#334446', lineHeight: 1.55, margin: 0 }}>
                ViTDet and SAM 3 perform sequential multi-object detection, subject masking, and persistent identity tracking across frames, isolating human bounding boxes and equipment trajectories before lifting into 3D.
              </p>
            </article>

            {/* Stage 3 */}
            <article style={{ background: '#fff', border: '2px solid var(--ink)', padding: '1.4rem', boxShadow: '3px 3px 0 var(--ink)' }}>
              <span style={{ background: 'var(--orange)', color: '#fff', fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 800, padding: '0.2rem 0.5rem', display: 'inline-block', marginBottom: '0.6rem' }}>
                STAGE 03 · 3D ESTIMATION
              </span>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.15rem', margin: '0 0 0.5rem 0' }}>SAM 3D Body + MoGe</h3>
              <p style={{ fontSize: '0.86rem', color: '#334446', lineHeight: 1.55, margin: 0 }}>
                DINOv3 vision transformer backbone regresses dense 3D meshes (18,439 vertices) and MHR forward kinematics (127 joints). MoGe extracts dense metric depth maps and background 3D point clouds.
              </p>
            </article>

            {/* Stage 4 */}
            <article style={{ background: '#fff', border: '2px solid var(--ink)', padding: '1.4rem', boxShadow: '3px 3px 0 var(--ink)' }}>
              <span style={{ background: 'var(--acid)', color: 'var(--ink)', fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 800, padding: '0.2rem 0.5rem', display: 'inline-block', marginBottom: '0.6rem' }}>
                STAGE 04 · TEMPORAL FILTER
              </span>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.15rem', margin: '0 0 0.5rem 0' }}>Savitzky-Golay Smoothing</h3>
              <p style={{ fontSize: '0.86rem', color: '#334446', lineHeight: 1.55, margin: 0 }}>
                Applies polynomial Savitzky-Golay filtering (<code style={{ background: '#eee', padding: '1px 4px' }}>--smooth_method savgol</code>) to eliminate high-frequency visual jitter while preserving true velocity peaks and strike acceleration during fast athletic maneuvers.
              </p>
            </article>

            {/* Stage 5 */}
            <article style={{ background: '#fff', border: '2px solid var(--ink)', padding: '1.4rem', boxShadow: '3px 3px 0 var(--ink)' }}>
              <span style={{ background: 'var(--ink)', color: '#fff', fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 800, padding: '0.2rem 0.5rem', display: 'inline-block', marginBottom: '0.6rem' }}>
                STAGE 05 · EXPORTS
              </span>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.15rem', margin: '0 0 0.5rem 0' }}>Multi-Platform Mocap</h3>
              <p style={{ fontSize: '0.86rem', color: '#334446', lineHeight: 1.55, margin: 0 }}>
                Exports research-grade CSVs (Nokov, OpenSim, Blender compatible quaternions), raw .pkl/.npz dictionaries, side-by-side rendered .mp4 videos, and interactive Rerun 3D spatial recording files (.rrd).
              </p>
            </article>
          </div>
        </section>

        {/* 2. Hardware Optimization & Memory Strategies */}
        <section
          style={{
            background: '#ffffff',
            border: '2px solid var(--ink)',
            padding: '2rem',
            margin: '3.5rem 0',
            boxShadow: '4px 4px 0 var(--ink)',
          }}
        >
          <p className="section-kicker">CONSUMER HARDWARE ENGINEERING</p>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.8rem', margin: '0.2rem 0 1rem 0' }}>
            VRAM Management &amp; Optimization for &lt;12GB GPUs
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#334446', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            State-of-the-art vision models like SAM 3D Body and SAM 3 require substantial GPU memory.
            To enable reliable operation on laptop/consumer GPUs (e.g. <strong>NVIDIA GeForce RTX 4060 8GB</strong>),
            the pipeline implements three specialized architectural strategies:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{ borderLeft: '3px solid var(--orange)', paddingLeft: '1rem' }}>
              <h4 style={{ fontFamily: 'var(--mono)', fontSize: '0.86rem', color: 'var(--ink)', margin: '0 0 0.4rem 0' }}>
                1. CPU DETECTOR OFFLOADING
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#445557', lineHeight: 1.55, margin: 0 }}>
                In <code style={{ background: '#f4efe5', padding: '2px 4px' }}>video_mocap_pipeline.py</code>, if detected VRAM is less than 12 GB, the 2D bounding box detector (ViTDet) automatically offloads to system CPU RAM, conserving GPU memory entirely for the heavy SAM 3D Body model.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid var(--cyan)', paddingLeft: '1rem' }}>
              <h4 style={{ fontFamily: 'var(--mono)', fontSize: '0.86rem', color: 'var(--ink)', margin: '0 0 0.4rem 0' }}>
                2. SEQUENTIAL STAGE EXECUTION
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#445557', lineHeight: 1.55, margin: 0 }}>
                Scripts like <code style={{ background: '#f4efe5', padding: '2px 4px' }}>process_video_sam3_pcs_sequential.py</code> run SAM3 video tracking first, export mask tracks to disk, call <code style={{ background: '#f4efe5', padding: '2px 4px' }}>torch.cuda.empty_cache()</code> and <code style={{ background: '#f4efe5', padding: '2px 4px' }}>gc.collect()</code>, and only then instantiate the SAM 3D Body estimator.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid var(--acid)', paddingLeft: '1rem' }}>
              <h4 style={{ fontFamily: 'var(--mono)', fontSize: '0.86rem', color: 'var(--ink)', margin: '0 0 0.4rem 0' }}>
                3. CHUNKING &amp; STREAMING MODES
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#445557', lineHeight: 1.55, margin: 0 }}>
                In <code style={{ background: '#f4efe5', padding: '2px 4px' }}>sam3d-body-rerun</code>, <code style={{ background: '#f4efe5', padding: '2px 4px' }}>demo_chunk_video.py</code> and <code style={{ background: '#f4efe5', padding: '2px 4px' }}>demo_stream.py</code> process long video clips in small overlapping blocks with constant <strong>O(1) memory usage</strong>, preventing out-of-memory crashes on arbitrary video durations.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Research-Grade Outputs & Data Artifacts */}
        <section style={{ margin: '3.5rem 0' }}>
          <p className="section-kicker">DATA ARTIFACTS &amp; FORMAT SPECIFICATIONS</p>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: '2rem', margin: '0.2rem 0 1.5rem 0' }}>
            Biomechanical Kinematic Outputs
          </h2>

          <div
            style={{
              overflowX: 'auto',
              border: '2px solid var(--ink)',
              boxShadow: '4px 4px 0 var(--ink)',
              background: '#fff',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff', fontFamily: 'var(--mono)', fontSize: '0.75rem' }}>
                  <th style={{ padding: '0.8rem 1rem' }}>ARTIFACT FILE</th>
                  <th style={{ padding: '0.8rem 1rem' }}>STRUCTURE / CHANNELS</th>
                  <th style={{ padding: '0.8rem 1rem' }}>DOWNSTREAM COMPATIBILITY</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(24,37,39,0.15)' }}>
                  <td style={{ padding: '0.8rem 1rem', fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--orange)' }}>
                    &lt;video&gt;_keypoints_3d.csv
                  </td>
                  <td style={{ padding: '0.8rem 1rem' }}>Frame-by-frame (x_m, y_m, z_m) coordinates for 70 landmarks (torso, facial features, limbs, 40 hand joints).</td>
                  <td style={{ padding: '0.8rem 1rem', fontFamily: 'var(--mono)', fontSize: '0.78rem' }}>Nokov · Vicon · Qualisys</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(24,37,39,0.15)', background: '#faf9f5' }}>
                  <td style={{ padding: '0.8rem 1rem', fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--orange)' }}>
                    &lt;video&gt;_joints_positions.csv
                  </td>
                  <td style={{ padding: '0.8rem 1rem' }}>Metric 3D joint centers for all 127 anatomical joints in the Meta Human Representation (MHR) hierarchy.</td>
                  <td style={{ padding: '0.8rem 1rem', fontFamily: 'var(--mono)', fontSize: '0.78rem' }}>OpenSim Kinematics · MuJoCo</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(24,37,39,0.15)' }}>
                  <td style={{ padding: '0.8rem 1rem', fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--orange)' }}>
                    &lt;video&gt;_rotations_quaternion.csv
                  </td>
                  <td style={{ padding: '0.8rem 1rem' }}>Normalized unit quaternions (qw, qx, qy, qz) per joint describing relative rotational kinematics without gimbal lock.</td>
                  <td style={{ padding: '0.8rem 1rem', fontFamily: 'var(--mono)', fontSize: '0.78rem' }}>Blender Skeletal Rigging · Isaac Sim</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(24,37,39,0.15)', background: '#faf9f5' }}>
                  <td style={{ padding: '0.8rem 1rem', fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--orange)' }}>
                    &lt;video&gt;_rotations_euler.csv
                  </td>
                  <td style={{ padding: '0.8rem 1rem' }}>Euler angles expressed in degrees (XYZ convention) for biomechanical joint flexion/extension analysis.</td>
                  <td style={{ padding: '0.8rem 1rem', fontFamily: 'var(--mono)', fontSize: '0.78rem' }}>Clinical Sports Science · MATLAB</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(24,37,39,0.15)' }}>
                  <td style={{ padding: '0.8rem 1rem', fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--orange)' }}>
                    &lt;video&gt;.rrd (Rerun 3D Stream)
                  </td>
                  <td style={{ padding: '0.8rem 1rem' }}>Synchronized orbital 3D spatial stream containing camera frustum, dense MoGe depth point clouds, and shaded meshes.</td>
                  <td style={{ padding: '0.8rem 1rem', fontFamily: 'var(--mono)', fontSize: '0.78rem' }}>Rerun Interactive Viewer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Execution Workflows */}
        <section style={{ margin: '3.5rem 0' }}>
          <p className="section-kicker">CLI EXECUTION WORKFLOWS</p>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: '2rem', margin: '0.2rem 0 1.5rem 0' }}>
            Reproducible Pipeline Execution
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#0e1719', color: '#cde2de', border: '2px solid var(--ink)', padding: '1.4rem' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--acid)', fontWeight: 800 }}>
                SCENARIO A: MONOCULAR VIDEO MOCAP
              </span>
              <pre style={{ margin: '0.8rem 0 0 0', fontFamily: 'var(--mono)', fontSize: '0.74rem', lineHeight: 1.5, overflowX: 'auto', color: '#ffffff' }}>
{`python video_mocap_pipeline.py \\
    --video inputs/boxing_sample.mp4 \\
    --checkpoint ./checkpoints/sam-3d-body-dinov3/model.ckpt \\
    --output ./results \\
    --smooth_method savgol \\
    --smooth_window 7`}
              </pre>
            </div>

            <div style={{ background: '#0e1719', color: '#cde2de', border: '2px solid var(--ink)', padding: '1.4rem' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--cyan)', fontWeight: 800 }}>
                SCENARIO B: DEPTH + RERUN 3D STREAM
              </span>
              <pre style={{ margin: '0.8rem 0 0 0', fontFamily: 'var(--mono)', fontSize: '0.74rem', lineHeight: 1.5, overflowX: 'auto', color: '#ffffff' }}>
{`# 1. Generate dense metric depth cloud
python depth_estimator.py --video inputs/boxing_sample.mp4

# 2. Launch interactive 3D spatial viewer
python rerun_visualizer.py \\
    --video inputs/boxing_sample.mp4 \\
    --mocap results/boxing_data.pickle \\
    --depth boxing_depth_data.pkl`}
              </pre>
            </div>

            <div style={{ background: '#0e1719', color: '#cde2de', border: '2px solid var(--ink)', padding: '1.4rem' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--orange)', fontWeight: 800 }}>
                SCENARIO C: BIOMECHANICAL CSV EXPORT
              </span>
              <pre style={{ margin: '0.8rem 0 0 0', fontFamily: 'var(--mono)', fontSize: '0.74rem', lineHeight: 1.5, overflowX: 'auto', color: '#ffffff' }}>
{`python boxing_fullbody_mocap_export.py \\
    --pkl results/boxing_data.pickle \\
    --output ./biomech_exports \\
    --video_name athlete_trial_01`}
              </pre>
            </div>
          </div>
        </section>

        {/* Footer Return Card */}
        <div
          style={{
            background: 'var(--ink)',
            color: '#fff',
            padding: '2.5rem',
            textAlign: 'center',
            margin: '4rem 0 2rem 0',
            border: '2px solid var(--ink)',
            boxShadow: '6px 6px 0 var(--orange)',
          }}
        >
          <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.8rem', margin: '0 0 0.8rem 0', color: '#fff' }}>
            Explore Full Codebase &amp; Experiments
          </h3>
          <p style={{ color: '#cde2de', maxWidth: '650px', margin: '0 auto 1.5rem auto', fontSize: '0.92rem' }}>
            View the complete repository with multi-camera triangulations, Nokov kinematic exports, and interactive Rerun visualizations.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="brief-back-btn"
              onClick={onBack}
              style={{ background: 'transparent', color: '#fff', borderColor: '#fff' }}
            >
              ← Back to Selected Work
            </button>
            <a
              href="https://github.com/Abhinavjoshi7891"
              target="_blank"
              rel="noreferrer"
              className="brief-back-btn"
              style={{ background: 'var(--acid)', color: 'var(--ink)' }}
            >
              Visit GitHub Profile →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};
