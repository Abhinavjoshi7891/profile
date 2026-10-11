import React, { useState, useEffect, useRef } from 'react';
import { DexterDynamicsRacer } from './DexterDynamicsRacer';

interface SelectedWorkProps {
  onOpenBrief?: () => void;
  onOpenArchitecture?: () => void;
  onOpenVlaReport?: () => void;
  onOpenRlBrief?: () => void;
  onOpenSam3dReport?: () => void;
  onOpenDynamoidReport?: () => void;
  onShowToast?: (msg: string) => void;
}

interface VlaVideo {
  id: string;
  label: string;
  sublabel: string;
  src: string;
  telemetry: string;
  description: string;
}

const VLA_VIDEOS: VlaVideo[] = [
  {
    id: 'vla_dock_1',
    label: 'Rollout 01',
    sublabel: 'Head-On Approach (3X)',
    src: 'assets/vla_dock/vla_dock_1.mp4',
    telemetry: 'ACCURACY: 0.8 cm · HEADING: 0.7° · 3X SPEED',
    description: 'Autonomous reverse-pivot docking into pallet pockets from a single RGB camera. The SmolVLA policy guides tines smoothly without runtime pose estimation.',
  },
  {
    id: 'vla_dock_2',
    label: 'Rollout 02',
    sublabel: 'Angular Alignment Recovery (3X)',
    src: 'assets/vla_dock/vla_dock_2.mp4',
    telemetry: 'INIT YAW: ±15° · CORRECTED IN 14s · 3X SPEED',
    description: 'Recovery from large initial heading and lateral offsets. The flow-matching action expert executes decisive steering angle adjustments.',
  },
  {
    id: 'vla_dock_3',
    label: 'Rollout 03',
    sublabel: 'Precision Reverse Maneuver (3X)',
    src: 'assets/vla_dock/vla_dock_3.mp4',
    telemetry: 'MEDIAN TIME: 19s (EXPERT: 18s) · 3X SPEED',
    description: 'Final 1m precision approach reaching backrest switch blocks within 5 mm tolerance with zero pocket contact jams.',
  },
  {
    id: 'vla_dock_4',
    label: 'Rollout 04',
    sublabel: 'Stop-and-Fix Decisive Maneuver (3X)',
    src: 'assets/vla_dock/vla_dock_4.mp4',
    telemetry: 'SUCCESS RATE: 94% (41% → 94%) · 3X SPEED',
    description: 'Demonstrating v4.1 decisive stop-and-fix recovery: halting, pivoting in place at 90° steering, sliding forward, and re-engaging the centerline.',
  },
];

interface SkillVideo {
  id: string;
  label: string;
  sublabel: string;
  src: string;
  telemetry: string;
  description: string;
}

const SKILL_VIDEOS: SkillVideo[] = [
  {
    id: 'forward',
    label: 'Forward',
    sublabel: 'Trot Gait',
    src: 'assets/whole_body/forward.mp4',
    telemetry: 'VEL: 1.8 m/s · PITCH: 0.2°',
    description: 'Forward trotting gait with continuous foot swing coordination and active body pitch stabilization.',
  },
  {
    id: 'backwards',
    label: 'Backwards',
    sublabel: 'Reverse Step',
    src: 'assets/whole_body/backwards.mp4',
    telemetry: 'REVERSE: -1.2 m/s · STABILITY: 99.8%',
    description: 'Reverse stepping gait without turning the base, maintaining stable ground reaction force distribution.',
  },
  {
    id: 'turn',
    label: 'Dynamic Turn',
    sublabel: 'Yaw Rotation',
    src: 'assets/whole_body/turn.mp4',
    telemetry: 'YAW: 1.6 rad/s · IN-PLACE ROTATION',
    description: 'Rapid in-place yaw steering with coordinated diagonal leg stepping and zero lateral slip.',
  },
  {
    id: 'run',
    label: 'High-Speed Run',
    sublabel: 'Sprint Gait',
    src: 'assets/whole_body/run.mp4',
    telemetry: 'SPEED: 2.8 m/s · DYNAMIC BOUNDING',
    description: 'High-velocity sprint gait with extended aerial phase and explosive push-off force from hind legs.',
  },
  {
    id: 'jump',
    label: 'Obstacle Jump',
    sublabel: 'Vertical Bound',
    src: 'assets/whole_body/jump.mp4',
    telemetry: 'HEIGHT: 0.45m · 4-FOOT CLEARANCE',
    description: 'Coordinated vertical impulse launching all four legs simultaneously to clear vertical terrain steps.',
  },
  {
    id: 'leap',
    label: 'Dynamic Leap',
    sublabel: 'Forward Vault',
    src: 'assets/whole_body/leap.mp4',
    telemetry: 'DISTANCE: 0.82m · RECOVERY: 100%',
    description: 'Forward leap over gaps and obstacles with compliant landing impact absorption and instant gait recovery.',
  },
  {
    id: 'follow_ee',
    label: 'Follow EE',
    sublabel: 'Whole-Body Reach',
    src: 'assets/whole_body/follow_ee.mp4',
    telemetry: 'EE ERROR: 1.4 cm · 18-DOF SOLVER',
    description: 'Whole-body coordinated manipulation: the quadruped base bends, crouches, and steps to track operator end-effector commands.',
  },
  {
    id: 'trajectory_tracking',
    label: 'Trajectory Track',
    sublabel: '6D Trajectory',
    src: 'assets/whole_body/trajectory_tracking.mp4',
    telemetry: '6D POSE · TRACKING FREQ: 50 Hz',
    description: 'Dynamic 6D Cartesian trajectory tracking of the SO-101 arm while the Go2 platform traverses challenging ground.',
  },
];

interface OtherProject {
  id: string;
  title: string;
  description: string;
  mediaType: 'video' | 'image';
  mediaSrc: string;
  secondaryMediaSrc?: string;
  clip1Label?: string;
  clip2Label?: string;
  codeUrl: string;
  briefUrl?: string;
  briefLabel?: string;
}

