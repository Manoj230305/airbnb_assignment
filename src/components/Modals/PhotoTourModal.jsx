import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Share, Heart, Grid, X } from 'lucide-react';
import { photoTourCategories, allTourPhotos } from '../../data/photoTourData';
import './PhotoTourModal.css';

export default function PhotoTourModal({ initialSectionId = 'living1', onClose, onShare }) {
  const scrollBodyRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Sync URL query param ?modal=PHOTO_TOUR_SCROLLABLE
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('modal', 'PHOTO_TOUR_SCROLLABLE');
    window.history.pushState({ modal: 'PHOTO_TOUR_SCROLLABLE' }, '', url.toString());

    const handlePopState = () => {
      if (lightboxIndex !== null) {
        setLightboxIndex(null);
      } else {
        onClose && onClose();
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Prevent background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = originalOverflow;

      // Clean up URL if closing
      if (window.location.search.includes('modal=PHOTO_TOUR_SCROLLABLE')) {
        const cleanUrl = new URL(window.location.href);
        cleanUrl.searchParams.delete('modal');
        window.history.replaceState(null, '', cleanUrl.pathname + (cleanUrl.search ? cleanUrl.search : ''));
      }
    };
  }, [onClose, lightboxIndex]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex !== null) {
        if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) => (prev > 0 ? prev - 1 : allTourPhotos.length - 1));
        } else if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev < allTourPhotos.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'Escape') {
          setLightboxIndex(null);
        }
      } else if (e.key === 'Escape') {
        onClose && onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, onClose]);

  // Scroll to requested section on mount
  useEffect(() => {
    if (initialSectionId && scrollBodyRef.current) {
      const timer = setTimeout(() => {
        const targetEl = document.getElementById(`tour-section-${initialSectionId}`);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [initialSectionId]);

  const handleScrollToCategory = (catId) => {
    const targetEl = document.getElementById(`tour-section-${catId}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenPhoto = (url) => {
    const idx = allTourPhotos.findIndex((p) => p.url === url);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  // Helper to render alternating photo layout
  const renderPhotos = (photos) => {
    if (photos.length === 1) {
      return (
        <div
          className="tour-photo-row-single"
          onClick={() => handleOpenPhoto(photos[0].url)}
          role="button"
          tabIndex={0}
        >
          <img src={photos[0].url} alt={photos[0].caption} className="tour-single-img" loading="lazy" />
        </div>
      );
    }

    if (photos.length === 2) {
      return (
        <div className="tour-photo-row-double">
          <div
            className="tour-double-item"
            onClick={() => handleOpenPhoto(photos[0].url)}
            role="button"
            tabIndex={0}
          >
            <img src={photos[0].url} alt={photos[0].caption} className="tour-double-img" loading="lazy" />
          </div>
          <div
            className="tour-double-item"
            onClick={() => handleOpenPhoto(photos[1].url)}
            role="button"
            tabIndex={0}
          >
            <img src={photos[1].url} alt={photos[1].caption} className="tour-double-img" loading="lazy" />
          </div>
        </div>
      );
    }

    const rows = [];
    let i = 0;
    let isSingle = true;

    while (i < photos.length) {
      const remaining = photos.length - i;
      if (remaining === 1 || (isSingle && remaining !== 2)) {
        const p = photos[i];
        rows.push(
          <div
            key={`single-${i}`}
            className="tour-photo-row-single"
            onClick={() => handleOpenPhoto(p.url)}
            role="button"
            tabIndex={0}
          >
            <img src={p.url} alt={p.caption} className="tour-single-img" loading="lazy" />
          </div>
        );
        i += 1;
        isSingle = false;
      } else {
        const p1 = photos[i];
        const p2 = photos[i + 1];
        rows.push(
          <div key={`double-${i}`} className="tour-photo-row-double">
            <div
              className="tour-double-item"
              onClick={() => handleOpenPhoto(p1.url)}
              role="button"
              tabIndex={0}
            >
              <img src={p1.url} alt={p1.caption} className="tour-double-img" loading="lazy" />
            </div>
            {p2 && (
              <div
                className="tour-double-item"
                onClick={() => handleOpenPhoto(p2.url)}
                role="button"
                tabIndex={0}
              >
                <img src={p2.url} alt={p2.caption} className="tour-double-img" loading="lazy" />
              </div>
            )}
          </div>
        );
        i += 2;
        isSingle = true;
      }
    }

    return rows;
  };

  return (
    <div className="photo-tour-modal" role="dialog" aria-modal="true" aria-label="Photo tour">
      {/* Sticky Header */}
      <header className="photo-tour-header">
        <button className="photo-tour-back-btn" onClick={onClose} aria-label="Back to listing">
          <ChevronLeft size={24} strokeWidth={2.4} />
        </button>

        <h1 className="photo-tour-header-title">Photo tour</h1>

        <div className="photo-tour-header-actions">
          <button className="photo-tour-action-btn" onClick={onShare}>
            <Share size={16} strokeWidth={2} />
            <span>Share</span>
          </button>
          <button className="photo-tour-action-btn">
            <Heart size={16} strokeWidth={2} />
            <span>Save</span>
          </button>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <div className="photo-tour-scroll-body" ref={scrollBodyRef}>
        <div className="photo-tour-container">
          {/* Top Category Thumbnail Navigation Grid */}
          <nav className="photo-tour-nav-grid" aria-label="Tour sections">
            {photoTourCategories.map((cat) => (
              <button
                key={cat.id}
                className="photo-tour-nav-card"
                onClick={() => handleScrollToCategory(cat.id)}
                title={`Jump to ${cat.title}`}
              >
                <div className="photo-tour-nav-thumb-wrap">
                  <img src={cat.coverImage} alt={cat.title} className="photo-tour-nav-thumb" />
                </div>
                <span className="photo-tour-nav-title">{cat.title}</span>
              </button>
            ))}
          </nav>

          {/* Categories Photo Sections */}
          {photoTourCategories.map((cat) => (
            <section
              key={cat.id}
              id={`tour-section-${cat.id}`}
              className="tour-category-section"
            >
              {/* Left Column: Title & Amenities */}
              <div className="tour-left-col">
                <h2 className="tour-section-heading">{cat.title}</h2>
                <p className="tour-section-amenities">{cat.amenities}</p>
              </div>

              {/* Right Column: Photos Grid */}
              <div className="tour-right-col">
                {renderPhotos(cat.photos)}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Fullscreen Photo Gallery Lightbox Viewer */}
      {lightboxIndex !== null && (
        <div className="photo-lightbox-overlay" role="dialog" aria-modal="true" aria-label="Photo viewer">
          {/* Lightbox Header */}
          <header className="photo-lightbox-header">
            <button
              className="photo-lightbox-grid-btn"
              onClick={() => setLightboxIndex(null)}
              aria-label="Back to photo tour grid"
              title="Back to photo tour"
            >
              <Grid size={20} strokeWidth={2.4} />
            </button>

            <span className="photo-lightbox-title">
              {allTourPhotos[lightboxIndex]?.categoryTitle || 'Photo tour'}
            </span>

            <div className="photo-lightbox-right-controls">
              <span className="photo-lightbox-counter">
                {lightboxIndex + 1} of {allTourPhotos.length}
              </span>
              <button
                className="photo-lightbox-close-btn"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close photo viewer"
              >
                <X size={22} strokeWidth={2.2} />
              </button>
            </div>
          </header>

          {/* Lightbox Body with Prev/Next and Large Image */}
          <div className="photo-lightbox-body">
            <button
              className="photo-lightbox-nav-btn prev"
              onClick={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : allTourPhotos.length - 1))}
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} strokeWidth={2.4} />
            </button>

            <div className="photo-lightbox-image-container">
              <img
                src={allTourPhotos[lightboxIndex]?.url}
                alt={allTourPhotos[lightboxIndex]?.caption || ''}
                className="photo-lightbox-img"
              />
            </div>

            <button
              className="photo-lightbox-nav-btn next"
              onClick={() => setLightboxIndex((prev) => (prev < allTourPhotos.length - 1 ? prev + 1 : 0))}
              aria-label="Next photo"
            >
              <ChevronRight size={22} strokeWidth={2.4} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
