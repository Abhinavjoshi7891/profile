import React from 'react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="contact section-shell">
      <p className="section-kicker">07 / Say hello</p>
      <div className="contact-main">
        <h2>
          Have an interesting<br />problem to <em>solve?</em>
        </h2>
        <p>
          I’m always open to deep technical discussions on learning-based control,
          world models, high-speed optimal control, or prospective PhD research
          and industry collaborations.
        </p>
      </div>

      <div className="contact-links">
        <a
          href="https://github.com/Abhinavjoshi7891"
          target="_blank"
          rel="noreferrer"
        >
          <span>GitHub</span>
          <span>↗</span>
        </a>
        <a
          href="https://linkedin.com/in/abhinav-joshi-949a9227"
          target="_blank"
          rel="noreferrer"
        >
          <span>LinkedIn</span>
          <span>↗</span>
        </a>
        <a href="mailto:abhinavjoshi7891@gmail.com">
          <span>Email</span>
          <span>↗</span>
        </a>
      </div>
    </section>
  );
};
