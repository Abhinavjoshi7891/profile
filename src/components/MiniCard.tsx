import React from 'react';
import type { MiniProjectItem } from '../types';

interface MiniCardProps {
  item: MiniProjectItem;
  onOpenPoster?: (posterId: string) => void;
  isHardware?: boolean;
}

export const MiniCard: React.FC<MiniCardProps> = ({ item, onOpenPoster, isHardware = false }) => {
  const getPosterId = () => {
    if (item.id === 'forklift-vla') return 'vla-forklift';
    if (item.id === 'hccepose-pallet') return 'hccepose';
    return null;
  };

  const posterId = getPosterId();

  if (isHardware) {
    return (
      <article className="card hw-card" id={`hw-${item.id}`}>
        <div className="hw-media">
          <img src={item.mediaSrc} alt={item.title} loading="lazy" />
        </div>
        <div className="hw-body">
          <h4>{item.title}</h4>
          {item.tags && item.tags.length > 0 && (
            <div className="project-tags" style={{ marginBottom: '8px' }}>
              {item.tags.map((tag, idx) => (
                <span key={idx} className={`chip chip-${tag.color}`}>
                  {tag.text}
                </span>
              ))}
            </div>
          )}
          <p>{item.description}</p>
          <p className="hw-links">
            {item.links &&
              item.links.map((link, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="link-sep"> | </span>}
                  <a href={link.url}>{link.label}</a>
                </React.Fragment>
              ))}
            {posterId && onOpenPoster && (
              <>
                {item.links && item.links.length > 0 && <span className="link-sep"> | </span>}
                <button
                  type="button"
                  className="inline-poster-btn"
                  onClick={() => onOpenPoster(posterId)}
                >
                  View Scientific Poster →
                </button>
              </>
            )}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="card mini-card" id={`mini-${item.id}`}>
      <div className="mini-media-wrapper">
        <img src={item.mediaSrc} alt={item.title} loading="lazy" />
      </div>
      <h5>{item.title}</h5>
      {item.tags && item.tags.length > 0 && (
        <div className="project-tags" style={{ justifyContent: 'center', marginBottom: '8px' }}>
          {item.tags.map((tag, idx) => (
            <span key={idx} className={`chip chip-${tag.color}`}>
              {tag.text}
            </span>
          ))}
        </div>
      )}
      <p>{item.description}</p>
      {item.links && item.links.length > 0 && (
        <p className="mini-links">
          {item.links.map((link, idx) => (
            <a key={idx} href={link.url}>
              {link.label}
            </a>
          ))}
        </p>
      )}
    </article>
  );
};
