import React from 'react';
import './SleepingArrangements.css';

export default function SleepingArrangements({ sleepingArrangements, onOpenPhotos }) {
  return (
    <div className="sleeping-arrangements-section">
      <h2 className="section-title">Where you'll sleep</h2>

      <div className="sleeping-cards-grid">
        {sleepingArrangements.map((item, index) => (
          <div
            key={index}
            className="sleeping-card"
            onClick={() => onOpenPhotos(index === 0 ? 3 : 5)}
            role="button"
            tabIndex={0}
          >
            <div className="sleeping-card-img-wrapper">
              <img src={item.image} alt={item.room} className="sleeping-card-img" />
            </div>
            <div className="sleeping-card-content">
              <h3 className="sleeping-room-name">{item.room}</h3>
              <p className="sleeping-bed-type">{item.beds}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
