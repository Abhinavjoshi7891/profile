import type {
  ProjectItem,
  MiniProjectItem,
  NewsItem,
  PublicationItem,
  ExperienceItem,
  EducationItem,
  GalleryItem,
} from '../types';

export const personalInfo = {
  name: 'Abhinav Joshi',
  title: 'Robotics Engineer, Advanced Robotics & Mobile Robotics at Addverb Technologies',
  tagline: 'Robotics engineer • Learning-based & optimal control • Embodied AI',
  avatarSrc: '/assets/images/profile.svg',
  resumeUrl: '/Abhinav_Joshi_pdh_resume.pdf',
  bio: `I am a robotics engineer working on learning-based control, model-based optimal control, and full-stack autonomy across robot morphologies. Currently at the Mobile Robotics and Advanced Robotics teams at Addverb Technologies and an AI researcher at the RISE Lab, IIT Delhi. Targeting PhD admissions in robotics with focus on World Models, Vision-Language-Action (VLA) models, and Extreme Whole-Body Control.`,
  contacts: {
    email: 'abhinavjoshi7891@gmail.com',
    github: 'https://github.com/Abhinavjoshi7891',
    linkedin: 'https://linkedin.com/in/abhinav-joshi-949a9227',
    resume: '/Abhinav_Joshi_pdh_resume.pdf',
  },
  interestsParagraph: `I work as a robotics engineer in the <span class="highlight">Mobile Robotics & Advanced Robotics</span> wings at Addverb Technologies and as an AI researcher at <span class="highlight">RISE Lab, IIT Delhi</span>. My research focuses on bridging <span class="highlight">generative world models</span> and <span class="highlight">Vision–Language–Action (VLA) models</span> with real-time, contact-rich <span class="highlight">whole-body loco-manipulation</span> and <span class="highlight">model-based optimal control</span>. I am keen to collaborate on:`,
  collaborationInterests: [
    'Generative world models (DreamerV4, RSSM)',
    'Vision–Language–Action (VLA) models & docking',
    'Whole-body loco-manipulation (Go2 + SO-101)',
    'Humanoid RL & human-motion retargeting (Unitree G1)',
    'Model-based optimal control (acados, Crocoddyl)',
    'Contact mechanics, friction cones & wrench sets',
    'Full-stack autonomous racing & ROS 2 systems',
    'Sub-20ms hard real-time latency & CiA 402 motor control',
  ],
};

export const newsHighlights: NewsItem[] = [
  {
    id: 'news-1',
    date: 'Jul 2026',
    tag: { label: 'New Role', type: 'role' },
    title: 'Joined Addverb Technologies — Mobile & Advanced Robotics',
    titleLink: 'https://addverb.com',
    description:
      'Working on learned social navigation for Elexis-W (India’s first wheeled humanoid), 6D/9D BOP pallet pose estimation, and vision-language-action (VLA) models for autonomous forklift docking.',
  },
  {
    id: 'news-2',
    date: 'Nov 2025',
    tag: { label: 'Research', type: 'research' },
    title: 'Robotics Engineer & AI Researcher at RISE Lab, IIT Delhi',
    description:
      'Developing full ROS 2 autonomy stack for F1Tenth / RoboRacer on physical 1:10 hardware, low-cost ultrasound sonomyography assistive systems, and delivering the SO-101 robotics executive curriculum.',
  },
  {
    id: 'news-3',
    date: '2025',
    tag: { label: 'Paper', type: 'paper' },
    title: 'Pre-print: EEG-Based Depression Detection with CNN-LSTM',
    description:
      'Co-authored research on novel spatial RGB spectrogram mapping for noisy neurophysiological decoding, achieving 90.0% LOSO accuracy across 40 subjects and 93.8% MDD sensitivity.',
  },
  {
    id: 'news-4',
    date: '2025',
    tag: { label: 'Award', type: 'award' },
    title: 'Ranked Top Performer — Executive Programme in Robotics, IIT Delhi',
    description:
      'Completed comprehensive executive programme covering robot kinematics, dynamics, learning-based control, and manipulation pipelines with top academic distinction.',
  },
  {
    id: 'news-6',
    date: '2024',
    tag: { label: 'Talk', type: 'talk' },
    title: 'RoboAI TOPAZ Competition Distinction',
    description:
      'Awarded recognition in autonomous robotics design and software stack development.',
  },
  {
    id: 'news-7',
    date: '2023',
    tag: { label: 'Paper', type: 'paper' },
    title: 'Completed M.Sc. Thesis in Sim-to-Real Drone Navigation',
    titleLink: 'https://www.ljmu.ac.uk',
    description:
      'M.Sc. Thesis at Liverpool John Moores University: redesigned student depth backbones (MobileNet-V3, GhostNet) within a teacher-student framework with DAgger, slashing onboard compute while preserving zero-shot obstacle avoidance.',
  },
  {
    id: 'news-9',
    date: 'Athletics',
    tag: { label: 'Award', type: 'award' },
    title: 'Silver Medalist — National Boxing Championship',
    description:
      'Demonstrated athletic discipline, rigorous training ethics, and resilience at national competitive levels.',
  },
];

