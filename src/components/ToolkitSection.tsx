import React from 'react';

export const ToolkitSection: React.FC = () => {
  const tools = [
    {
      index: '01',
      category: 'Optimal Control & Dynamics',
      stack: 'acados Dynamic MPC · Crocoddyl FDDP · Pinocchio · CasADi · Frenet Frame · Pacejka Tyres',
      icon: '⌁',
    },
    {
      index: '02',
      category: 'Learning & Whole-Body RL',
      stack: 'Isaac Lab · MuJoCo MJX · Brax PPO · Genesis · World Models (JAX) · Diffusion Policy · ACT',
      icon: '◈',
    },
    {
      index: '03',
      category: 'Perception & 3D Vision',
      stack: 'HCCEPose · OpenCV · SAM3D · MediaPipe · OpenCLIP · HOV-SG · 6-DoF/9-DoF BOP Pose',
      icon: '◉',
    },
    {
      index: '04',
      category: 'Robotics Systems & Hardware',
      stack: 'ROS 2 · Jetson Orin Nano · CAN bus (CiA 402) · MODBUS · micro-ROS · Teensy 4.1 · Hokuyo LiDAR',
      icon: '</>',
    },
  ];

  return (
    <section id="toolkit" className="toolkit section-shell">
      <div className="section-heading compact">
        <div>
          <p className="section-kicker">06 / Toolkit</p>
          <h2>Engineered with<br /><em>rigor.</em></h2>
        </div>
      </div>

      <div className="tool-list">
        {tools.map((tool) => (
          <div key={tool.index} className="tool-row">
            <span className="tool-index">{tool.index}</span>
            <h3>{tool.category}</h3>
            <p>{tool.stack}</p>
            <span className="tool-icon">{tool.icon}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
