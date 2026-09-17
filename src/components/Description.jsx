import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import './Description.css';

export default function Description({ description }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  return (
    <div className="description-section">
      {/* Translation Banner */}
      <div className="translation-banner">
        <p className="translation-text">
          Some info has been automatically translated.{' '}
          <button
            className="show-original-link"
            onClick={() => setShowOriginal(!showOriginal)}
          >
            {showOriginal ? 'Show translated' : 'Show original'}
          </button>
        </p>
      </div>

      {/* Main Intro only - extra 'The space' and 'Guest access' removed as requested */}
      <div className="description-content">
        <p className={`description-intro-p ${!isExpanded ? 'clamped' : ''}`}>
          {description.intro}
        </p>

        <button
          className="show-more-desc-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>{isExpanded ? 'Show less' : 'Show more'}</span>
          <ChevronRight
            size={16}
            strokeWidth={2.4}
            style={{ transform: isExpanded ? 'rotate(-90deg)' : 'none' }}
          />
        </button>
      </div>
    </div>
  );
}