export const mainProjects: ProjectItem[] = [
  {
    id: 'go2-so101',
    title: 'Whole-Body Loco-Manipulation — Go2 + SO-101 (18 DOF, Single RL Policy)',
    summary:
      'Reproduced and extended Liu et al. (MLM, 2025) on a merged Unitree Go2 + SO-101 platform (18 actuated DOF, single policy). Ported Isaac Gym → Genesis, constructed a procedural six-family 6-D trajectory library, and trained policies into a live teleoperation system driven by a physical SO-101 leader arm: the robot walks, crouches, and stretches to track operator hand poses within 1–3 cm. Extended to bipedal rearing (<1° pendulum angle) and agile 2.5 m/s running.',
    mediaSrc: '/assets/diagrams/go2_so101.svg',
    mediaType: 'image',
    tags: [
      { text: 'Genesis + rsl_rl', color: 'purple' },
      { text: 'Whole-Body Control', color: 'mint' },
      { text: 'Single RL Policy', color: 'teal' },
      { text: 'Physical Teleop Arm', color: 'gold' },
    ],
    links: [
      { label: 'Genesis Sim', url: '#about-detailed' },
      { label: 'SO-101 Teleop', url: '#hardware-projects' },
    ],
  },
  {
    id: 'elexis-w-nav',
    title: 'Learned Social Navigation — Elexis-W Wheeled Humanoid (India’s First)',
    summary:
      'Addverb Advanced Robotics: Navigating a 133 kg differential-drive platform carrying dual 7-DOF arms (26 links) across pedestrian crowds. Formulated social evasion as a timing problem rather than geometry: single range scans fail because oncoming people and walls look identical, while Euclidean distance penalties induce frozen-robot paralysis. Charged Time-to-Collision (TTC) instead, with safety disc governed by 0.79 m arm reach. Doubling episode duration raised arrival rate from 0% to 89.4%.',
    mediaSrc: '/assets/diagrams/elexis_w.svg',
    mediaType: 'image',
    tags: [
      { text: 'Isaac Lab / Isaac Sim', color: 'mint' },
      { text: 'Addverb Industrial', color: 'teal' },
      { text: 'Time-to-Collision', color: 'gold' },
      { text: 'Wheeled Humanoid', color: 'blue' },
    ],
    links: [
      { label: 'Addverb Research', url: '#work-experience' },
      { label: 'Technical Brief', url: '#patents-publications' },
    ],
    posterId: 'elexis-w',
  },
  {
    id: 'f1tenth-roboracer',
    title: 'Autonomous Racing Autonomy Stack — F1Tenth / RoboRacer',
    summary:
      'End-to-end ROS 2 autonomy stack on a physical 1:10 vehicle. Model-based optimal control in acados (both kinematic and single-track dynamic MPC with Pacejka tyres, real-time SQP) on a Jetson Orin Nano, hybrid state estimator fusing IMU and VESC odometry with Cartographer SLAM in Frenet coordinates, and a redesigned safety state machine for obstacle overtaking. Built an O(N) two-pass friction-circle velocity profiler and fitted tyre parameters via NLS from physical logged telemetry.',
    mediaSrc: '/assets/diagrams/f1tenth.svg',
    mediaType: 'image',
    tags: [
      { text: 'ROS 2 Autonomy', color: 'blue' },
      { text: 'acados Dynamic MPC', color: 'mint' },
      { text: 'Jetson Orin Nano', color: 'coral' },
      { text: 'Physical 1:10 Racer', color: 'gold' },
    ],
    links: [
      { label: 'GitHub Repo →', url: 'https://github.com/Abhinavjoshi7891/eth_roboracer', isExternal: true },
    ],
  },
  {
    id: 'dreamerv4-world-model',
    title: 'World Model for Model-Based Planning (DreamerV4-Style in JAX/Flax)',
    summary:
      'Self-directed reproduction of a DreamerV4-style latent world model in JAX (space-time causal transformer, RSSM dynamics). Validated the VAE tokenizer on CoinRun, compressing 64×64 frames into latent tokens and reconstructing them; latent-imagination actor-critic loop in progress. Training a lightweight world model to deploy on a physical SO-101 arm to investigate what breaks when learned dynamics models meet real hardware.',
    mediaSrc: '/assets/diagrams/world_model.svg',
    mediaType: 'image',
    tags: [
      { text: 'JAX / Flax', color: 'purple' },
      { text: 'Generative World Models', color: 'mint' },
      { text: 'RSSM Dynamics', color: 'teal' },
      { text: 'SO-101 Hardware', color: 'gold' },
    ],
    links: [
      { label: 'World Models Research', url: '#about-detailed' },
    ],
  },
];

