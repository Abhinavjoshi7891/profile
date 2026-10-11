import React, { useEffect, useRef } from 'react';

export const Hero: React.FC = () => {
  const consoleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        if (consoleRef.current && window.innerWidth > 980) {
          consoleRef.current.style.transform = `translateY(${Math.min(window.scrollY * 0.04, 25)}px)`;
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="top" className="hero">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" />
          Robotics engineer · Embodied AI · Learning &amp; Control
        </p>
        <h1>
          I teach machines<br />
          to <em>perceive, adapt</em><br />
          <span className="outline-text">&amp; control.</span>
        </h1>
        <div className="hero-bottom">
          <p className="intro">
            I’m <strong>Abhinav Joshi</strong> — I build learning-based and
            model-based autonomous systems across wheeled humanoids, quadrupeds,
            AMRs, and high-speed racing platforms. Currently engineering at{' '}
            <strong>Addverb Technologies</strong> and researching at{' '}
            <strong>RISE Lab, IIT Delhi</strong>.
          </p>
          <a className="round-link" href="#work" aria-label="See selected work">
            <span>See work</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4v15M6 13l6 6 6-6" />
            </svg>
          </a>
        </div>
      </div>

      <aside ref={consoleRef} className="hero-console" aria-label="Robot system status telemetry">
        <div className="console-top">
          <span>ABHINAV_OS // RISE_CORE</span>
          <span>v08.26</span>
        </div>
        <div className="radar">
          <div className="radar-ring ring-one" />
          <div className="radar-ring ring-two" />
          <div className="radar-cross x" />
          <div className="radar-cross y" />
          <div className="radar-sweep" />
          <div className="radar-bot">
            <span className="bot-eye" />
            <span className="bot-eye" />
          </div>
          <span className="ping ping-one" />
          <span className="ping ping-two" />
          <span className="coordinate coord-one">28.5450° N</span>
          <span className="coordinate coord-two">77.1926° E</span>
        </div>
        <div className="console-readout">
          <div>
            <span className="readout-label">SYSTEM ARCH</span>
            <strong>AUTONOMOUS</strong>
          </div>
          <div>
            <span className="readout-label">STATUS</span>
            <strong className="online">DEPLOYING ●</strong>
          </div>
        </div>
      </aside>
    </section>
  );
};
