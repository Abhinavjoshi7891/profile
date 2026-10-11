import React, { useState, useEffect, useRef } from 'react';

export interface JourneyMilestone {
  id: string;
  institution: string;
  role: string;
  period: string;
  isLive?: boolean;
  category: string;
  logoSrc: string;
  description: string;
  tags: string[];
}

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'kendriya-vidyalaya',
    institution: 'Kendriya Vidyalaya',
    role: 'Senior Secondary (Science & Mathematics)',
    period: 'Foundations',
    category: 'FOUNDATION',
    logoSrc: '/assets/journey/KV_logo.png',
    description: 'Built core foundations in analytical mathematics, physics, and computational thinking, setting the trajectory toward mechatronics and dynamic control systems.',
    tags: ['Physics', 'Mathematics', 'Analytical Problem Solving'],
  },
  {
    id: 'ggsipu',
    institution: 'GGSIP University, New Delhi',
    role: 'B.Tech in Instrumentation & Control Engineering',
    period: 'Undergraduate',
    category: 'BACHELOR OF TECH',
    logoSrc: '/assets/journey/GGSIPU.jpeg',
    description: 'Undergraduate engineering training in classical feedback control, microcontrollers, signal processing, state estimation, and sensor instrumentation.',
    tags: ['Control Theory', 'Signals & Systems', 'Instrumentation', 'Microcontrollers'],
  },
  {
    id: 'areva',
    institution: 'AREVA T&D (now GE Grid Solutions)',
    role: 'SCADA & Automation Engineer',
    period: '2010.08 — 2015.05',
    category: 'INDUSTRIAL AUTOMATION',
    logoSrc: '/assets/journey/Areva.png',
    description: 'Engineered real-time telemetry, automated fault detection, and mission-critical SCADA protocols for high-voltage power transmission substations under strict utility reliability standards.',
    tags: ['SCADA', 'Real-Time Telemetry', 'Protocols', 'Grid Automation'],
  },
  {
    id: 'union-bank',
    institution: 'Union Bank of India',
    role: 'Operations & Enterprise Systems Officer',
    period: 'Financial Systems',
    category: 'ENTERPRISE OPERATIONS',
    logoSrc: '/assets/journey/Union Bank.jpeg',
    description: 'Managed enterprise IT infrastructure, high-integrity financial transaction workflows, and database operations under rigorous institutional security protocols.',
    tags: ['Enterprise IT', 'Data Integrity', 'Systems Architecture', 'Operations'],
  },
  {
    id: 'epi-engineering',
    institution: 'EPI Engineering & Projects India',
    role: 'Director — Manufacturing & Operations',
    period: '2015.01 — PRESENT',
    isLive: true,
    category: 'LEADERSHIP & MECHATRONICS',
    logoSrc: '/assets/journey/EPI.jpeg',
    description: 'Lead electro-mechanical manufacturing supplying Tier-1 clients including Siemens, Airtel, and L&T from design to production; pioneering strategic transition into applied educational robotics.',
    tags: ['Manufacturing', 'Operations', 'Mechatronics', 'Tier-1 Supply'],
  },
  {
    id: 'iiit-bangalore',
    institution: 'IIIT Bangalore',
    role: 'Post Graduate Studies in Data Science & ML',
    period: 'Advanced Specialization',
    category: 'DATA SCIENCE & STATS',
    logoSrc: '/assets/journey/IIITB-logo.jpg',
    description: 'Advanced coursework in probabilistic modeling, machine learning algorithms, multivariate statistical analysis, and high-performance computing pipelines.',
    tags: ['Machine Learning', 'Probabilistic Modeling', 'Statistics', 'Optimization'],
  },
  {
    id: 'ljmu',
    institution: 'Liverpool John Moores University (UK)',
    role: 'M.Sc. in Machine Learning & Artificial Intelligence',
    period: '2021 — 2023',
    category: "MASTER'S DEGREE",
    logoSrc: '/assets/journey/LJMU.png',
    description: 'Graduated with high distinction researching deep representation learning, computer vision, deep reinforcement learning, and autonomous decision-making agents.',
    tags: ['Deep Learning', 'Computer Vision', 'Deep RL', 'Representation Learning'],
  },
  {
    id: 'iit-delhi',
    institution: 'RISE Lab, IIT Delhi',
    role: 'Robotics Engineer & AI Researcher (Rank #1)',
    period: '2025.11 — PRESENT',
    isLive: true,
    category: 'ROBOTICS & EMBODIED AI',
    logoSrc: '/assets/journey/IITD.png',
    description: 'Rank #1 Top Performer in IIT Delhi Executive Robotics. Deployed 50 Hz acados SQP dynamic MPC on physical F1Tenth racer and developed sonomyography neural intent decoding for SO-101 robotic arm.',
    tags: ['acados MPC', 'ROS 2', 'Jetson Orin', 'Sonomyography', 'SO-101'],
  },
  {
    id: 'addverb',
    institution: 'Addverb Technologies',
    role: 'Robotics Intern — Mobile & Advanced Robotics',
    period: '2026.07 — PRESENT',
    isLive: true,
    category: 'ADVANCED ROBOTICS & HUMANOIDS',
    logoSrc: '/assets/journey/Addverb.png',
    description: 'Trained learned social navigation policies for Elexis-W (India’s first wheeled humanoid, 133 kg) in Isaac Lab. Solved monocular 6D pallet pose (HCCEPose) and collapsed AMR control latency to < 20 ms via CiA 402 CAN bus.',
    tags: ['Wheeled Humanoids', 'Isaac Lab', 'Social Navigation', 'HCCEPose', 'CAN CiA 402'],
  },
];

