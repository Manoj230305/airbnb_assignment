import React from 'react';
import bedroomImg from '../assets/bedroom.jpeg';
import livingImg from '../assets/livingroom.jpeg';
import './SleepingArrangements.css';

export default function SleepingArrangements({ sleepingArrangements, onOpenPhotos }) {
  const items = [
    {
      room: "Bedroom",
      beds: "1 double bed",
      image: bedroomImg
    },
    {
      room: "Living room",
      beds: "1 sofa",
      image: livingImg
    }
  ];

  return (
    <div className="sleeping-arrangements-section">
      <h2 className="sleeping-section-title">Where you'll sleep</h2>

      <div className="sleeping-cards-grid">
        {items.map((item, index) => (
          <div
            key={index}
            className="sleeping-card"
            onClick={() => onOpenPhotos && onOpenPhotos(index === 0 ? 'bedroom' : 'living1')}
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
