import React from 'react';
import { Grid } from 'lucide-react';
import './PhotoGallery.css';

export default function PhotoGallery({ images, onOpenAllPhotos }) {
  return (
    <section id="photos" className="photo-gallery-section page-container">
      <div className="gallery-grid">
        {/* Main large photo (Left 50%) */}
        <div
          className="gallery-item main-item"
          onClick={() => onOpenAllPhotos('living2')}
          role="button"
          tabIndex={0}
        >
          <img
            src={images.heroMain}
            alt="Romantic Jacuzzi patio verandah"
            className="gallery-img"
            loading="eager"
          />
          <div className="img-overlay" />
        </div>

        {/* Middle column (25%) */}
        <div className="gallery-col mid-col">
          <div
            className="gallery-item mid-top"
            onClick={() => onOpenAllPhotos('living2')}
            role="button"
            tabIndex={0}
          >
            <img
              src={images.hero2}
              alt="Outdoor lounge seating"
              className="gallery-img"
            />
            <div className="img-overlay" />
          </div>

          <div
            className="gallery-item mid-bottom"
            onClick={() => onOpenAllPhotos('bedroom')}
            role="button"
            tabIndex={0}
          >
            <img
              src={images.hero3}
              alt="Master bedroom with plush bed"
              className="gallery-img"
            />
            <div className="img-overlay" />
          </div>
        </div>

        {/* Right column (25%) */}
        <div className="gallery-col right-col">
          <div
            className="gallery-item right-top"
            onClick={() => onOpenAllPhotos('living2')}
            role="button"
            tabIndex={0}
          >
            <img
              src={images.hero4}
              alt="Wooden deck Jacuzzi"
              className="gallery-img"
            />
            <div className="img-overlay" />
          </div>

          <div
            className="gallery-item right-bottom"
            onClick={() => onOpenAllPhotos('exterior')}
            role="button"
            tabIndex={0}
          >
            <img
              src={images.hero5}
              alt="Amor de Goa building exterior"
              className="gallery-img"
            />
            <div className="img-overlay" />

            <button
              className="show-all-photos-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenAllPhotos('living1');
              }}
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
                <circle cx="2.5" cy="2.5" r="1.5" />
                <circle cx="8" cy="2.5" r="1.5" />
                <circle cx="13.5" cy="2.5" r="1.5" />
                <circle cx="2.5" cy="8" r="1.5" />
                <circle cx="8" cy="8" r="1.5" />
                <circle cx="13.5" cy="8" r="1.5" />
                <circle cx="2.5" cy="13.5" r="1.5" />
                <circle cx="8" cy="13.5" r="1.5" />
                <circle cx="13.5" cy="13.5" r="1.5" />
              </svg>
              <span>Show all photos</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
