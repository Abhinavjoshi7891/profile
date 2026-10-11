import React from 'react';
import type { PublicationItem } from '../types';

interface PublicationListProps {
  publications: PublicationItem[];
}

export const PublicationList: React.FC<PublicationListProps> = ({ publications }) => {
  return (
    <section className="wrap" id="patents-publications">
      <h3>Patents &amp; Publications</h3>
      <div className="grid">
        <div>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem' }}>
            {publications.map((pub) => (
              <li key={pub.id} style={{ marginBottom: '16px' }}>
                <strong>{pub.authors}</strong>, "{pub.title}" <em>{pub.venue}</em>
                {pub.year && ` (${pub.year})`}.
                {pub.links && pub.links.length > 0 && (
                  <>
                    <br />
                    {pub.links.map((link, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && <span> | </span>}
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.label}
                        </a>
                      </React.Fragment>
                    ))}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
