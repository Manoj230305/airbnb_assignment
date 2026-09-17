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
            <svg
              viewBox="0 0 32 32"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M26 19v7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-7" />
              <path d="M16 4v16" />
              <path d="m9 11 7-7 7 7" />
            </svg>
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
