import React from 'react';
import type { EducationItem } from '../types';

interface EducationProps {
  educationList: EducationItem[];
}

export const Education: React.FC<EducationProps> = ({ educationList }) => {
  return (
    <section className="wrap" id="education">
      <h3>Education</h3>
      <div className="timeline">
        {educationList.map((edu) => (
          <article className="exp exp--nologo" key={edu.id}>
            <div className="exp-body">
              <div className="exp-head">
                <h4>{edu.degree}</h4>
                <span className="exp-date">{edu.period}</span>
              </div>
              <p className="exp-org">
                {edu.institutionUrl ? (
                  <a href={edu.institutionUrl} target="_blank" rel="noopener noreferrer">
                    {edu.institution}
                  </a>
                ) : (
                  edu.institution
                )}
              </p>
              <ul>
                {edu.details.map((detail, idx) => (
                  <li key={idx} dangerouslySetInnerHTML={{ __html: detail }} />
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
