import React from 'react';
import type { ProjectItem } from '../types';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenPoster?: (posterId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenPoster }) => {
  return (
    <article className="card project-card" id={`project-${project.id}`}>
      {/* Media column / preview */}
      <div className="project-media">
        <div className="media-wrapper">
          {project.mediaType === 'video' ? (
            <video autoPlay loop muted playsInline>
              <source src={project.mediaSrc} type="video/webm" />
              <img src={project.mediaSrc} alt={project.title} loading="lazy" />
            </video>
          ) : (
            <img src={project.mediaSrc} alt={project.title} loading="lazy" />
          )}

          {/* Media hover overlay */}
          <div className="media-overlay">
            {project.posterId && onOpenPoster ? (
              <button
                type="button"
                className="overlay-link-btn"
                onClick={() => onOpenPoster(project.posterId!)}
              >
                View Scientific Poster →
              </button>
            ) : project.links.length > 0 ? (
              <a
                href={project.links[0].url}
                target={project.links[0].isExternal ? '_blank' : undefined}
                rel={project.links[0].isExternal ? 'noopener noreferrer' : undefined}
                className="overlay-link"
              >
                {project.links[0].label}
              </a>
            ) : (
              <span className="overlay-link">Project Details</span>
            )}
          </div>
        </div>
      </div>

      {/* Description / Content column */}
      <div className="project-body">
        <h4>{project.title}</h4>

        {/* Colored tag chips */}
        <div className="project-tags">
          {project.tags.map((tag, idx) => (
            <span key={idx} className={`chip chip-${tag.color}`}>
              {tag.text}
            </span>
          ))}
        </div>

        <p style={{ marginTop: '10px' }}>{project.summary}</p>

        {/* Action links */}
        <div className="project-links-row">
          {project.links.map((link, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="link-sep"> | </span>}
              <a
                href={link.url}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            </React.Fragment>
          ))}

          {project.posterId && onOpenPoster && (
            <>
              {project.links.length > 0 && <span className="link-sep"> | </span>}
              <button
                type="button"
                className="inline-poster-btn"
                onClick={() => onOpenPoster(project.posterId!)}
              >
                View Scientific Poster →
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
};
