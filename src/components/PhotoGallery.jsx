import React from 'react';
import { Grid } from 'lucide-react';
import './PhotoGallery.css';

export default function PhotoGallery({ images, onOpenAllPhotos }) {
  return (
    <section id="photos" className="photo-gallery-section page-container">
      <div className="gallery-grid">
        {/* Main large photo */}
        <div
          className="gallery-item main-item"
          onClick={() => onOpenAllPhotos(0)}
          role="button"
          tabIndex={0}
        >
          <img
            src={images.heroMain}
            alt="Romantic Jacuzzi patio"
            className="gallery-img"
            loading="eager"
          />
          <div className="img-overlay" />
        </div>

        {/* Right 2x2 Sub-grid */}
        <div className="gallery-sub-grid">
          <div
            className="gallery-item sub-item"
            onClick={() => onOpenAllPhotos(1)}
            role="button"
            tabIndex={0}
          >
            <img
              src={images.hero2}
              alt="Wooden deck Jacuzzi"
              className="gallery-img"
            />
            <div className="img-overlay" />
          </div>

          <div
            className="gallery-item sub-item top-right"
            onClick={() => onOpenAllPhotos(2)}
            role="button"
            tabIndex={0}
          >
            <img
              src={images.hero3}
              alt="Amor de Goa building exterior"
              className="gallery-img"
            />
            <div className="img-overlay" />
          </div>

          <div
            className="gallery-item sub-item"
            onClick={() => onOpenAllPhotos(3)}
            role="button"
            tabIndex={0}
          >
            <img
              src={images.hero4}
              alt="Cozy bedroom with double bed"
              className="gallery-img"
            />
            <div className="img-overlay" />
          </div>

          <div
            className="gallery-item sub-item bottom-right"
            onClick={() => onOpenAllPhotos(4)}
            role="button"
            tabIndex={0}
          >
            <img
              src={images.hero5}
              alt="Double-height patio space"
              className="gallery-img"
            />
            <div className="img-overlay" />

            <button
              className="show-all-photos-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenAllPhotos(0);
              }}
            >
              <Grid size={16} strokeWidth={2.4} />
              <span>Show all photos</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
