import React from 'react';
import { FlameKindling, Fan, DoorClosed } from 'lucide-react';
import './Highlights.css';

export default function Highlights({ highlights }) {
  const getIcon = (type) => {
    switch (type) {
      case 'outdoor':
        return <FlameKindling size={24} strokeWidth={1.6} color="#222222" />;
      case 'cooling':
        return <Fan size={24} strokeWidth={1.6} color="#222222" />;
      case 'door':
      default:
        return <DoorClosed size={24} strokeWidth={1.6} color="#222222" />;
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
