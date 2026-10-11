import React from 'react';

export const SkillsTicker: React.FC = () => {
  const items = [
    'Isaac Lab',
    'Whole-Body RL',
    'acados MPC',
    'Time-to-Collision',
    'ROS 2',
    'MuJoCo MJX',
    'Pinocchio',
    'World Models',
    'C++',
    'PyTorch',
    'JAX / Flax',
    'Sim-to-Real',
  ];

  return (
    <section className="ticker" aria-label="Core Engineering Competencies">
      <div className="ticker-track">
        {items.map((skill, i) => (
          <span key={`a-${i}`}>
            {skill}<i>✦</i>
          </span>
        ))}
        {items.map((skill, i) => (
          <span key={`b-${i}`} aria-hidden="true">
            {skill}<i>✦</i>
          </span>
        ))}
      </div>
    </section>
  );
};
