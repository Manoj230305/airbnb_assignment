import React from 'react';
import { Calendar, Key, Shield } from 'lucide-react';
import './ThingsToKnow.css';

export default function ThingsToKnow({ thingsToKnow, onOpenCalendar, onOpenRules, onOpenSafety }) {
  return (
    <section className="things-to-know-section">
      <h2 className="things-to-know-title">Things to know</h2>

      <div className="things-grid">
        {/* Cancellation policy */}
        <div className="things-col">
          <div className="things-icon-wrap">
            <Calendar size={24} strokeWidth={1.5} className="things-icon" />
          </div>
          <h3 className="things-col-heading">{thingsToKnow.cancellation.title}</h3>
          <p className="things-text-line">{thingsToKnow.cancellation.lines[0]}</p>
          <p className="things-text-line things-subtext">{thingsToKnow.cancellation.lines[1]}</p>
          <button className="things-learn-more-btn" onClick={onOpenCalendar}>
            Learn more
          </button>
        </div>

        {/* House rules */}
        <div className="things-col">
          <div className="things-icon-wrap">
            <Key size={24} strokeWidth={1.5} className="things-icon" />
          </div>
          <h3 className="things-col-heading">{thingsToKnow.houseRules.title}</h3>
          <div className="things-items-list">
            {thingsToKnow.houseRules.lines.map((line, idx) => (
              <p key={idx} className="things-item-line">{line}</p>
            ))}
          </div>
          <button className="things-learn-more-btn" onClick={onOpenRules}>
            Learn more
          </button>
        </div>

        {/* Safety & property */}
        <div className="things-col">
          <div className="things-icon-wrap">
            <Shield size={24} strokeWidth={1.5} className="things-icon" />
          </div>
          <h3 className="things-col-heading">{thingsToKnow.safety.title}</h3>
          <div className="things-items-list">
            {thingsToKnow.safety.lines.map((line, idx) => (
              <p key={idx} className="things-item-line">{line}</p>
            ))}
          </div>
          <button className="things-learn-more-btn" onClick={onOpenSafety}>
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
}
