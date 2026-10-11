import React from 'react';
import type { NewsItem } from '../types';

interface NewsHighlightsProps {
  news: NewsItem[];
}

export const NewsHighlights: React.FC<NewsHighlightsProps> = ({ news }) => {
  const recentNews = news.slice(0, 5);
  const earlierNews = news.slice(5);

  const getTagClass = (type: string) => {
    switch (type) {
      case 'role':
        return 'tag-role';
      case 'paper':
        return 'tag-paper';
      case 'patent':
        return 'tag-patent';
      case 'research':
        return 'tag-research';
      case 'talk':
        return 'tag-talk';
      case 'award':
      default:
        return 'tag-award';
    }
  };

  const renderNewsItem = (item: NewsItem) => (
    <li className="news-item" key={item.id}>
      <div className="news-meta">
        <span className="news-date">{item.date}</span>
        <span className={`news-tag ${getTagClass(item.tag.type)}`}>
          {item.tag.label}
        </span>
      </div>
      <h4>
        {item.titleLink ? (
          <a href={item.titleLink} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
        ) : (
          item.title
        )}
      </h4>
      <p>
        {item.description}
        {item.paperLink && (
          <>
            {' '}
            <a href={item.paperLink.url} target="_blank" rel="noopener noreferrer">
              {item.paperLink.label}
            </a>
          </>
        )}
      </p>
    </li>
  );

  return (
    <section className="wrap section-alt" id="news-highlights" style={{ marginTop: '8px' }}>
      <h3>News &amp; Highlights</h3>
      <ol className="news">{recentNews.map(renderNewsItem)}</ol>

      {earlierNews.length > 0 && (
        <details className="news-more">
          <summary>
            <span className="news-more-show">Show earlier highlights</span>
            <span className="news-more-hide">Hide earlier highlights</span>
          </summary>
          <ol className="news news-earlier">{earlierNews.map(renderNewsItem)}</ol>
        </details>
      )}

      {/* Visual highlights figure strip */}
      <div className="news-figs">
        <figure>
          <img src="/assets/diagrams/go2_so101.svg" alt="Whole-Body Loco-Manipulation on Go2 + SO-101" loading="lazy" />
          <figcaption>Go2 + SO-101 Whole-Body Loco-Manipulation (18 DOF)</figcaption>
        </figure>
        <figure>
          <img src="/assets/diagrams/elexis_w.svg" alt="Learned Social Navigation for Elexis-W" loading="lazy" />
          <figcaption>Elexis-W Wheeled Humanoid Social Navigation (89.4% Arrival)</figcaption>
        </figure>
        <figure>
          <img src="/assets/diagrams/f1tenth.svg" alt="F1Tenth Autonomous Racing Stack" loading="lazy" />
          <figcaption>F1Tenth / RoboRacer ROS 2 Full Hardware Stack</figcaption>
        </figure>
      </div>
    </section>
  );
};
