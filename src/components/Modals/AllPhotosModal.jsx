import React from 'react';
import { X, Share, Heart } from 'lucide-react';
import './Modals.css';

export default function AllPhotosModal({ photos, initialIndex = 0, onClose, onShare }) {
  return (
    <div className="fullscreen-photo-modal" onClick={onClose}>
      <div className="photo-modal-header" onClick={(e) => e.stopPropagation()}>
        <button className="photo-modal-close-btn" onClick={onClose} aria-label="Close photos">
          <X size={20} />
        </button>

        <div className="photo-modal-top-actions">
          <button className="action-btn" onClick={onShare}>
            <Share size={16} />
            <span>Share</span>
          </button>
          <button className="action-btn">
            <Heart size={16} />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className="photo-modal-scroll-area" onClick={(e) => e.stopPropagation()}>
        <div className="photo-gallery-list">
          {photos.map((item, idx) => (
            <div key={idx} className="photo-gallery-item">
              <img src={item.url} alt={item.title} className="full-gallery-img" />
              <p className="photo-caption-text">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
