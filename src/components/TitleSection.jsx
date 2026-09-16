import React, { useState } from 'react';
import { Share, Heart } from 'lucide-react';
import './TitleSection.css';

export default function TitleSection({ title, onShare }) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="title-section page-container">
      <div className="title-header">
        <h1 className="listing-title">{title}</h1>

        <div className="title-actions">
          <button className="action-btn" onClick={onShare} aria-label="Share listing">
            <Share size={16} strokeWidth={2} />
            <span className="action-text">Share</span>
          </button>

          <button
            className={`action-btn ${isSaved ? 'saved' : ''}`}
            onClick={() => setIsSaved(!isSaved)}
            aria-label="Save listing to favorites"
          >
            <Heart
              size={16}
              strokeWidth={2}
              fill={isSaved ? '#FF385C' : 'none'}
              color={isSaved ? '#FF385C' : 'currentColor'}
            />
            <span className="action-text">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
