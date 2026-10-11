import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div>
        <span className="footer-name">Abhinav Joshi</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
      <p>
        Engineered with intent. Built with code.<br />
        Operating under bounded sub-20ms real-time constraints.
      </p>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
};