interface JourneyCarouselProps {
  onShowToast?: (msg: string) => void;
}

export const JourneyCarousel: React.FC<JourneyCarouselProps> = ({ onShowToast }) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [cardsVisible, setCardsVisible] = useState(4);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const totalCount = JOURNEY_MILESTONES.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsVisible(1);
      } else if (window.innerWidth < 960) {
        setCardsVisible(2);
      } else if (window.innerWidth < 1280) {
        setCardsVisible(3);
      } else {
        setCardsVisible(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev <= 0 ? totalCount - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % totalCount);
  };

  const goToSlide = (idx: number) => {
    setCarouselIndex(idx % totalCount);
  };

  useEffect(() => {
    if (isCarouselPaused) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % totalCount);
    }, 5000);
    return () => clearInterval(timer);
  }, [isCarouselPaused, totalCount]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (deltaX > 40) {
      prevSlide();
    } else if (deltaX < -40) {
      nextSlide();
    }
    touchStartXRef.current = null;
  };

  const activeDisplayIdx = hoveredCardIdx !== null ? (hoveredCardIdx % totalCount) : carouselIndex;

  return (
    <section id="journey" className="journey-section section-shell">
      <div className="section-heading journey-heading">
        <div>
          <p className="section-kicker">08 / EVOLUTION &amp; MILESTONES</p>
          <h2>
            My <em>Journey.</em>
          </h2>
          <p className="section-note">
            From foundational science and heavy industry automation to M.Sc. machine learning,
            IIT Delhi research, and deployed humanoid robotics at Addverb.
          </p>
        </div>

        <div className="carousel-controls-toolbar">
          <div className="carousel-counter journey-counter">
            <span className="counter-current">{String(activeDisplayIdx + 1).padStart(2, '0')}</span>
            <span className="counter-sep">/</span>
            <span className="counter-total">{String(totalCount).padStart(2, '0')}</span>
          </div>
          <div className="carousel-nav-buttons">
            <button
              type="button"
              className="carousel-btn prev-btn"
              onClick={prevSlide}
              aria-label="Previous journey slide"
              title="Previous milestone"
            >
              ← PREV
            </button>
            <button
              type="button"
              className="carousel-btn next-btn"
              onClick={nextSlide}
              aria-label="Next journey slide"
              title="Next milestone"
            >
              NEXT →
            </button>
          </div>
        </div>
      </div>

      {/* Journey Carousel Viewport */}
      <div
        className="carousel-viewport journey-viewport"
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => {
          setIsCarouselPaused(false);
          setHoveredCardIdx(null);
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        tabIndex={0}
        role="region"
        aria-label="Career and academic journey milestones carousel"
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') prevSlide();
          if (e.key === 'ArrowRight') nextSlide();
        }}
      >
        <div
          className="carousel-track journey-track"
          style={{
            transform: `translateX(-${carouselIndex * (100 / cardsVisible)}%)`,
          }}
        >
          {[...JOURNEY_MILESTONES, ...JOURNEY_MILESTONES.slice(0, 4)].map((milestone, idx) => {
            const isSelected = hoveredCardIdx !== null
              ? hoveredCardIdx === idx
              : (idx === carouselIndex);

            return (
              <div
                key={`${milestone.id}-${idx}`}
                className={`carousel-card-wrap journey-card-wrap ${isSelected ? 'has-popped' : ''}`}
                style={{
                  flex: `0 0 ${100 / cardsVisible}%`,
                  maxWidth: `${100 / cardsVisible}%`,
                }}
                onMouseEnter={() => setHoveredCardIdx(idx)}
                onMouseLeave={() => setHoveredCardIdx(null)}
                onClick={() => {
                  onShowToast?.(`📍 ${milestone.institution} // ${milestone.role}`);
                }}
              >
                <article className={`journey-card ${isSelected ? 'is-popped' : ''}`}>
                  {/* Top Header Pill with Era & Category */}
                  <div className="journey-card-header">
                    <span className="journey-card-category">{milestone.category}</span>
                    <span className="journey-card-period">
                      {milestone.isLive && <span className="journey-live-dot" />}
                      {milestone.period}
                    </span>
                  </div>

                  {/* Logo Display Box with Clean Contrast Container */}
                  <div className="journey-logo-box">
                    <img
                      src={milestone.logoSrc}
                      alt={`${milestone.institution} logo`}
                      className="journey-logo-img"
                      loading="lazy"
                    />
                  </div>

                  {/* Content: Institution & Role */}
                  <div className="journey-card-content">
                    <span className="journey-institution">{milestone.institution}</span>
                    <h4 className="journey-role">{milestone.role}</h4>
                    <p className="journey-description">{milestone.description}</p>
                  </div>

                  {/* Footer Tags */}
                  <div className="journey-tags">
                    {milestone.tags.map((tag) => (
                      <span key={tag} className="journey-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Number Badge Index */}
                  <span className="journey-index-num">
                    {String((idx % totalCount) + 1).padStart(2, '0')}
                  </span>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      {/* Carousel Indicators / Navigation Dots */}
      <div className="carousel-indicators-bar journey-indicators-bar">
        {JOURNEY_MILESTONES.map((milestone, idx) => (
          <button
            key={milestone.id}
            type="button"
            className={`carousel-indicator-dot journey-indicator-dot ${idx === activeDisplayIdx ? 'is-active' : ''}`}
            onClick={() => goToSlide(idx)}
            aria-label={`Jump to milestone ${idx + 1}: ${milestone.institution}`}
            title={`Milestone ${idx + 1}: ${milestone.institution}`}
          />
        ))}
      </div>
    </section>
  );
};

export default JourneyCarousel;
