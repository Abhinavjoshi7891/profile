import React from 'react';

interface AwardItem {
  title: string;
  description: string;
}

interface AwardsProps {
  awards: AwardItem[];
}

export const Awards: React.FC<AwardsProps> = ({ awards }) => {
  return (
    <section className="wrap section-alt" id="awards">
      <h3>Awards &amp; Acknowledgements</h3>
      <ul style={{ marginTop: '14px', paddingLeft: '1.25rem', listStyle: 'disc' }}>
        {awards.map((award, index) => (
          <li key={index} style={{ marginBottom: '12px' }}>
            <strong>{award.title}: </strong>
            <span>{award.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
