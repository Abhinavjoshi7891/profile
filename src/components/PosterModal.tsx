import React from 'react';

interface PosterData {
  title: string;
  authors: string;
  affiliation: string;
  badge: string;
  problem: string;
  architecture: string;
  methodology: string[];
  results: string;
  diagram: string;
}

const posterDatabase: Record<string, PosterData> = {
  'vla-forklift': {
    title: 'Vision-Language-Action (VLA) Grounding for Autonomous Forklift Docking',
    authors: 'Abhinav Joshi, Mobile Robotics Team',
    affiliation: 'Addverb Technologies · Industrial Robotics Research',
    badge: 'VLA Poster',
    problem:
      'Autonomous forklift docking into warehouse bays requires millimetric precision under extreme lighting variations, specular reflections on metal pallets, and unmapped clutter. Traditional handcrafted state machines fail when bay geometries deviate or when pallets are damaged.',
    architecture:
      'We investigate an end-to-end Vision-Language-Action (VLA) foundation policy combining multi-view RGB-D streams, 2D LiDAR point clouds, and natural-language bay instructions. The model passes through a spatiotemporal multimodal tokenizer and cross-attention policy transformer, outputting continuous steering, traction, and fork lift/tilt actions bounded by a hard real-time safety envelope.',
    methodology: [
      'Multimodal Fusion: Continuous camera frames + 2D LiDAR scans tokenized alongside natural-language target directives ("Dock into Bay 04-B").',
      'Spatial Cross-Attention: Interleaving visual features with geometric fork kinematic constraints.',
      'Safety Execution Clamp: Sub-20ms CAN bus hardware supervisor enforcing dynamic velocity envelopes and collision stops.',
    ],
    results:
      'Ongoing research demonstrating zero-shot adaptation across diverse bay lighting scenarios and robust trajectory generation without requiring static pre-mapped waypoints.',
    diagram: '/assets/diagrams/forklift_vla.svg',
  },
  'elexis-w': {
    title: 'Learned Social Navigation for Elexis-W Wheeled Humanoid: A Timing Formulation',
    authors: 'Abhinav Joshi, Advanced Robotics Team',
    affiliation: 'Addverb Technologies · NVIDIA Isaac Lab Simulation',
    badge: 'Humanoid Social Nav Poster',
    problem:
      'Navigating a 133 kg wheeled humanoid carrying dual 7-DOF arms across human-occupied spaces. Single-frame range scans are provably insufficient because a human walking towards the robot produces the exact same instantaneous scan as a static wall. Standard distance penalty functions lead directly to the "frozen-robot" failure mode—where standing still minimizes proximity cost.',
    architecture:
      'Formulated social evasion as a timing problem rather than static geometry. The policy observes per-agent relative position and velocity, and minimizes Time-to-Collision (TTC) instead of Euclidean distance. The physical safety envelope is governed by the 0.79 m arm reach disc rather than the wheelbase.',
    methodology: [
      'Curriculum Alignment: 2048 parallel environments in Isaac Lab using PPO with asymmetric actor-critic.',
      'Diagnostic Breakthrough: Identified that a 12s episode penalized correct evasion maneuvers (traversal takes 9.5s, leaving <1.8s slack). Doubling episode duration raised arrival from 0% to 89%.',
      'Action Space Regularization: Eliminating reverse from action space eliminated procrastination attractor under discounting.',
    ],
    results:
      'Stage 0 Evaluation: 89.4% arrival rate, 9.9% collision, 0.7% timeout. Mean closest approach 2.46s TTC against a 3.0s horizon. Negative finding: Slowing pedestrians made learning 6.5x harder due to corridor occupancy constraints.',
    diagram: '/assets/diagrams/elexis_w.svg',
  },
  'hccepose': {
    title: 'Monocular 6D/9D Pallet Pose Estimation via Gray-Coded Correspondences & Consensus Voting',
    authors: 'Abhinav Joshi, Mobile Robotics Team',
    affiliation: 'Addverb Technologies · Perception & Synthetic Sim',
    badge: '6D Pose Poster',
    problem:
      'Forklift pallet engagement in commercial fleets requires reliable 6D/9D pose estimation. Commercial RGB-D sensors fail completely on specular metal pallets due to IR scatter, and degrade severely under changing warehouse lighting. Moreover, high-end 3D sensors are cost-prohibitive for large-scale fleets.',
    architecture:
      'Adapted HCCEPose (dense per-pixel 2D-3D correspondence) to monocular RGB input. Uses Gray-coded coordinate representations and a 4-way PnP + RANSAC hypothesis vote that mathematically resolves 180° pallet flip ambiguity and filters glare-corrupted pixels by consensus.',
    methodology: [
      'Domain-Randomized Synthetic Data: Pipeline built using BlenderProc to BOP format with deliberate degradation injection (specular glare, heavy occlusion, physical damage, and pallet loads).',
      'Consensus Voting: 4-way PnP hypothesis generation eliminates symmetric ambiguity.',
      'Low-Cost Target Compute: Engineered for tight sub-20ms inference latency budget on low-cost onboard Intel compute.',
    ],
    results:
      'Robust, glare-resilient 6D bounding box recovery from single monocular RGB frames, replacing expensive and fragile depth sensors while maintaining real-time throughput.',
    diagram: '/assets/diagrams/hccepose.svg',
  },
};

interface PosterModalProps {
  posterId: string | null;
  onClose: () => void;
}

export const PosterModal: React.FC<PosterModalProps> = ({ posterId, onClose }) => {
  if (!posterId || !posterDatabase[posterId]) return null;

  const data = posterDatabase[posterId];

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="news-tag tag-role">Addverb Industrial Research</span>
            <span className="news-tag tag-paper">{data.badge}</span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="poster-header">
            <h2 style={{ fontSize: '1.45rem', marginBottom: '6px' }}>{data.title}</h2>
            <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.95rem', margin: '0 0 4px 0' }}>
              {data.authors}
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', margin: 0 }}>{data.affiliation}</p>
          </div>

          <div className="poster-grid">
            <div className="poster-col">
              <div className="poster-block">
                <h5>Problem &amp; Motivation</h5>
                <p>{data.problem}</p>
              </div>

              <div className="poster-block">
                <h5>Proposed Architecture</h5>
                <p>{data.architecture}</p>
              </div>

              {data.diagram && (
                <div className="poster-diagram-wrap">
                  <img src={data.diagram} alt={data.title} style={{ width: '100%', borderRadius: '8px' }} />
                </div>
              )}
            </div>

            <div className="poster-col">
              <div className="poster-block">
                <h5>Technical Methodology</h5>
                <ul>
                  {data.methodology.map((m, idx) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="poster-block">
                <h5>Empirical Results &amp; Insights</h5>
                <p>{data.results}</p>
              </div>

              <div className="poster-block">
                <h5>PhD Research Relevance</h5>
                <p>
                  Demonstrates empirical diagnostic rigor, mathematical modeling of real-world constraints, and hardware-level execution that directly supports doctoral research in embodied foundation models and extreme robotics.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
            Industrial research brief presented for prospective PhD advisor review.
          </span>
          <button type="button" className="btn btn-sm" onClick={() => window.print()}>
            Print / Save PDF
          </button>
        </div>
      </div>
    </div>
  );
};