const OTHER_PROJECTS: OtherProject[] = [
  {
    id: 'forklift-docking',
    title: 'Tricycle Pallet Truck RL Docking',
    description: '1.65m tricycle pallet truck trained in Isaac Lab via PPO to reverse 90° into 1.6m slots inside 2.0m corridors. Sees only 16 observation numbers (no camera/LiDAR). 90.6% docked (0.4° heading error, 1.5cm offset) in 5.7s.',
    mediaType: 'video',
    mediaSrc: 'assets/projects/rl_docking_1.mp4',
    secondaryMediaSrc: 'assets/projects/rl_docking_2.mp4',
    clip1Label: 'Clip 1',
    clip2Label: 'Clip 2',
    codeUrl: 'https://github.com/Abhinavjoshi7891',
    briefUrl: '#rl-docking-brief',
    briefLabel: 'Read Brief →',
  },
  {
    id: 'sam3d-mocap',
    title: 'SAM 3D Body Video Mocap',
    description: 'Research-grade CV and kinematics pipeline coupling Meta SAM 3D Body (DINOv3), SAM3 tracking, MoGe depth, and Rerun. Reconstructs 18,439-vertex meshes and 127-joint MHR skeletons with Savitzky-Golay smoothing and Nokov/OpenSim export. Optimized for 8GB VRAM.',
    mediaType: 'video',
    mediaSrc: 'assets/projects/sam3d_boxing_mocap.mp4',
    secondaryMediaSrc: 'assets/projects/sam3d_multiobj_mocap.mp4',
    clip1Label: 'Boxing',
    clip2Label: 'Multi-Obj',
    codeUrl: 'https://github.com/Abhinavjoshi7891',
    briefUrl: '#sam3d-mocap-report',
    briefLabel: 'Read Report →',
  },
  {
    id: 'floating-base-crocoddyl',
    title: 'Floating-Base Optimal Control',
    description: 'FDDP whole-body optimal control on Go2 and Talos robots with contact-mode switching. Proved contact set geometry dictates stability over leg count, with 8.1× Talos warm-start speedup.',
    mediaType: 'video',
    mediaSrc: 'assets/projects/go2_crocoddyl.mp4',
    codeUrl: 'https://github.com/Abhinavjoshi7891',
  },
  {
    id: 'aerial-optimal-control',
    title: 'Aerial Optimal Control & RL',
    description: 'Built acados quadrotor MPC in agilicious flight stack. Trained vision-based cluttered room navigation from onboard depth (VAE+GRU) reaching 92% of RTX 4090 performance on a laptop GPU.',
    mediaType: 'video',
    mediaSrc: 'assets/projects/quadrotor_agilicious.mp4',
    codeUrl: 'https://github.com/Abhinavjoshi7891',
  },
  {
    id: 'humanoid-wb-rl',
    title: 'Humanoid Whole-Body RL & MPC',
    description: 'Real-time MediaPipe motion retargeting to 29-DOF Unitree G1 with a 200M-step JAX joystick walking policy in MuJoCo Playground. MJPC benchmark isolating 4× planner speed gap.',
    mediaType: 'video',
    mediaSrc: 'assets/projects/humanoid_g1_walking.mp4',
    codeUrl: 'https://github.com/Abhinavjoshi7891/Humanoid-Training-with-RL-Holosoma',
  },
  {
    id: 'dexterous-leap-hand',
    title: 'Dexterous LEAP Hand (MJX)',
    description: 'Trained 16-DOF LEAP hand cube reorientation to 205M timesteps across 8,192 parallel envs at 18k steps/s using Brax PPO. Evaluated SimToolReal on 29-DOF Kuka + SharPa hand in Isaac Sim 5.1.',
    mediaType: 'video',
    mediaSrc: 'assets/projects/leap_cube_reorient.mp4',
    codeUrl: 'https://github.com/Abhinavjoshi7891',
  },
  {
    id: 'open-dreamer',
    title: 'Open-Dreamer: JAX World Model',
    description: 'Recurrent State-Space Model (RSSM) and latent space-time causal transformer in JAX/Flax learning physics dynamics from pixels for zero-shot MPC rollouts without environment resets.',
    mediaType: 'video',
    mediaSrc: 'assets/projects/open_dreamer.mp4',
    codeUrl: 'https://github.com/Abhinavjoshi7891/open-dreamer',
  },
  {
    id: 'hov-sg',
    title: 'HOV-SG: 3D Spatial Scene Graphs',
    description: 'Hierarchical open-vocabulary 3D scene graphs fusing RGB-D scans, CLIP/DINOv2 visual features, and LLM reasoning for zero-shot semantic navigation in complex indoor environments.',
    mediaType: 'video',
    mediaSrc: 'assets/projects/hov_sg.mp4',
    codeUrl: 'https://github.com/Abhinavjoshi7891/HOV-SG',
  },
];

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onOpenBrief, onOpenArchitecture, onOpenVlaReport, onOpenRlBrief, onOpenSam3dReport, onOpenDynamoidReport, onShowToast }) => {
  const [viewMode, setViewMode] = useState<'all' | 'model6999' | 'dynamoid' | 'stage5'>('all');
  const [carViewMode, setCarViewMode] = useState<'both' | 'car1' | 'car2'>('both');
  const [palletViewMode, setPalletViewMode] = useState<'all' | 'video' | 'pose' | 'depth'>('all');
  const [modalImage, setModalImage] = useState<{ src: string; title: string; subtitle: string } | null>(null);
  const [activeTheaterVideo, setActiveTheaterVideo] = useState<number | null>(null);
  const [activeVlaTheaterVideo, setActiveVlaTheaterVideo] = useState<number | null>(null);
  const [activeClips, setActiveClips] = useState<Record<string, 'clip1' | 'clip2'>>({});

  // Other Projects Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(4);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsVisible(1);
      } else if (window.innerWidth < 960) {
        setCardsVisible(2);
      } else if (window.innerWidth < 1280) {
        setCardsVisible(3);
      } else {
        setCardsVisible(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalProjectsCount = OTHER_PROJECTS.length;

  const prevProject = () => {
    setCarouselIndex((prev) => (prev <= 0 ? totalProjectsCount - 1 : prev - 1));
  };

  const nextProject = () => {
    setCarouselIndex((prev) => (prev + 1) % totalProjectsCount);
  };

  const goToProject = (idx: number) => {
    setCarouselIndex(idx % totalProjectsCount);
  };

  useEffect(() => {
    if (isCarouselPaused) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % totalProjectsCount);
    }, 5500);
    return () => clearInterval(timer);
  }, [isCarouselPaused, totalProjectsCount]);

  // Guarantee all videos autoplay smoothly without freezing
  useEffect(() => {
    const playAll = () => {
      const vids = document.querySelectorAll<HTMLVideoElement>('.skill-grid-video-element, .card-media-video');
      vids.forEach((v) => {
        v.muted = true;
        v.defaultMuted = true;
        const p = v.play();
        if (p !== undefined) {
          p.catch(() => {});
        }
      });
    };
    playAll();
    const t = setTimeout(playAll, 300);
    return () => clearTimeout(t);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (deltaX > 40) {
      prevProject();
    } else if (deltaX < -40) {
      nextProject();
    }
    touchStartXRef.current = null;
  };

  return (
    <section id="work" className="work section-shell">
      <div className="section-heading">
        <div>
          <p className="section-kicker">01 / Selected work</p>
          <h2>Things I’ve<br />made <em>move &amp; reason.</em></h2>
        </div>
        <p className="section-note">
          Systems deployed across physical hardware and GPU simulations —
          wheeled humanoids, racing AMRs, dexterous arms, and whole-body policies.
        </p>
      </div>

      <div className="project-grid">
        {/* Project 01: Elexis-W Social Navigation with Both Screencast Videos */}
        <article className="project-card">
          <div className="project-visual project-visual-workstation">
            <div className="project-visual-topbar">
              <span className="project-number">01</span>
              <span className="career-badge">THE FROZEN-ROBOT BREAKTHROUGH</span>
            </div>

            <div className="custom-visual-frame project-video-frame is-workstation-frame">
              <div className="custom-window-bar">
                <div className="window-dots"><i /><i /><i /></div>
                <div className="video-switcher-tabs">
                  <button
                    type="button"
                    className={`video-tab-btn ${viewMode === 'all' ? 'is-active' : ''}`}
                    onClick={() => setViewMode('all')}
                    title="View mission control 3-feed console (Hero + Dual Sub-Feeds)"
                  >
                    <span>⚏</span> All (3-Feed)
                  </button>
                  <button
                    type="button"
                    className={`video-tab-btn ${viewMode === 'model6999' ? 'is-active' : ''}`}
                    onClick={() => setViewMode('model6999')}
                    title="Focus MEM_GRU_model_6999 recurrent depth video report"
                  >
                    <span>★</span> MEM_GRU_6999
                  </button>
                  <button
                    type="button"
                    className={`video-tab-btn ${viewMode === 'dynamoid' ? 'is-active' : ''}`}
                    onClick={() => setViewMode('dynamoid')}
                    title="Focus Dynamoid_1 dynamic navigation video"
                  >
                    <span>▶</span> Dynamoid_1
                  </button>
                  <button
                    type="button"
                    className={`video-tab-btn ${viewMode === 'stage5' ? 'is-active' : ''}`}
                    onClick={() => setViewMode('stage5')}
                    title="Focus stage_5 curriculum evasion video"
                  >
                    <span>▶</span> Stage 5
                  </button>
                </div>
                <span className="video-live-pill">SIM 3-FEED ●</span>
              </div>

              {/* In All (3-Feed) view: Hero on top + Dual Sub-Feeds below */}
              {viewMode === 'all' ? (
                <div className="dynamoid-all-layout">
                  {/* Hero Video: RUN 03 MEM_GRU_model_6999 */}
                  <div className="video-slot dynamoid-hero-slot">
                    <div className="video-slot-header">
                      <span>RUN 03 // MEM_GRU_model_6999 (PRIMARY DEPLOYMENT)</span>
                      <span className="slot-badge" style={{ background: 'var(--acid)', color: 'var(--ink)' }}>★ RECURRENT DEPTH HERO</span>
                    </div>
                    <div className="video-slot-media is-hero-media">
                      <video
                        src="/assets/videos/model_6999_video_report.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        className="project-video-element"
                      >
                        Your browser does not support HTML5 video.
                      </video>
                      <div className="video-slot-hud">
                        <span>86.9% GOAL ARRIVAL · HITS: 11.3%</span>
                        <span>128-D GRU MEMORY · 120° DEPTH CAMERA</span>
                      </div>
                    </div>
                  </div>

                  {/* Dual Sub-Feeds: Side by Side below */}
                  <div className="dynamoid-subfeeds-row">
                    <div className="video-slot dynamoid-sub-slot">
                      <div className="video-slot-header">
                        <span>RUN 01 // Dynamoid_1</span>
                        <span className="slot-badge">DYNAMIC AVOIDANCE</span>
                      </div>
                      <div className="video-slot-media is-sub-media">
                        <video
                          src="/assets/videos/dynamoid_clip.mp4"
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls
                          className="project-video-element"
                        >
                          Your browser does not support HTML5 video.
                        </video>
                        <div className="video-slot-hud">
                          <span>TTC: 2.46s</span>
                          <span>89.4% GOAL ARRIVAL</span>
                        </div>
                      </div>
                    </div>

                    <div className="video-slot dynamoid-sub-slot">
                      <div className="video-slot-header">
                        <span>RUN 02 // Stage_5</span>
                        <span className="slot-badge">TTC SCAN TEACHER</span>
                      </div>
                      <div className="video-slot-media is-sub-media">
                        <video
                          src="/assets/videos/stage5_clip.mp4"
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls
                          className="project-video-element"
                        >
                          Your browser does not support HTML5 video.
                        </video>
                        <div className="video-slot-hud">
                          <span>STAGE 5 BENCHMARK</span>
                          <span>2048 PARALLEL ENVS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Focused Solo View: Video Player + Telemetry HUD Matrix */
                <div className="dynamoid-solo-layout">
                  {viewMode === 'model6999' && (
                    <>
                      <div className="video-slot dynamoid-solo-video-slot">
                        <div className="video-slot-header">
                          <span>RUN 03 // MEM_GRU_model_6999</span>
                          <span className="slot-badge" style={{ background: 'var(--acid)', color: 'var(--ink)' }}>★ RECURRENT DEPTH PLANNER</span>
                        </div>
                        <div className="video-slot-media is-solo-media">
                          <video
                            src="/assets/videos/model_6999_video_report.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls
                            className="project-video-element"
                          >
                            Your browser does not support HTML5 video.
                          </video>
                          <div className="video-slot-hud">
                            <span>86.9% GOAL ARRIVAL · HITS: 11.3%</span>
                            <span>128-D GRU MEMORY · 120° DEPTH</span>
                          </div>
                        </div>
                      </div>
                      <div className="dynamoid-telemetry-grid">
                        <div className="telemetry-card">
                          <span className="telemetry-card-tag">ARCH</span>
                          <div className="telemetry-card-val">128-D GRU Latent Memory</div>
                          <div className="telemetry-card-desc">Tracks out-of-frame pedestrians; auxiliary bearing loss</div>
                        </div>
                        <div className="telemetry-card">
                          <span className="telemetry-card-tag">SAFETY</span>
                          <div className="telemetry-card-val">22.7% → 11.3% Hits</div>
                          <div className="telemetry-card-desc">Halved collisions where 99.3% occur off-camera</div>
                        </div>
                        <div className="telemetry-card">
                          <span className="telemetry-card-tag">VISION</span>
                          <div className="telemetry-card-val">120° × 120° Depth Only</div>
                          <div className="telemetry-card-desc">60 Hz local planner; zero privileged lidar or radar</div>
                        </div>
                        <div className="telemetry-card">
                          <span className="telemetry-card-tag">SCALE</span>
                          <div className="telemetry-card-val">86.9% Goal Arrival</div>
                          <div className="telemetry-card-desc">2,048 parallel Isaac Lab environments with moving crowds</div>
                        </div>
                      </div>
                    </>
                  )}

                  {viewMode === 'dynamoid' && (
                    <>
                      <div className="video-slot dynamoid-solo-video-slot">
                        <div className="video-slot-header">
                          <span>RUN 01 // Dynamoid_1</span>
                          <span className="slot-badge">DYNAMIC AVOIDANCE</span>
                        </div>
                        <div className="video-slot-media is-solo-media">
                          <video
                            src="/assets/videos/dynamoid_clip.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls
                            className="project-video-element"
                          >
                            Your browser does not support HTML5 video.
                          </video>
                          <div className="video-slot-hud">
                            <span>TTC: 2.46s</span>
                            <span>89.4% GOAL ARRIVAL</span>
                          </div>
                        </div>
                      </div>
                      <div className="dynamoid-telemetry-grid">
                        <div className="telemetry-card">
                          <span className="telemetry-card-tag">RUN</span>
                          <div className="telemetry-card-val">Dynamoid_1 Baseline</div>
                          <div className="telemetry-card-desc">Dynamic pedestrian avoidance in structured corridors</div>
                        </div>
                        <div className="telemetry-card">
                          <span className="telemetry-card-tag">RISK</span>
                          <div className="telemetry-card-val">TTC: 2.46s Threshold</div>
                          <div className="telemetry-card-desc">Reactive repulsive potential field with velocity vectoring</div>
                        </div>
                        <div className="telemetry-card">
                          <span className="telemetry-card-tag">ACCURACY</span>
                          <div className="telemetry-card-val">89.4% Success Rate</div>
                          <div className="telemetry-card-desc">Goal arrival in non-adversarial obstacle trajectories</div>
                        </div>
                        <div className="telemetry-card">
                          <span className="telemetry-card-tag">BOTTLENECK</span>
                          <div className="telemetry-card-val">Memoryless Blindspot</div>
                          <div className="telemetry-card-desc">Failed when pedestrians stepped behind camera FOV</div>
                        </div>
                      </div>
                    </>
                  )}

                  {viewMode === 'stage5' && (
                    <>
                      <div className="video-slot dynamoid-solo-video-slot">
                        <div className="video-slot-header">
                          <span>RUN 02 // Stage_5</span>
                          <span className="slot-badge">TTC SCAN TEACHER</span>
                        </div>
                        <div className="video-slot-media is-solo-media">
                          <video
                            src="/assets/videos/stage5_clip.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls
                            className="project-video-element"
                          >
                            Your browser does not support HTML5 video.
                          </video>
                          <div className="video-slot-hud">
                            <span>STAGE 5 BENCHMARK</span>
                            <span>2048 PARALLEL ENVS</span>
                          </div>
                        </div>
                      </div>
                      <div className="dynamoid-telemetry-grid">
                        <div className="telemetry-card">
                          <span className="telemetry-card-tag">POLICY</span>
                          <div className="telemetry-card-val">Privileged Teacher (model_699)</div>
                          <div className="telemetry-card-desc">TTC scan radar feeding privileged actor</div>
                        </div>
                        <div className="telemetry-card">
                          <span className="telemetry-card-tag">LESSON</span>
                          <div className="telemetry-card-val">Distillation Mismatch</div>
                          <div className="telemetry-card-desc">Omniscient radar policy cannot distill to monocular camera</div>
                        </div>
                        <div className="telemetry-card">
                          <span className="telemetry-card-tag">TRAINING</span>
                          <div className="telemetry-card-val">2,048 Isaac Envs</div>
                          <div className="telemetry-card-desc">High-throughput GPU tensor curriculum learning</div>
                        </div>
                        <div className="telemetry-card">
                          <span className="telemetry-card-tag">PIVOT</span>
                          <div className="telemetry-card-val">Led to MEM_GRU Rebuild</div>
                          <div className="telemetry-card-desc">Pioneered direct recurrent vision without privileged teacher</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="project-visual-bottombar">
              <span className="visual-caption">133 KG WHEELED HUMANOID · 120° DEPTH CAMERA · RECURRENT GRU LOCAL PLANNER</span>
            </div>
          </div>

          <div className="project-info">
            <div>
              <p className="project-tags">ISAAC LAB · RECURRENT PPO · 120° DEPTH ONLY · 133 KG HUMANOID · ADDVERB</p>
              <h3>Recurrent Depth-Vision Social Navigation — Dynamoid / Elexis-W</h3>
              <p>
                Four-era journey from static BARN clutter and privileged TTC-scan teachers (<code>model_699</code>) to
                an end-to-end recurrent depth-vision local planner (<code>MEM_GRU_model_6999</code>). Facing a narrow 120° × 120°
                camera where 99.3% of collisions occur after pedestrians leave the visual field, adding a 128-D GRU spatial memory
                with auxiliary bearing-proximity loss halved collisions (22.7% → 11.3%) and lifted goal arrival to 86.9%
                under non-yielding pedestrian crowds.
              </p>
            </div>
            <div className="project-outcome">
              <span>WHY IT MATTERS</span>
              <strong>22.7% → 11.3% Pedestrian collisions halved via GRU spatial memory; 86.9% arrival with real 120° depth camera.</strong>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '1.2rem', alignItems: 'center' }}>
              <button
                type="button"
                className="arrow-link"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = '#dynamoid-report';
                  onOpenDynamoidReport?.();
                }}
                style={{
                  background: 'var(--acid)',
                  color: 'var(--ink)',
                  border: '1px solid var(--ink)',
                  boxShadow: '3px 3px 0 var(--ink)',
                  cursor: 'pointer',
                  padding: '0.5rem 1rem',
                  fontWeight: 800,
                  fontFamily: 'var(--mono)',
                  fontSize: '0.76rem',
                }}
              >
                Read Full Report &amp; Journey <span>→</span>
              </button>
              <a
                className="arrow-link"
                href="/assets/reports/MEM_GRU_model_6999_report.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Evaluation PDF <span>↗</span>
              </a>
              <a
                className="arrow-link"
                href="/assets/reports/MEM_GRU_model_6999_journey.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Design Journey PDF <span>↗</span>
              </a>
              <a className="arrow-link" href="#lab">
                Interactive Sim <span>→</span>
              </a>
            </div>
          </div>
        </article>

        {/* Project 02: F1Tenth / RoboRacer */}
        <article className="project-card project-card-f1tenth">
          <div className="project-visual project-visual-workstation">
            <div className="project-visual-topbar">
              <span className="project-number">02</span>
              <span className="career-badge">PHYSICAL 1:10 RACER</span>
            </div>

            <div className="custom-visual-frame project-video-frame is-workstation-frame">
              <div className="custom-window-bar">
                <div className="window-dots"><i /><i /><i /></div>
                <div className="video-switcher-tabs">
                  <button
                    type="button"
                    className={`video-tab-btn ${carViewMode === 'both' ? 'is-active' : ''}`}
                    onClick={() => setCarViewMode('both')}
                    title="View both F1Tenth track videos side-by-side"
                  >
                    <span>⚏</span> Both (Dual View)
                  </button>
                  <button
                    type="button"
                    className={`video-tab-btn ${carViewMode === 'car1' ? 'is-active' : ''}`}
                    onClick={() => setCarViewMode('car1')}
                    title="Focus car_1 high-speed track run"
                  >
                    <span>▶</span> car_1.MOV
                  </button>
                  <button
                    type="button"
                    className={`video-tab-btn ${carViewMode === 'car2' ? 'is-active' : ''}`}
                    onClick={() => setCarViewMode('car2')}
                    title="Focus car_2 dynamic cornering run"
                  >
                    <span>▶</span> car_2.mp4
                  </button>
                </div>
                <span className="video-live-pill">RACE FEED ●</span>
              </div>

              {/* Both Videos Visible Simultaneously with Telemetry Strip or Focusable */}
              {carViewMode === 'both' ? (
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div className="project-video-grid is-dual" style={{ padding: '8px', background: '#030809', gap: '8px' }}>
                    <div className="video-slot">
                      <div className="video-slot-header">
                        <span>RUN 01 // car_1.MOV</span>
                        <span className="slot-badge">HIGH-SPEED RACELINE</span>
                      </div>
                      <div className="video-slot-media is-sub-media">
                        <video
                          src="/assets/videos/car_1_clip.mp4"
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls
                          className="project-video-element"
                        >
                          Your browser does not support HTML5 video.
                        </video>
                        <div className="video-slot-hud">
                          <span>SQP 50 HZ · 18.2 ms LATENCY</span>
                          <span>JETSON ORIN NANO</span>
                        </div>
                      </div>
                    </div>

                    <div className="video-slot">
                      <div className="video-slot-header">
                        <span>RUN 02 // car_2.mp4</span>
                        <span className="slot-badge">DYNAMIC CORNERING</span>
                      </div>
                      <div className="video-slot-media is-sub-media">
                        <video
                          src="/assets/videos/car_2_clip.mp4"
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls
                          className="project-video-element"
                        >
                          Your browser does not support HTML5 video.
                        </video>
                        <div className="video-slot-hud">
                          <span>PACEJKA SINGLE-TRACK</span>
                          <span>CARTOGRAPHER SLAM</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="race-dual-telemetry-strip">
                    <div className="telemetry-card">
                      <span className="telemetry-card-tag">RUN 01 // HIGH SPEED MPC</span>
                      <div className="telemetry-card-val">50 Hz SQP Control · 18.2 ms Latency</div>
                      <div className="telemetry-card-desc">Jetson Orin Nano + VESC · Two-pass O(N) friction circle optimizer</div>
                    </div>
                    <div className="telemetry-card">
                      <span className="telemetry-card-tag">RUN 02 // VEHICLE DYNAMICS</span>
                      <div className="telemetry-card-val">Pacejka Single-Track · Cartographer</div>
                      <div className="telemetry-card-desc">Tire slip modeling · active understeer damping · sub-cm LIDAR SLAM</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="dynamoid-solo-layout">
                  {carViewMode === 'car1' && (
                    <>
                      <div className="video-slot dynamoid-solo-video-slot">
                        <div className="video-slot-header">
                          <span>RUN 01 // car_1.MOV</span>
                          <span className="slot-badge">HIGH-SPEED RACELINE</span>
                        </div>
                        <div className="video-slot-media is-solo-media">
                          <video
                            src="/assets/videos/car_1_clip.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls
                            className="project-video-element"
                          >
                            Your browser does not support HTML5 video.
                          </video>
                          <div className="video-slot-hud">
                            <span>SQP 50 HZ · 18.2 ms LATENCY</span>
                            <span>JETSON ORIN NANO ONBOARD</span>
                          </div>
                        </div>
                      </div>
                      <div className="dynamoid-telemetry-grid">
                        <div className="telemetry-card">
                          <span className="telemetry-card-tag">CONTROLLER</span>
                          <div className="telemetry-card-val">Real-Time SQP MPC</div>
                          <div className="telemetry-card-desc">acados solver closing at 50 Hz with 18.2 ms execution latency</div>
                        </div>
                        <div className="telemetry-card">
                          <span className="telemetry-card-tag">HARDWARE</span>
                          <div className="telemetry-card-val">Jetson Orin Nano + VESC</div>
                          <div className="telemetry-card-desc">Synchronous CAN bus telemetry with Microstrain IMU odometry</div>
                        </div>
                        <div className="telemetry-card">
                          <span className="telemetry-card-tag">SPEED PROFILE</span>
                          <div className="telemetry-card-val">O(N) Friction Circle</div>
                          <div className="telemetry-card-desc">Two-pass velocity optimization replacing fragile curvature solvers</div>
                        </div>
                        <div className="telemetry-card">
                          <span className="telemetry-card-tag">SAFETY</span>
                          <div className="telemetry-card-val">Sub-cm Track Bounds</div>
                          <div className="telemetry-card-desc">Slack barrier constraints preventing wheel scrub &amp; barrier clipping</div>
                        </div>
                      </div>
                    </>
                  )}

                  {carViewMode === 'car2' && (
                    <>
                      <div className="video-slot dynamoid-solo-video-slot">
                        <div className="video-slot-header">
                          <span>RUN 02 // car_2.mp4</span>
                          <span className="slot-badge">DYNAMIC CORNERING</span>
                        </div>
                        <div className="video-slot-media is-solo-media">
                          <video
                            src="/assets/videos/car_2_clip.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls
                            className="project-video-element"
                          >
                            Your browser does not support HTML5 video.
                          </video>
                          <div className="video-slot-hud">
                            <span>PACEJKA SINGLE-TRACK</span>
                            <span>CARTOGRAPHER SLAM</span>
                          </div>
                        </div>
                      </div>
                      <div className="dynamoid-telemetry-grid">
                        <div className="telemetry-card">
                          <span className="telemetry-card-tag">VEHICLE DYNAMICS</span>
                          <div className="telemetry-card-val">Pacejka Single-Track</div>
                          <div className="telemetry-card-desc">Non-linear tire dynamics predicting front/rear axle slip angles</div>
                        </div>
                        <div className="telemetry-card">
                          <span className="telemetry-card-tag">LOCALIZATION</span>
                          <div className="telemetry-card-val">Cartographer 2D LIDAR</div>
                          <div className="telemetry-card-desc">Real-time scan-to-submap matching with sub-centimeter accuracy</div>
                        </div>
                        <div className="telemetry-card">
                          <span className="telemetry-card-tag">CHASSIS</span>
                          <div className="telemetry-card-val">1:10 Custom 4WD Racer</div>
                          <div className="telemetry-card-desc">Carbon fiber double-deck chassis with hydraulic oil shocks</div>
                        </div>
                        <div className="telemetry-card">
                          <span className="telemetry-card-tag">CORNERING</span>
                          <div className="telemetry-card-val">Active Understeer Damping</div>
                          <div className="telemetry-card-desc">Dynamic yaw moment compensation through high-speed chicane sectors</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="project-visual-bottombar">
              <span className="visual-caption">PHYSICAL 1:10 AUTONOMOUS RACER · ACADOS REAL-TIME SQP MPC</span>
            </div>
          </div>

          <div className="project-info">
            <div>
              <p className="project-tags">ROS 2 · ACADOS MPC · JETSON ORIN NANO · CARTOGRAPHER · HARDWARE</p>
              <h3>Autonomous Racing Stack — F1Tenth</h3>
              <p>
                Sole engineer on an end-to-end ROS 2 autonomy stack on a physical 1:10 racer.
                Real-time SQP model-based optimal control in acados (kinematic and single-track dynamic
                MPC with Pacejka tyres) closing at 50 Hz on a Jetson Orin Nano. Fused IMU and VESC
                odometry with Cartographer SLAM, and replaced fragile curvature solvers with an O(N)
                two-pass friction-circle profiler.
              </p>
            </div>
            <div className="project-outcome">
              <span>WHY IT MATTERS</span>
              <strong>Full high-speed 50 Hz MPC brought up solo on physical hardware.</strong>
            </div>
            <a
              className="arrow-link"
              href="https://github.com/Abhinavjoshi7891/eth_roboracer"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Repository <span>↗</span>
            </a>
          </div>

          {/* Dexter Dynamics Racing Mascot (Positioned out of the tile border) */}
          <DexterDynamicsRacer onShowToast={onShowToast} />
        </article>

        {/* Project 03: HCCEPose Monocular Pallet Pose */}
        <article className="project-card">
          <div className="project-visual project-visual-workstation">
            <div className="project-visual-topbar">
              <span className="project-number">03</span>
              <span className="career-badge">INDUSTRIAL AMR PERCEPTION</span>
            </div>

            <div className="custom-visual-frame project-video-frame project-pallet-multipanel is-workstation-frame">
              <div className="custom-window-bar">
                <div className="window-dots"><i /><i /><i /></div>
                <div className="video-switcher-tabs">
                  <button
                    type="button"
                    className={`video-tab-btn ${palletViewMode === 'all' ? 'is-active' : ''}`}
                    onClick={() => setPalletViewMode('all')}
                    title="View 3-panel layout: portrait video + 6D pose + depth comparison"
                  >
                    <span>⚏</span> 3-Panel View
                  </button>
                  <button
                    type="button"
                    className={`video-tab-btn ${palletViewMode === 'video' ? 'is-active' : ''}`}
                    onClick={() => setPalletViewMode('video')}
                    title="Focus portrait docking video"
                  >
                    <span>📱</span> Docking Video
                  </button>
                  <button
                    type="button"
                    className={`video-tab-btn ${palletViewMode === 'pose' ? 'is-active' : ''}`}
                    onClick={() => setPalletViewMode('pose')}
                    title="Focus HCCE 6D pose prediction"
                  >
                    <span>🎯</span> HCCE 6D Pose
                  </button>
                  <button
                    type="button"
                    className={`video-tab-btn ${palletViewMode === 'depth' ? 'is-active' : ''}`}
                    onClick={() => setPalletViewMode('depth')}
                    title="Focus Real Test vs Depth GT comparison"
                  >
                    <span>📊</span> vs Depth GT
                  </button>
                </div>
                <span className="video-live-pill">PORTRAIT 9:16 ●</span>
              </div>

              {/* 3-Panel Multi-Panel Layout */}
              {palletViewMode === 'all' && (
                <div className="pallet-tri-layout">
                  {/* Panel 1: Portrait Docking Video (Maintaining 9:16 portrait size) */}
                  <div className="pallet-portrait-panel">
                    <div className="video-slot-header">
                      <span>RUN 01 // DOCKING VIDEO</span>
                      <span className="slot-badge">PORTRAIT 9:16</span>
                    </div>
                    <div className="pallet-portrait-media">
                      <video
                        src="/assets/pallet/steel_pallet_docking.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        className="pallet-portrait-video-element"
                      >
                        Your browser does not support HTML5 video.
                      </video>
                      <div className="video-slot-hud">
                        <span>AUTONOMOUS FORKLIFT</span>
                        <span>20.2s DOCKING RUN</span>
                      </div>
                    </div>
                  </div>

                  {/* Panels 2 & 3: Two Images Stacked on the Right */}
                  <div className="pallet-stacked-panels">
                    {/* Panel 2: HCCE 6D Pose Inference */}
                    <div className="pallet-sub-slot">
                      <div className="video-slot-header">
                        <span>02 // HCCE 6D POSE INFERENCE</span>
                        <span className="slot-badge">3D BOUNDING BOX</span>
                      </div>
                      <div
                        className="pallet-sub-media"
                        onClick={() => setModalImage({
                          src: '/assets/pallet/usefull.png',
                          title: 'HCCE 6-DoF Pallet Pose Estimation',
                          subtitle: 'Dense 2D-3D Gray-code correspondences with predicted 3D bounding box & coordinate frame on specular metal pallet.'
                        })}
                        title="Click to inspect full resolution"
                      >
                        <img
                          src="/assets/pallet/usefull.png"
                          alt="HCCE 6-DoF Pallet Pose Prediction"
                          className="pallet-sub-img"
                          loading="lazy"
                        />
                        <div className="video-slot-hud">
                          <span>4-WAY PnP CONSENSUS</span>
                          <span>180° FLIP RESOLVED</span>
                        </div>
                        <span className="pallet-zoom-pill">🔍 CLICK TO EXPAND</span>
                      </div>
                    </div>

                    {/* Panel 3: Real Test vs Depth GT */}
                    <div className="pallet-sub-slot">
                      <div className="video-slot-header">
                        <span>03 // REAL TEST 3 VS DEPTH GT</span>
                        <span className="slot-badge">SPECULAR TOLERANCE</span>
                      </div>
                      <div
                        className="pallet-sub-media"
                        onClick={() => setModalImage({
                          src: '/assets/pallet/_real_test3_vs_depthGT.png',
                          title: 'Real Test 3 vs RGB-D Depth Ground Truth',
                          subtitle: 'Demonstrates severe depth sensor scattering and invalid pixel dropouts on shiny stainless steel vs robust monocular estimation.'
                        })}
                        title="Click to inspect full resolution"
                      >
                        <img
                          src="/assets/pallet/_real_test3_vs_depthGT.png"
                          alt="Real Test 3 vs Depth Ground Truth"
                          className="pallet-sub-img"
                          loading="lazy"
                        />
                        <div className="video-slot-hud">
                          <span>MONOCULAR DENSE MAP</span>
                          <span>RGB-D VOID REJECTION</span>
                        </div>
                        <span className="pallet-zoom-pill">🔍 CLICK TO EXPAND</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Solo View: Portrait Video */}
              {palletViewMode === 'video' && (
                <div className="pallet-solo-view is-video-solo">
                  <div className="video-slot-header">
                    <span>SOLO VIEW // steel_pallet_docking.mp4</span>
                    <span className="slot-badge">9:16 PORTRAIT STREAM</span>
                  </div>
                  <div className="pallet-portrait-solo-container">
                    <video
                      src="/assets/pallet/steel_pallet_docking.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      className="pallet-portrait-video-element solo-element"
                    >
                      Your browser does not support HTML5 video.
                    </video>
                    <div className="pallet-solo-telemetry">
                      <div><span>SOLVER</span><strong>4-Way PnP + RANSAC Consensus</strong></div>
                      <div><span>CAMERA</span><strong>Monocular RGB Stream (464×832)</strong></div>
                      <div><span>SURFACE</span><strong>Specular Galvanized Steel</strong></div>
                      <div><span>RESULT</span><strong>Sub-Centimeter Fork Engagement</strong></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Solo View: 6D Pose */}
              {palletViewMode === 'pose' && (
                <div className="pallet-solo-view">
                  <div className="video-slot-header">
                    <span>SOLO VIEW // HCCE 6D POSE INFERENCE (usefull.png)</span>
                    <span className="slot-badge">PREDICTED BOUNDING BOX</span>
                  </div>
                  <div
                    className="pallet-solo-media-frame"
                    onClick={() => setModalImage({
                      src: '/assets/pallet/usefull.png',
                      title: 'HCCE 6-DoF Pallet Pose Estimation',
                      subtitle: 'Dense 2D-3D Gray-code correspondences with predicted 3D bounding box & coordinate frame on specular metal pallet.'
                    })}
                  >
                    <img
                      src="/assets/pallet/usefull.png"
                      alt="HCCE 6-DoF Pallet Pose Prediction"
                      className="pallet-solo-img"
                    />
                    <div className="video-slot-hud">
                      <span>DENSE GRAY-CODE CORRESPONDENCE</span>
                      <span>CLICK TO EXPAND FULL RES ⤢</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Solo View: Depth GT */}
              {palletViewMode === 'depth' && (
                <div className="pallet-solo-view">
                  <div className="video-slot-header">
                    <span>SOLO VIEW // REAL TEST 3 VS DEPTH GT (_real_test3_vs_depthGT.png)</span>
                    <span className="slot-badge">SENSOR BENCHMARK</span>
                  </div>
                  <div
                    className="pallet-solo-media-frame"
                    onClick={() => setModalImage({
                      src: '/assets/pallet/_real_test3_vs_depthGT.png',
                      title: 'Real Test 3 vs RGB-D Depth Ground Truth',
                      subtitle: 'Demonstrates severe depth sensor scattering and invalid pixel dropouts on shiny stainless steel vs robust monocular estimation.'
                    })}
                  >
                    <img
                      src="/assets/pallet/_real_test3_vs_depthGT.png"
                      alt="Real Test 3 vs Depth Ground Truth"
                      className="pallet-solo-img is-contain"
                    />
                    <div className="video-slot-hud">
                      <span>MONOCULAR CONTINUOUS SURFACE</span>
                      <span>CLICK TO EXPAND FULL RES ⤢</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="project-visual-bottombar">
              <span className="visual-caption">MONOCULAR 6-DOF POSE · 4-WAY PnP CONSENSUS · SPECULAR GLARE IMMUNITY</span>
            </div>
          </div>

          <div className="project-info">
            <div>
              <p className="project-tags">COMPUTER VISION · HCCEPose · PnP + RANSAC · SYNTHETIC BOP · INTEL TARGET</p>
              <h3>Monocular 6-DoF Pallet Pose Estimation</h3>
              <p>
                Built for autonomous forklift pallet engagement at Addverb, replacing an RGB-D
                system that failed under specular metal reflection, occlusions, and variable lighting.
                Adapted HCCEPose with dense per-pixel Gray-coded coordinate maps and a 4-way PnP + RANSAC
                voting scheme that resolves 180° flip ambiguity and rejects glare-corrupted pixels by consensus.
              </p>
            </div>
            <div className="project-outcome">
              <span>WHY IT MATTERS</span>
              <strong>Slashes sensor cost while outperforming RGB-D on shiny metal surfaces.</strong>
            </div>
            <a
              className="arrow-link"
              href="#pallet-brief"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = '#pallet-brief';
                onOpenBrief?.();
              }}
            >
              Read Technical Brief <span>→</span>
            </a>
          </div>
        </article>

        {/* Project 04: Whole-Body Loco-Manipulation */}
        <article className="project-card">
          <div className="project-visual project-visual-workstation">
            <div className="project-visual-topbar">
              <span className="project-number">04</span>
              <span className="career-badge">18-DOF SINGLE RL POLICY</span>
            </div>

            <div className="custom-visual-frame project-video-frame project-skills-grid-frame is-workstation-frame">
              <div className="custom-window-bar">
                <div className="window-dots"><i /><i /><i /></div>
                <div className="grid-window-title">
                  <span>GENESIS SIMULATION // 8-SKILL WHOLE-BODY BENCHMARK</span>
                </div>
                <span className="video-live-pill">8 PARALLEL SKILLS ●</span>
              </div>

              {/* 2 Rows x 4 Columns Video Grid */}
              <div className="skills-8-grid">
                {SKILL_VIDEOS.map((video, idx) => (
                  <div
                    key={video.id}
                    className="skill-video-card"
                    onClick={() => setActiveTheaterVideo(idx)}
                    title={`Click to view ${video.label} in full screen theater`}
                  >
                    <span className="skill-pill-badge">{video.label}</span>
                    <video
                      src={video.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      onCanPlay={(e) => {
                        e.currentTarget.play().catch(() => {});
                      }}
                      className="skill-grid-video-element"
                    />
                    <div className="skill-video-hud-compact">
                      <span>{video.telemetry}</span>
                    </div>
                    <div className="skill-video-hover-overlay">
                      <span>⤢ THEATER VIEW</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="project-visual-bottombar">
              <span className="visual-caption">18-DOF UNIFIED NEURAL POLICY · GENESIS GPU SIMULATION · SO-101 TELEOP</span>
            </div>
          </div>

          <div className="project-info">
            <div>
              <p className="project-tags">GENESIS · RSL-RL · WHOLE-BODY CONTROL · TELEOPERATION · SO-101</p>
              <h3>Whole-Body Loco-Manipulation — Go2 + SO-101</h3>
              <p>
                Reproduced and extended Liu et al. (MLM) on a merged Unitree Go2 + SO-101 platform
                (18 actuated DOF, single neural policy). Ported Isaac Gym to Genesis, built a procedural
                six-family 6-D trajectory dataset, and deployed into a live physical teleoperation system
                driven by an SO-101 leader arm: the robot walks, crouches, and stretches to track operator
                poses within 1–3 cm.
              </p>
            </div>
            <div className="project-outcome">
              <span>WHY IT MATTERS</span>
              <strong>Single unified policy achieves whole-body coordinated reaching and biped rearing.</strong>
            </div>
            <a
              className="arrow-link"
              href="#whole-body-arch"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = '#whole-body-arch';
                onOpenArchitecture?.();
              }}
            >
              Explore Architecture <span>→</span>
            </a>
          </div>
        </article>

        {/* Project 05: Vision-Language-Action Pallet Truck Docking */}
        <article className="project-card">
          <div className="project-visual">
            <span className="project-number">05</span>
            <span className="career-badge">VISION-LANGUAGE-ACTION · 450M MODEL</span>

            <div className="custom-visual-frame project-video-frame project-skills-grid-frame" style={{ marginTop: '1.8rem', marginBottom: '1.2rem' }}>
              <div className="custom-window-bar">
                <div className="window-dots"><i /><i /><i /></div>
                <div className="grid-window-title">
                  <span>ISAAC SIM // 2×2 CLOSED-LOOP VLA DOCKING ROLLOUTS (3X SPEED)</span>
                </div>
                <span className="video-live-pill">94% SUCCESS RATE ●</span>
              </div>

              {/* 2 Rows x 2 Columns Video Grid with 3X Speedup */}
              <div className="vla-2x2-grid">
                {VLA_VIDEOS.map((video, idx) => (
                  <div
                    key={video.id}
                    className="skill-video-card"
                    onClick={() => setActiveVlaTheaterVideo(idx)}
                    title={`Click to view ${video.label} in full screen theater`}
                  >
                    <span className="skill-pill-badge">{video.label} // 3X</span>
                    <video
                      src={video.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      onCanPlay={(e) => {
                        e.currentTarget.play().catch(() => {});
                      }}
                      className="skill-grid-video-element"
                    />
                    <div className="skill-video-hover-overlay">
                      <span>⤢ THEATER VIEW</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <span className="visual-caption">SMOLVLA (450M) · 20 HZ CONTROL · FLOW-MATCHING ACTION EXPERT · ISAAC SIM</span>
          </div>

          <div className="project-info">
            <div>
              <p className="project-tags">ISAAC SIM · SMOLVLA · IMITATION LEARNING · FLOW MATCHING · TRICYCLE AMR</p>
              <h3>VLA Pallet Truck Docking — One-Camera Precision Policy</h3>
              <p>
                Trained a 450M-parameter Vision-Language-Action policy (SmolVLA + 98M flow-matching action expert)
                to slide pallet truck tines into pallets from a single forward-facing RGB camera, steering angle,
                and contact switches in NVIDIA Isaac Sim. Over 7 policy generations and 704 expert demonstrations
                with DART noise injection, closed-loop docking rose from 41% to <strong>94% success rate</strong> (median 19 s) with zero jams.
                Discovered that hiding velocity proprioception eliminated copycat shortcuts (41% → 66%), and redesigning
                the expert's stop-and-fix maneuvers enabled decisive recoveries learnable directly from pixels (66% → 94%).
              </p>
            </div>
            <div className="project-outcome">
              <span>WHY IT MATTERS</span>
              <strong>94% closed-loop success from one RGB camera with zero runtime pose estimation.</strong>
            </div>
            <a
              className="arrow-link"
              href="#vla-report"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = '#vla-report';
                onOpenVlaReport?.();
              }}
            >
              Read Research Report <span>→</span>
            </a>
          </div>
        </article>
      </div>

      {/* 06 / Other Projects & Research Archive Carousel */}
      <div className="other-projects-section">
        <div className="other-projects-header">
          <div>
            <p className="section-kicker">06 / OPEN SOURCE ARCHIVE &amp; RESEARCH</p>
            <h3 className="other-projects-title">Other Projects &amp; Explorations</h3>
            <p className="other-projects-subtitle">
              Systems spanning humanoid whole-body RL, analytical kinematics, JAX world models, 3D scene graphs, and probabilistic filters from my open source engineering lab.
            </p>
          </div>
          <div className="carousel-controls-toolbar">
            <div className="carousel-counter">
              <span className="counter-current">
                {String((hoveredCardIdx !== null ? (hoveredCardIdx % totalProjectsCount) : carouselIndex) + 1).padStart(2, '0')}
              </span>
              <span className="counter-sep">/</span>
              <span className="counter-total">{String(totalProjectsCount).padStart(2, '0')}</span>
            </div>
            <div className="carousel-nav-buttons">
              <button
                type="button"
                className="carousel-btn prev-btn"
                onClick={prevProject}
                aria-label="Previous project slide"
                title="Previous slide"
              >
                ← PREV
              </button>
              <button
                type="button"
                className="carousel-btn next-btn"
                onClick={nextProject}
                aria-label="Next project slide"
                title="Next slide"
              >
                NEXT →
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Viewport with Touch & Keyboard Controls */}
        <div
          className="carousel-viewport"
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => {
            setIsCarouselPaused(false);
            setHoveredCardIdx(null);
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          tabIndex={0}
          role="region"
          aria-label="Other robotics projects carousel"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') prevProject();
            if (e.key === 'ArrowRight') nextProject();
          }}
        >
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${carouselIndex * (100 / cardsVisible)}%)`,
            }}
          >
            {[...OTHER_PROJECTS, ...OTHER_PROJECTS.slice(0, 4)].map((proj, idx) => {
              const isSelected = hoveredCardIdx !== null
                ? hoveredCardIdx === idx
                : (idx === carouselIndex);

              return (
                <div
                  key={`${proj.id}-${idx}`}
                  className={`carousel-card-wrap ${isSelected ? 'has-popped' : ''}`}
                  style={{
                    flex: `0 0 ${100 / cardsVisible}%`,
                    maxWidth: `${100 / cardsVisible}%`,
                  }}
                  onMouseEnter={() => setHoveredCardIdx(idx)}
                  onMouseLeave={() => setHoveredCardIdx(null)}
                >
                  <article className={`carousel-card ${isSelected ? 'is-popped' : ''}`}>
                  <div className="card-media-box" style={{ position: 'relative' }}>
                    {(() => {
                      const currentClip = activeClips[proj.id] || 'clip1';
                      const activeMediaSrc = proj.secondaryMediaSrc
                        ? (currentClip === 'clip1' ? proj.mediaSrc : proj.secondaryMediaSrc)
                        : proj.mediaSrc;

                      return (
                        <>
                          {proj.secondaryMediaSrc && (
                            <div
                              style={{
                                position: 'absolute',
                                top: '6px',
                                right: '6px',
                                zIndex: 3,
                                display: 'flex',
                                gap: '3px',
                                background: 'rgba(3,8,9,0.85)',
                                padding: '2px',
                                borderRadius: '4px',
                                border: '1px solid rgba(131,221,208,0.3)',
                              }}
                            >
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveClips((prev) => ({ ...prev, [proj.id]: 'clip1' }));
                                }}
                                style={{
                                  border: 'none',
                                  background: currentClip === 'clip1' ? 'var(--acid)' : 'transparent',
                                  color: currentClip === 'clip1' ? 'var(--ink)' : '#cde2de',
                                  fontFamily: 'var(--mono)',
                                  fontSize: '0.58rem',
                                  fontWeight: 800,
                                  padding: '2px 6px',
                                  borderRadius: '2px',
                                  cursor: 'pointer',
                                }}
                              >
                                {proj.clip1Label || 'Clip 1'}
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveClips((prev) => ({ ...prev, [proj.id]: 'clip2' }));
                                }}
                                style={{
                                  border: 'none',
                                  background: currentClip === 'clip2' ? 'var(--acid)' : 'transparent',
                                  color: currentClip === 'clip2' ? 'var(--ink)' : '#cde2de',
                                  fontFamily: 'var(--mono)',
                                  fontSize: '0.58rem',
                                  fontWeight: 800,
                                  padding: '2px 6px',
                                  borderRadius: '2px',
                                  cursor: 'pointer',
                                }}
                              >
                                {proj.clip2Label || 'Clip 2'}
                              </button>
                            </div>
                          )}
                          {proj.mediaType === 'video' ? (
                            <video
                              key={`${proj.id}-${currentClip}`}
                              src={activeMediaSrc}
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="auto"
                              onCanPlay={(e) => {
                                e.currentTarget.play().catch(() => {});
                              }}
                              className="card-media-video"
                            />
                          ) : (
                            <img
                              src={proj.mediaSrc}
                              alt={proj.title}
                              loading="lazy"
                              className="card-media-img"
                            />
                          )}
                        </>
                      );
                    })()}
                  </div>

                  <h4 className="card-title">{proj.title}</h4>
                  <p className="card-description">{proj.description}</p>
                  <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'center', marginTop: '0.6rem', flexWrap: 'wrap' }}>
                    {proj.briefUrl && (
                      <a
                        href={proj.briefUrl}
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.hash = proj.briefUrl!;
                          if (proj.id === 'forklift-docking') {
                            onOpenRlBrief?.();
                          } else if (proj.id === 'sam3d-mocap') {
                            onOpenSam3dReport?.();
                          }
                        }}
                        className="card-code-link"
                        style={{ color: 'var(--acid)', fontWeight: 800 }}
                      >
                        {proj.briefLabel || 'Read Brief →'}
                      </a>
                    )}
                    <a
                      href={proj.codeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="card-code-link"
                    >
                      Code →
                    </a>
                  </div>
                </article>
              </div>
            );
          })}
          </div>
        </div>

        {/* Carousel Indicators / Navigation Dots */}
        <div className="carousel-indicators-bar">
          {OTHER_PROJECTS.map((proj, idx) => (
            <button
              key={proj.id}
              type="button"
              className={`carousel-indicator-dot ${idx === (hoveredCardIdx !== null ? (hoveredCardIdx % totalProjectsCount) : carouselIndex) ? 'is-active' : ''}`}
              onClick={() => goToProject(idx)}
              aria-label={`Jump to project ${idx + 1}: ${proj.title}`}
              title={`Project ${idx + 1}: ${proj.title}`}
            />
          ))}
        </div>
      </div>

      <a
        className="all-projects"
        href="https://github.com/Abhinavjoshi7891?tab=repositories"
        target="_blank"
        rel="noreferrer"
      >
        <span>Explore all repositories &amp; open source projects</span>
        <span className="all-projects-line" />
        <span>20+ Repositories ↗</span>
      </a>

      {/* Lightbox Modal for Pallet Panel Images */}
      {modalImage && (
        <div
          className="poster-modal-backdrop"
          onClick={() => setModalImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="poster-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="poster-modal-toolbar">
              <div className="modal-title-info">
                <span className="modal-badge">HIGH-RES INSPECTION</span>
                <strong>{modalImage.title}</strong>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setModalImage(null)}
                title="Close Viewer (Esc)"
              >
                ✕
              </button>
            </div>
            <div className="poster-modal-stage">
              <img src={modalImage.src} alt={modalImage.title} className="poster-modal-image" />
            </div>
            <p style={{ padding: '0.8rem 1.2rem', margin: 0, fontSize: '0.74rem', fontFamily: 'var(--mono)', color: '#cde2de', background: '#060e10', borderTop: '1px solid rgba(131,221,208,0.2)' }}>
              {modalImage.subtitle}
            </p>
          </div>
        </div>
      )}
      {/* Full-Screen Theater Modal for 8-Video Grid */}
      {activeTheaterVideo !== null && (
        <div
          className="poster-modal-backdrop theater-modal-backdrop"
          onClick={() => setActiveTheaterVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Skill theater player"
        >
          <div
            className="poster-modal-container theater-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="poster-modal-toolbar">
              <div className="modal-title-info">
                <span className="modal-badge">
                  SKILL {activeTheaterVideo + 1} / 8
                </span>
                <strong>{SKILL_VIDEOS[activeTheaterVideo].label}</strong>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--cyan)' }}>
                  ({SKILL_VIDEOS[activeTheaterVideo].sublabel})
                </span>
              </div>

              <div className="modal-zoom-controls">
                <button
                  type="button"
                  className="modal-ctrl-btn"
                  onClick={() => setActiveTheaterVideo((idx) => ((idx! - 1 + 8) % 8))}
                  title="Previous Skill"
                >
                  ← Prev Skill
                </button>
                <button
                  type="button"
                  className="modal-ctrl-btn"
                  onClick={() => setActiveTheaterVideo((idx) => ((idx! + 1) % 8))}
                  title="Next Skill"
                >
                  Next Skill →
                </button>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setActiveTheaterVideo(null)}
                  title="Close Full Screen (Esc)"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="theater-video-stage">
              <video
                src={SKILL_VIDEOS[activeTheaterVideo].src}
                autoPlay
                loop
                controls
                playsInline
                className="theater-active-video"
              >
                Your browser does not support HTML5 video.
              </video>
            </div>

            <div className="theater-video-footer">
              <div className="theater-telemetry-badge">
                <span>TELEMETRY:</span>
                <strong>{SKILL_VIDEOS[activeTheaterVideo].telemetry}</strong>
              </div>
              <p className="theater-description">
                {SKILL_VIDEOS[activeTheaterVideo].description}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Full-Screen Theater Modal for 2x2 VLA Video Grid */}
      {activeVlaTheaterVideo !== null && (
        <div
          className="poster-modal-backdrop theater-modal-backdrop"
          onClick={() => setActiveVlaTheaterVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-label="VLA rollout theater player"
        >
          <div
            className="poster-modal-container theater-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="poster-modal-toolbar">
              <div className="modal-title-info">
                <span className="modal-badge">
                  ROLLOUT {activeVlaTheaterVideo + 1} / 4 (3X SPEED)
                </span>
                <strong>{VLA_VIDEOS[activeVlaTheaterVideo].label}</strong>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--cyan)' }}>
                  ({VLA_VIDEOS[activeVlaTheaterVideo].sublabel})
                </span>
              </div>

              <div className="modal-zoom-controls">
                <button
                  type="button"
                  className="modal-ctrl-btn"
                  onClick={() => setActiveVlaTheaterVideo((idx) => ((idx! - 1 + 4) % 4))}
                  title="Previous Rollout"
                >
                  ← Prev Rollout
                </button>
                <button
                  type="button"
                  className="modal-ctrl-btn"
                  onClick={() => setActiveVlaTheaterVideo((idx) => ((idx! + 1) % 4))}
                  title="Next Rollout"
                >
                  Next Rollout →
                </button>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setActiveVlaTheaterVideo(null)}
                  title="Close Full Screen (Esc)"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="theater-video-stage">
              <video
                src={VLA_VIDEOS[activeVlaTheaterVideo].src}
                autoPlay
                loop
                controls
                playsInline
                className="theater-active-video"
              >
                Your browser does not support HTML5 video.
              </video>
            </div>

            <div className="theater-video-footer">
              <div className="theater-telemetry-badge">
                <span>TELEMETRY:</span>
                <strong>{VLA_VIDEOS[activeVlaTheaterVideo].telemetry}</strong>
              </div>
              <p className="theater-description">
                {VLA_VIDEOS[activeVlaTheaterVideo].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