export const miniProjects: MiniProjectItem[] = [
  {
    id: 'crocoddyl-ocp',
    title: 'Floating-Base Optimal Control (Crocoddyl / Pinocchio)',
    description:
      'Solved Go2 and Talos walking OCPs with FDDP (8.1× warm-start speedup on Talos). Benchmark proved that discrete contact sets—not leg count—dictate achievable dynamic stability.',
    mediaSrc: '/assets/diagrams/crocoddyl.svg',
    tags: [
      { text: 'Crocoddyl FDDP', color: 'mint' },
      { text: 'Pinocchio', color: 'blue' },
    ],
    links: [{ label: 'OCP Details →', url: '#about-detailed' }],
  },
  {
    id: 'leap-hand-mjx',
    title: 'Dexterous Manipulation — LEAP Hand (MJX) & SimToolReal',
    description:
      'Trained DeepMind’s LeapCubeReorient (16-DOF LEAP hand) to 205M timesteps across 8192 parallel envs in MJX on RTX 4060 laptop GPU (16–18k steps/s). Evaluated SimToolReal on 29-DOF Kuka + SharPa.',
    mediaSrc: '/assets/diagrams/leap_hand.svg',
    tags: [
      { text: 'MJX / Brax PPO', color: 'purple' },
      { text: 'LEAP Hand', color: 'teal' },
    ],
    links: [{ label: 'Dexterous Setup →', url: '#about-detailed' }],
  },
  {
    id: 'aerial-mpc-rl',
    title: 'Aerial Optimal Control & Drone RL (agilicious MPC)',
    description:
      'Built acados quadrotor MPC in agilicious (UZH flight stack) and fixed controller solver corruption bug. Trained vision navigation in cluttered rooms from onboard depth (VAE + GRU memory).',
    mediaSrc: '/assets/diagrams/drone_mpc.svg',
    tags: [
      { text: 'agilicious MPC', color: 'blue' },
      { text: 'Aerial Gym', color: 'gold' },
    ],
    links: [{ label: 'M.Sc. Thesis →', url: '#patents-publications' }],
  },
  {
    id: 'hov-sg-graphs',
    title: 'Open-Vocabulary 3D Scene Graphs (HOV-SG)',
    description:
      'Reproducing HOV-SG to turn continuous RGB-D streams into hierarchical, language-queryable 3D scene graphs (Building → Room → Object) with SAM and OpenCLIP for semantic navigation.',
    mediaSrc: '/assets/diagrams/forklift_vla.svg',
    tags: [
      { text: 'HOV-SG', color: 'coral' },
      { text: 'OpenCLIP', color: 'mint' },
    ],
    links: [{ label: 'Semantic Nav →', url: '#about-detailed' }],
  },
];

