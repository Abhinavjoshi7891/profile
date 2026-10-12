import React, { useState } from 'react';

interface ResumeSectionProps {
  onShowToast?: (msg: string) => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onShowToast }) => {
  const [isBooped, setIsBooped] = useState(false);

  const handleShihtzuClick = () => {
    setIsBooped(true);
    setTimeout(() => setIsBooped(false), 550);
    const msgs = [
      'Shih Tzu used Rest. It was extremely effective.',
      'Daily snacks & belly rubs: 100% achieved. Nap protocol active.',
      'Sleeping peacefully beside Abhinav while robots train.',
      'No crumbs detected. Consciousness at zero percent.',
    ];
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    onShowToast?.(msg);
  };

  return (
    <section id="resume" className="resume section-shell">
      <div className="resume-intro">
        <div>
          <p className="section-kicker">04 / Field log</p>
          <h2>
            RÉSUMÉ,<br />
            <em>with a pulse.</em>
          </h2>
        </div>
        <div className="resume-actions">
          <p>
            One page is useful. The story behind the bullet points is better.
            Here’s the quick scan; the original PDF is always one click away.
          </p>
          <div>
            <a
              className="resume-button primary"
              href="/Abhinav_Joshi_pdh_resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Open Résumé <span>↗</span>
            </a>
            <a
              className="resume-button"
              href="/Abhinav_Joshi_pdh_resume.pdf"
              download="Abhinav_Joshi_Resume.pdf"
            >
              Download <span>↓</span>
            </a>
          </div>
        </div>
      </div>

      <div className="impact-strip" aria-label="Career and Engineering Impact Highlights">
        <div>
          <span className="impact-before">0% →</span>
          <strong>89.4%</strong>
          <p>Elexis-W goal-reaching arrival</p>
        </div>
        <div>
          <span className="impact-before">200 ms →</span>
          <strong>&lt; 20 MS</strong>
          <p>Tugger AMR control latency</p>
        </div>
        <div>
          <span className="impact-before">RGB-D →</span>
          <strong>MONO 6D</strong>
          <p>Pallet pose under specular glare</p>
        </div>
        <div>
          <span className="impact-before">RANK #</span>
          <strong>1</strong>
          <p>IIT Delhi Executive Robotics</p>
        </div>
      </div>

      <div className="career-log" style={{ position: 'relative' }}>
        {/* Addverb */}
        <article className="career-entry current">
          <div className="career-when">
            <span>2026.07 — PRESENT</span>
            <i>LIVE</i>
          </div>
          <div className="career-role">
            <p>ADDVERB TECHNOLOGIES</p>
            <h3>Robotics Researcher — Mobile &amp; Advanced Robotics</h3>
          </div>
          <div className="career-story">
            <p>
              Trained learned social navigation policies for Elexis-W (India’s first wheeled
              humanoid, 133 kg, dual 7-DOF arms) using Time-to-Collision reward formulation
              in Isaac Lab. Solved monocular 6D/9D pallet pose estimation on industrial forklifts
              via HCCEPose + 4-way PnP consensus. Bypassed gateway serial delays on a tugger AMR
              to collapse control-loop latency from 200 ms to &lt; 20 ms (50 Hz). Low-level motor
              control via CiA 402 on CAN bus.
            </p>
            <div className="career-chips">
              <span>Isaac Lab</span>
              <span>Social Nav</span>
              <span>HCCEPose</span>
              <span>AMR Latency</span>
              <span>CiA 402</span>
            </div>
          </div>
          <span className="career-index">01</span>
        </article>

        {/* RISE Lab */}
        <article className="career-entry">
          <div className="career-when">
            <span>2025.11 — PRESENT</span>
            <i>LIVE</i>
          </div>
          <div className="career-role">
            <p>RISE LAB, IIT DELHI</p>
            <h3>Robotics Engineer &amp; AI Researcher</h3>
          </div>
          <div className="career-story">
            <p>
              Architected and deployed an end-to-end ROS 2 autonomy stack on a physical 1:10
              F1Tenth racer (real-time acados dynamic MPC with Pacejka tyres at 50 Hz on Jetson
              Orin Nano, Cartographer SLAM, O(N) friction circle solver). Developing low-cost
              ultrasound sonomyography assistive systems decoding muscle intent to drive an SO-101
              arm for spinal-cord injury rehabilitation. Designed and delivered the SO-101 executive curriculum.
            </p>
            <div className="career-chips">
              <span>acados MPC</span>
              <span>Jetson Orin Nano</span>
              <span>Sonomyography</span>
              <span>ROS 2</span>
            </div>
          </div>
          <span className="career-index">02</span>
        </article>

        {/* EPI */}
        <article className="career-entry">
          <div className="career-when">
            <span>2015.01 — PRESENT</span>
          </div>
          <div className="career-role">
            <p>EPI ENGINEERING &amp; PROJECTS INDIA</p>
            <h3>Director — Manufacturing</h3>
          </div>
          <div className="career-story">
            <p>
              Lead manufacturing operations supplying Tier-1 clients including Siemens, Airtel,
              and L&amp;T from design through high-volume electro-mechanical production; spearheading
              the company’s strategic transition into applied educational and industrial robotics.
            </p>
            <div className="career-chips">
              <span>Manufacturing</span>
              <span>Operations</span>
              <span>Mechatronics</span>
            </div>
          </div>
          <span className="career-index">03</span>
        </article>

        {/* Areva */}
        <article className="career-entry">
          <div className="career-when">
            <span>2010.08 — 2015.05</span>
          </div>
          <div className="career-role">
            <p>AREVA T&amp;D (NOW GE GRID SOLUTIONS)</p>
            <h3>SCADA Engineer</h3>
          </div>
          <div className="career-story">
            <p>
              Built and maintained mission-critical real-time monitoring, fault detection, and
              communication protocols for high-voltage power transmission substations under strict
              grid reliability specifications.
            </p>
            <div className="career-chips">
              <span>SCADA</span>
              <span>Real-Time Systems</span>
              <span>Grid Reliability</span>
            </div>
          </div>
          <span className="career-index">04</span>
        </article>

        {/* Sleeping Shih Tzu dog sleeping curled up beside a blueberry */}
        <button
          className={`resume-shihtzu-btn ${isBooped ? 'is-booped' : ''}`}
          type="button"
          onClick={handleShihtzuClick}
          aria-label="Abhinav's fluffy Shih Tzu dog sleeping curled up beside a blueberry. Click to interact."
          title="Shih Tzu nap mode: 100% active"
        >
          <span className="shihtzu-zzz">zZ</span>
          <img
            src="/assets/images/sleeping_shihtzu.png"
            alt="Pixel art Shih Tzu dog curled up asleep beside a blueberry"
            className="shihtzu-img"
          />
          <span className="shihtzu-lore">BERRY COMA</span>
        </button>
      </div>

      <div className="resume-footnotes">
        <div>
          <span>EDUCATION</span>
          <strong>IIT Delhi · Liverpool John Moores</strong>
          <p>Executive Programme in Robotics (Top Performer 2025) · M.Sc. ML &amp; AI (2023)</p>
        </div>
        <div>
          <span>HONOURS &amp; ATHLETICS</span>
          <strong>Silver Medalist · National Boxing</strong>
          <p>Advanced Drone Innovation (TiHAN 2024) · TOEFL 111/120 · UMD &amp; UIUC Admits</p>
        </div>
        <div className="resume-file-card">
          <span>CURRICULUM VITAE</span>
          <strong>ABHINAV_JOSHI_RESUME.PDF</strong>
          <p>2 pages · 68 KB · Updated 2026</p>
        </div>
      </div>
    </section>
  );
};
