import React from 'react';
import { Waves, DoorClosed, MapPin } from 'lucide-react';
import './Highlights.css';

export default function Highlights({ highlights }) {
  const getIcon = (type) => {
    switch (type) {
      case 'pool':
        return <Waves size={24} strokeWidth={1.8} color="#222222" />;
      case 'door':
        return <DoorClosed size={24} strokeWidth={1.8} color="#222222" />;
      case 'pin':
      default:
        return <MapPin size={24} strokeWidth={1.8} color="#222222" />;
    }
  };

  return (
    <div className="highlights-section">
      {highlights.map((item, index) => (
        <div key={index} className="highlight-row">
          <div className="highlight-icon-wrap">
            {getIcon(item.icon)}
          </div>
          <div className="highlight-text-wrap">
            <h3 className="highlight-title">{item.title}</h3>
            <p className="highlight-desc">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
