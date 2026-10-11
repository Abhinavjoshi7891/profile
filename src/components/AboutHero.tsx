import React from 'react';
import { SocialLink } from './SocialLink';

interface AboutHeroProps {
  name: string;
  tagline: string;
  bio: string;
  avatarSrc: string;
  resumeUrl: string;
  contacts: {
    email: string;
    github: string;
    linkedin: string;
    resume: string;
  };
}

export const AboutHero: React.FC<AboutHeroProps> = ({
  name,
  tagline,
  bio,
  avatarSrc,
  resumeUrl,
  contacts,
}) => {
  return (
    <section className="hero wrap" id="about" style={{ display: 'flex', alignItems: 'center', gap: '2em' }}>
      <div style={{ flex: 1 }}>
        <h2>Hi — I’m {name}</h2>
        <p className="tagline">{tagline}</p>
        <p>{bio}</p>

        <p className="contact-links" style={{ marginTop: '1.25em' }}>
          <a className="btn" href="#projects">
            See projects
          </a>
          <a className="btn ghost" href={resumeUrl} target="_blank" rel="noopener noreferrer">
            Download resume
          </a>
        </p>

        <p style={{ margin: '36px 0 10px 0', fontWeight: 600, letterSpacing: '0.2px' }}>
          Contacts and Links
        </p>
        <p style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <SocialLink type="email" href={`mailto:${contacts.email}`} title="Personal Email" />
          <SocialLink type="linkedin" href={contacts.linkedin} title="LinkedIn Profile" />
          <SocialLink type="github" href={contacts.github} title="GitHub Profile" />
          <SocialLink type="resume" href={contacts.resume} title="Download Résumé / CV (PDF)" />
        </p>
      </div>

      <img
        src={avatarSrc}
        alt={name}
        className="profile-pic"
        fetchPriority="high"
        decoding="async"
        style={{
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
        }}
      />
    </section>
  );
};
