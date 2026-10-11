import React from 'react';

interface NavbarProps {
  name: string;
}

export const Navbar: React.FC<NavbarProps> = ({ name }) => {
  return (
    <header className="site-header">
      <div className="wrap">
        <h1 className="logo">
          <a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>
            {name}
          </a>
        </h1>
        <nav>
          <a href="#about">About</a>
          <a href="#about-detailed">Interests</a>
          <a href="#news-highlights">Highlights</a>
          <a href="#projects">Projects</a>
          <a href="#hardware-projects">Mechanical</a>
          <a href="#patents-publications">Publications</a>
          <a href="#work-experience">Experience</a>
          <a href="#education">Education</a>
          <a href="#awards">Awards</a>
        </nav>
      </div>
    </header>
  );
};
