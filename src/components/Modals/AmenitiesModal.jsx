import React from 'react';
import { X, Check } from 'lucide-react';
import './Modals.css';

export default function AmenitiesModal({ allAmenitiesList, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content amenities-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>What this place offers</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close amenities">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body amenities-modal-body">
          {allAmenitiesList.map((cat, idx) => (
            <div key={idx} className="amenity-category-block">
              <h4 className="amenity-cat-title">{cat.category}</h4>
              <ul className="amenity-cat-list">
                {cat.items.map((item, i) => (
                  <li key={i} className="amenity-cat-item">
                    <Check size={18} className="amenity-check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {idx < allAmenitiesList.length - 1 && <div className="divider" style={{ margin: '20px 0' }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