export const mechanicalProjects: MiniProjectItem[] = [
  {
    id: 'forklift-vla',
    title: 'VLA Grounding for Autonomous Forklift Docking',
    description:
      'Addverb Mobile Robotics: Multimodal zero-shot foundation policy conditioning drive and mast actuation on natural-language bay instructions and RGB-D/LiDAR streams with hard sub-20ms CAN safety clamping.',
    mediaSrc: '/assets/diagrams/forklift_vla.svg',
    tags: [
      { text: 'VLA Foundation Policy', color: 'purple' },
      { text: 'Addverb Industrial', color: 'teal' },
    ],
    links: [{ label: 'Poster Brief →', url: '#patents-publications' }],
  },
  {
    id: 'hccepose-pallet',
    title: 'Monocular 6D/9D Pallet Pose Estimation (HCCEPose)',
    description:
      'Dense 2D–3D correspondence with Gray-coded coordinate representation and 4-way PnP+RANSAC consensus voting. Bypasses fragile RGB-D sensors on specular metal pallets with synthetic BlenderProc training.',
    mediaSrc: '/assets/diagrams/hccepose.svg',
    tags: [
      { text: 'HCCEPose 6D Pose', color: 'mint' },
      { text: 'BlenderProc BOP', color: 'gold' },
    ],
    links: [{ label: 'Perception Brief →', url: '#patents-publications' }],
  },
  {
    id: 'amr-latency-overhaul',
    title: 'Real-Time Control Loop & Sub-20ms AMR Latency Overhaul',
    description:
      'Collapsed a 200ms communication path bottleneck down to <20ms at 50Hz by bypassing gateway hops. Implemented CiA 402 motion profile on CAN/MODBUS for Italsea brushless PM motors.',
    mediaSrc: '/assets/diagrams/avatar_placeholder.svg',
    tags: [
      { text: 'Deterministic <20ms', color: 'coral' },
      { text: 'CiA 402 CAN', color: 'blue' },
    ],
    links: [{ label: 'Embedded Stack →', url: '#work-experience' }],
  },
  {
    id: 'holonomic-explorer',
    title: 'Occupancy-Grid Mapping Holonomic Robot',
    description:
      'Designed and built 3-wheel holonomic robot from scratch: online 50×50 occupancy grid mapping, 24-sector direction scoring routine, per-wheel PID speed loops, and Teensy 4.1 firmware.',
    mediaSrc: '/assets/diagrams/avatar_placeholder.svg',
    tags: [
      { text: 'Teensy 4.1', color: 'gold' },
      { text: 'Holonomic Omni', color: 'mint' },
    ],
    links: [{ label: 'Mechatronics →', url: '#work-experience' }],
  },
];

export const publications: PublicationItem[] = [
  {
    id: 'pub-eeg',
    title: 'EEG-Based Depression Detection: Hybrid CNN-LSTM with Spatial RGB Spectrogram Mapping',
    authors: 'Abhinav Joshi (Co-Author) et al.',
    venue: 'Pre-print, 2025 (90.0% LOSO accuracy across 40 subjects; 93.8% MDD sensitivity)',
    year: '2025',
    links: [
      { label: 'Pre-print', url: 'https://arxiv.org' },
    ],
  },
  {
    id: 'pub-ultrasound',
    title: 'Ultrasound-Based Intent Decoding for Assistive & Rehabilitative Control',
    authors: 'Abhinav Joshi, RISE Lab, IIT Delhi',
    venue: 'In preparation — target IEEE TBME / ICORR. Sonomyography (A/B-mode ultrasound) driving low-cost SO-101 arm for SCI patient rehabilitation.',
    year: '2026/2027',
    links: [
      { label: 'Target IEEE TBME', url: '#about-detailed' },
    ],
  },
  {
    id: 'pub-drone-thesis',
    title: 'Teaching Drones to Navigate Through Urban Landscapes',
    authors: 'Abhinav Joshi (Author)',
    venue: 'M.Sc. Thesis, Liverpool John Moores University (Privileged teacher-student distillation with MobileNet-V3/GhostNet backbones and DAgger).',
    year: '2023',
    links: [
      { label: 'LJMU Repository', url: 'https://www.ljmu.ac.uk' },
    ],
  },
  {
    id: 'brief-elexis',
    title: 'Industrial Technical Brief: Learned Social Navigation for Wheeled Humanoids via Time-to-Collision Rewards',
    authors: 'Abhinav Joshi, Advanced Robotics Team, Addverb Technologies',
    venue: 'Addverb Industrial Robotics Research (NVIDIA Isaac Lab, 2048 envs, asymmetric actor-critic).',
    year: '2026',
    links: [
      { label: 'View Scientific Poster', url: '#projects' },
    ],
  },
  {
    id: 'brief-hccepose',
    title: 'Industrial Technical Brief: Monocular 6D/9D BOP Pallet Pose Estimation via Gray-Coded Correspondences',
    authors: 'Abhinav Joshi, Mobile Robotics Team, Addverb Technologies',
    venue: 'Addverb Industrial Robotics Research (Synthetic BlenderProc to BOP, low-cost onboard Intel compute).',
    year: '2026',
    links: [
      { label: 'View Scientific Poster', url: '#hardware-projects' },
    ],
  },
];

