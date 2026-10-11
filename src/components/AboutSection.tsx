import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about section-shell">
      <div className="about-label">
        <p className="section-kicker">03 / About</p>
        <div className="profile-stamp">
          <span>AJ</span>
          <span className="stamp-copy">ROBOTICS<br />ENGINEER</span>
        </div>
      </div>

      <div className="about-copy">
        <p className="about-lead">
          I LIKE SYSTEMS THAT ESCAPE THE SCREEN: <em>robots that perceive, adapt, and act.</em>
        </p>

        <div className="about-columns">
          <p>
            My work sits at the intersection of learning-based control,
            model-based optimal control, and full-stack autonomy across morphologies.
            Currently advancing learned social navigation for Elexis-W (India’s first
            wheeled humanoid) and monocular 6-DoF pallet pose estimation at{' '}
            <strong>Addverb Technologies</strong>, alongside deploying high-speed
            ROS 2 racing autonomy and ultrasound assistive systems at{' '}
            <strong>RISE Lab, IIT Delhi</strong>.
          </p>
          <p>
            I care deeply about the unglamorous layers that make autonomy work
            in reality: diagnosing episode-horizon bugs in simulation viewers,
            collapsing industrial AMR communication bottlenecks from 200 ms
            down to sub-20 ms over CAN/MODBUS, and driving brushless motors via
            the CiA 402 profile. Outside the lab, I’m a{' '}
            <strong>National Boxing Championship Silver Medalist</strong>, bringing
            the same relentless discipline to robotics research.
          </p>
        </div>

        <div className="facts">
          <div className="fact">
            <span className="fact-number">94%</span>
            <span>VLA Pallet Docking Rate</span>
          </div>
          <div className="fact">
            <span className="fact-number">90.6%</span>
            <span>RL Tight Slot Docking</span>
          </div>
          <div className="fact">
            <span className="fact-number">18,439</span>
            <span>SAM 3D Mesh Vertices</span>
          </div>
          <div className="fact">
            <span className="fact-number">205M</span>
            <span>Timesteps in MuJoCo MJX</span>
          </div>
        </div>
      </div>
    </section>
  );
};
