import React from 'react';
import type { ExperienceItem } from '../types';

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  return (
    <section className="wrap section-alt" id="work-experience">
      <h3>Work Experience</h3>
      <div className="timeline">
        {experiences.map((exp) => (
          <article className="exp exp--nologo" key={exp.id}>
            <div className="exp-body">
              <div className="exp-head">
                <h4>{exp.role}</h4>
                <span className="exp-date">{exp.period}</span>
              </div>
              <p className="exp-org">
                {exp.companyUrl ? (
                  <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer">
                    {exp.company}
                  </a>
                ) : (
                  exp.company
                )}
              </p>
              <ul>
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} dangerouslySetInnerHTML={{ __html: bullet }} />
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