export const experiences: ExperienceItem[] = [
  {
    id: 'exp-addverb',
    role: 'Robotics Researcher — Mobile Robotics & Advanced Robotics Teams',
    company: 'Addverb Technologies',
    companyUrl: 'https://addverb.com',
    period: 'Jul 2026 – Present',
    logoSrc: '/assets/images/profile.svg',
    bullets: [
      'Learned Social Navigation for Elexis-W: India’s first wheeled humanoid (133 kg, two 7-DOF arms, 26 links). Formulated timing-based reward curriculum in Isaac Lab (2048 envs, asymmetric actor-critic), elevating arrival rate from 0% to 89.4%.',
      'VLA for Forklift Docking: Formulating vision-language-action foundation policies for autonomous forklift docking and pallet manipulation under unstructured warehouse flows.',
      'Monocular 6D/9D Pallet Pose Estimation: Adapted HCCEPose with Gray-coded dense 2D–3D correspondence and 4-way PnP+RANSAC consensus voting to replace brittle RGB-D sensors under heavy specular glare; built BlenderProc synthetic data pipeline.',
      'Real-Time Control Loop Overhaul: Diagnosed and eliminated a 200ms communication path bottleneck across industrial MODBUS/TCP gateways down to <20ms at 50Hz. Implemented CiA 402 CAN motion profile drivers for Italsea PM brushless motor controllers.',
      'Whole-Body Control & Dexterous Manipulation: Developing perception-blind WBC for trakr quadruped and evaluating SimToolReal framework for multi-task tool manipulation.',
    ],
  },
  {
    id: 'exp-rise',
    role: 'Robotics Engineer & AI Researcher',
    company: 'RISE Lab, Indian Institute of Technology (IIT) Delhi',
    companyUrl: 'https://home.iitd.ac.in',
    period: 'Nov 2025 – Present',
    bullets: [
      'Developed and deployed a full ROS 2 autonomy stack for the F1Tenth / RoboRacer on physical 1:10 hardware with acados dynamic MPC on Jetson Orin Nano, Cartographer SLAM, and custom raceline generation.',
      'Building a low-cost ultrasound-driven rehabilitation and assistive system for spinal-cord-injury (SCI) patients using A-mode and B-mode sonomyography with IMU sensing to drive an SO-101 assistive arm.',
      'Mechatronics & embedded firmware: BNO085 and x-IMU3 sensing over ROS 2 and micro-ROS, digital twins in NVIDIA Isaac Sim with real-time physical synchronization, firmware on Teensy and ESP32.',
      'Designed and delivered the SO-101 robotics executive curriculum (MuJoCo, LeRobot, ACT, Diffusion Policy) for the IIT Delhi Executive Programme; Teaching Assistant for Spring School in Sports Technology 2026.',
    ],
  },
  {
    id: 'exp-epi',
    role: 'Director — Manufacturing',
    company: 'EPI Engineering & Projects India Pvt. Ltd.',
    period: '2015 – Present',
    bullets: [
      'Led operations of an electro-mechanical manufacturing company supplying industrial leaders including Siemens, Airtel, and L&T from design through production.',
      'Steered the firm’s strategic pivot toward applied robotics and educational robotics platforms.',
    ],
  },
  {
    id: 'exp-areva',
    role: 'SCADA Engineer · Areva T&D (now GE Grid Solutions) & Asst. Manager (Union Bank)',
    company: 'Areva T&D / GE Grid Solutions',
    period: '2010 – 2015',
    bullets: [
      'Engineered and maintained mission-critical real-time monitoring, fault-detection, and industrial telemetry systems for high-voltage power grid substations under strict fault-tolerance standards.',
    ],
  },
];

