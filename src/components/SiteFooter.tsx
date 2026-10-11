import React from 'react';

interface SiteFooterProps {
  name: string;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ name }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          &copy; {year} {name} — Robotics Engineer &amp; Researcher · Built with ❤️
        </p>
        <p style={{ margin: '8px 0 0', fontSize: '0.8rem', color: 'var(--muted)' }}>
          Targeting PhD Admissions in Robotics · Fall 2027
        </p>
      </div>
    </footer>
  );
};
