import React, { useRef, useState, useEffect } from 'react';
import type { GalleryItem } from '../types';

interface PhotoGalleryProps {
  gallery: GalleryItem[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ gallery }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScrollState = () => {
    if (!scrollerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Approximate active index based on scroll position
    const cardWidth = 320; // approximate width of item + gap
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), gallery.length - 1));
  };

  useEffect(() => {
    checkScrollState();
    const scroller = scrollerRef.current;
    if (scroller) {
      scroller.addEventListener('scroll', checkScrollState, { passive: true });
      window.addEventListener('resize', checkScrollState);
    }
    return () => {
      if (scroller) {
        scroller.removeEventListener('scroll', checkScrollState);
      }
      window.removeEventListener('resize', checkScrollState);
    };
  }, [gallery.length]);

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!scrollerRef.current) return;
    const cardWidth = 340;
    const offset = direction === 'left' ? -cardWidth : cardWidth;
    scrollerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    if (!scrollerRef.current) return;
    const cardWidth = 340;
    scrollerRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  };

  return (
    <section className="wrap" id="gallery" style={{ marginTop: '48px' }}>
      <div className="carousel-header">
        <div className="carousel-title-group">
          <h3>Photo &amp; Project Gallery</h3>
          <p className="gallery-hint" style={{ margin: '4px 0 0' }}>
            Interactive showcase of simulation models, hardware platforms, and research architectures
          </p>
        </div>

        {/* Carousel Navigation Buttons in Header */}
        <div className="carousel-nav-controls">
          <button
            type="button"
            className={`carousel-arrow-btn ${!canScrollLeft ? 'disabled' : ''}`}
            onClick={() => scrollByAmount('left')}
            disabled={!canScrollLeft}
            aria-label="Previous item"
            title="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className={`carousel-arrow-btn ${!canScrollRight ? 'disabled' : ''}`}
            onClick={() => scrollByAmount('right')}
            disabled={!canScrollRight}
            aria-label="Next item"
            title="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="carousel-viewport-wrapper">
        {/* Floating Side Button - Left */}
        {canScrollLeft && (
          <button
            type="button"
            className="carousel-floating-btn left"
            onClick={() => scrollByAmount('left')}
            aria-label="Scroll left"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Floating Side Button - Right */}
        {canScrollRight && (
          <button
            type="button"
            className="carousel-floating-btn right"
            onClick={() => scrollByAmount('right')}
            aria-label="Scroll right"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}

        {/* Scroller Track */}
        <div className="carousel-track" ref={scrollerRef}>
          {gallery.map((item, idx) => (
            <div className="carousel-card card" key={item.id}>
              <div className="carousel-image-container">
                <img src={item.imgSrc} alt={item.alt} loading="lazy" />
                <span className="carousel-index-badge">{idx + 1} / {gallery.length}</span>
              </div>
              <p className="carousel-caption">{item.caption}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dot Indicators */}
      <div className="carousel-dots">
        {gallery.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => scrollToIndex(index)}
            aria-label={`Jump to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
