import React from 'react';

interface ContentListProps {
  interestsParagraph: string;
  collaborationInterests: string[];
}

export const ContentList: React.FC<ContentListProps> = ({
  interestsParagraph,
  collaborationInterests,
}) => {
  return (
    <section className="wrap" id="about-detailed">
      <h3>Current work and interests</h3>
      <p dangerouslySetInnerHTML={{ __html: interestsParagraph }} />
      <ul style={{ columns: 2, WebkitColumns: 2, MozColumns: 2, marginTop: '14px' }}>
        {collaborationInterests.map((item, index) => (
          <li key={index} style={{ marginBottom: '6px' }}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
};
