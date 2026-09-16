import React from 'react';
import {
  UtensilsCrossed,
  Wifi,
  Laptop,
  Car,
  Waves,
  Bath,
  Dog,
  Cctv,
  BellOff
} from 'lucide-react';
import './Amenities.css';

export default function Amenities({ amenities, onShowAllAmenities }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Utensils':
        return <UtensilsCrossed size={24} strokeWidth={1.7} />;
      case 'Wifi':
        return <Wifi size={24} strokeWidth={1.7} />;
      case 'Laptop':
        return <Laptop size={24} strokeWidth={1.7} />;
      case 'Car':
        return <Car size={24} strokeWidth={1.7} />;
      case 'Waves':
        return <Waves size={24} strokeWidth={1.7} />;
      case 'Bath':
        return <Bath size={24} strokeWidth={1.7} />;
      case 'Dog':
        return <Dog size={24} strokeWidth={1.7} />;
      case 'Cctv':
        return <Cctv size={24} strokeWidth={1.7} />;
      case 'BellOff':
      default:
        return <BellOff size={24} strokeWidth={1.7} />;
    }
  };

  return (
    <section id="amenities" className="amenities-section">
      <h2 className="section-title">What this place offers</h2>

      <div className="amenities-grid">
        {amenities.map((item, index) => (
          <div key={index} className="amenity-item">
            <span className="amenity-icon">{getIcon(item.icon)}</span>
            <span className={`amenity-name ${item.crossed ? 'crossed' : ''}`}>
              {item.name}
            </span>
          </div>
        ))}
      </div>

      <button className="btn-secondary show-all-amenities-btn" onClick={onShowAllAmenities}>
        Show all 50 amenities
      </button>
    </section>
  );
}
