import React, { useState } from 'react';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Abhinav Joshi, home">
          <span className="brand-mark">AJ</span>
          <span className="brand-copy">Robotics / Embodied AI<br />New Delhi, India</span>
        </a>

        <button
          className="menu-toggle"
          aria-expanded={isOpen}
          aria-controls="site-nav"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
        </button>

        <nav id="site-nav" className={`site-nav ${isOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#lab" onClick={closeMenu}>Elexis Lab</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#resume" onClick={closeMenu}>Field Log</a>
          <a href="#research" onClick={closeMenu}>Research</a>
          <a href="#toolkit" onClick={closeMenu}>Toolkit</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a href="#journey" onClick={closeMenu}>Journey</a>
          <a
            className="nav-github"
            href="https://github.com/Abhinavjoshi7891"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>
    </>
  );
};
