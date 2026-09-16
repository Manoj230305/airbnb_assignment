import React from 'react';
import { Calendar, Key, Shield, ChevronRight } from 'lucide-react';
import './ThingsToKnow.css';

export default function ThingsToKnow({ thingsToKnow, onOpenCalendar, onOpenRules, onOpenSafety }) {
  return (
    <section className="things-to-know-section">
      <h2 className="section-title">Things to know</h2>

      <div className="things-grid">
        {/* Cancellation Policy */}
        <div className="things-col">
          <div className="things-header">
            <Calendar size={20} strokeWidth={1.8} />
            <h3 className="things-col-title">{thingsToKnow.cancellation.title}</h3>
          </div>
          <p className="things-text">{thingsToKnow.cancellation.lines[0]}</p>
          <button className="things-action-link" onClick={onOpenCalendar}>
            <span>{thingsToKnow.cancellation.linkText}</span>
            <ChevronRight size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* House rules */}
        <div className="things-col">
          <div className="things-header">
            <Key size={20} strokeWidth={1.8} />
            <h3 className="things-col-title">{thingsToKnow.houseRules.title}</h3>
          </div>
          <ul className="things-list">
            {thingsToKnow.houseRules.lines.map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
          <button className="things-action-link" onClick={onOpenRules}>
            <span>{thingsToKnow.houseRules.linkText}</span>
            <ChevronRight size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* Safety & property */}
        <div className="things-col">
          <div className="things-header">
            <Shield size={20} strokeWidth={1.8} />
            <h3 className="things-col-title">{thingsToKnow.safety.title}</h3>
          </div>
          <ul className="things-list">
            {thingsToKnow.safety.lines.map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
          <button className="things-action-link" onClick={onOpenSafety}>
            <span>{thingsToKnow.safety.linkText}</span>
            <ChevronRight size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