export const educationList: EducationItem[] = [
  {
    id: 'edu-iitd',
    degree: 'Executive Programme in Robotics — Top Performer',
    institution: 'Indian Institute of Technology (IIT) Delhi',
    institutionUrl: 'https://home.iitd.ac.in',
    period: '2025',
    details: [
      'Ranked top performer. Focused on robot kinematics, dynamics, learning-based control, and imitation learning pipelines.',
    ],
  },
  {
    id: 'edu-ljmu',
    degree: 'M.Sc. Machine Learning & AI',
    institution: 'Liverpool John Moores University',
    institutionUrl: 'https://www.ljmu.ac.uk',
    period: '2023',
    details: [
      'Thesis: Efficient sim-to-real drone navigation within a teacher-student framework, redesigning student depth backbones (MobileNet-V3-Small, GhostNet) with DAgger and domain randomization.',
    ],
  },
  {
    id: 'edu-iiitb',
    degree: 'PG Diploma in Machine Learning & AI',
    institution: 'IIIT Bangalore',
    institutionUrl: 'https://www.iiitb.ac.in',
    period: '2022',
    details: ['Comprehensive foundations in statistical learning, deep learning, and reinforcement learning.'],
  },
  {
    id: 'edu-btech',
    degree: 'B.Tech Electrical & Electronics Engineering',
    institution: "Bharati Vidyapeeth's College of Engineering",
    period: '2010',
    details: ['Core foundations in electrical machinery, control systems, signal processing, and circuit design.'],
  },
];

export const awards = [
  {
    title: 'IIT Delhi Executive Programme in Robotics — Top Performer (2025)',
    description: 'Ranked top performer in executive robotics curriculum covering manipulation, learning-based control, and dynamics.',
  },
  {
    title: 'RoboAI TOPAZ Competition Honor (2024)',
    description: 'Recognized for autonomous robotic architecture and software deployment.',
  },
  {
    title: 'Silver Medalist — National Boxing Championship',
    description: 'National-level athletic achievement reflecting discipline, physical perseverance, and tactical precision.',
  },
  {
    title: 'English Language Standardized Scores',
    description: 'TOEFL iBT: 111 / 120 · Duolingo English Test: 150 / 160.',
  },
];

export const photoGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    imgSrc: '/assets/diagrams/go2_so101.svg',
    caption: 'Whole-Body Loco-Manipulation on Go2 + SO-101 (18 DOF, Genesis Sim & Live Teleop)',
    alt: 'Go2 SO-101 Loco-Manipulation',
  },
  {
    id: 'gal-2',
    imgSrc: '/assets/diagrams/elexis_w.svg',
    caption: 'Learned Social Navigation for Elexis-W Wheeled Humanoid (Addverb, Isaac Lab)',
    alt: 'Elexis-W Social Navigation',
  },
  {
    id: 'gal-3',
    imgSrc: '/assets/diagrams/f1tenth.svg',
    caption: 'Autonomous Racing Autonomy Stack on Physical 1:10 Racer (acados MPC, Jetson Orin Nano)',
    alt: 'F1Tenth Autonomy Stack',
  },
  {
    id: 'gal-4',
    imgSrc: '/assets/diagrams/forklift_vla.svg',
    caption: 'Vision-Language-Action (VLA) Grounding for Autonomous Forklift Docking (Addverb)',
    alt: 'VLA Forklift Docking',
  },
  {
    id: 'gal-5',
    imgSrc: '/assets/diagrams/hccepose.svg',
    caption: 'Monocular 6D/9D Pallet Pose Estimation via Gray-Coded Correspondences (HCCEPose)',
    alt: 'HCCEPose Pallet Pose Estimation',
  },
  {
    id: 'gal-6',
    imgSrc: '/assets/diagrams/world_model.svg',
    caption: 'DreamerV4-Style World Model with Space-Time Causal Transformer in JAX/Flax',
    alt: 'DreamerV4 World Model',
  },
  {
    id: 'gal-7',
    imgSrc: '/assets/diagrams/leap_hand.svg',
    caption: 'Dexterous Manipulation with LEAP Hand in MJX (205M timesteps, 8192 envs)',
    alt: 'LEAP Hand Dexterous Manipulation',
  },
  {
    id: 'gal-8',
    imgSrc: '/assets/diagrams/crocoddyl.svg',
    caption: 'Floating-Base Optimal Control with Crocoddyl & Pinocchio (Go2 & Talos)',
    alt: 'Crocoddyl Optimal Control',
  },
  {
    id: 'gal-9',
    imgSrc: '/assets/diagrams/drone_mpc.svg',
    caption: 'Aerial Optimal Control & Drone RL Navigation through Cluttered Rooms',
    alt: 'Drone MPC & RL',
  },
];
