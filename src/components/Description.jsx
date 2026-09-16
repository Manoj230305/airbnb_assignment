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

      {/* Main Intro */}
      <div className="description-content">
        <p className="description-intro-p">
          {description.intro}
        </p>

        <div className="description-space-block">
          <h3 className="space-heading">The space</h3>
          <p className="space-summary">
            {isExpanded
              ? description.space
              : `${description.space.slice(0, 80)}...`}
          </p>

          {isExpanded && (
            <div className="expanded-details">
              <h4 className="space-subheading">Guest access</h4>
              <p>{description.guestAccess}</p>
              <h4 className="space-subheading">Other things to note</h4>
              <p style={{ whiteSpace: 'pre-line' }}>{description.otherDetails}</p>
            </div>
          )}

          <button
            className="show-more-desc-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span>{isExpanded ? 'Show less' : 'Show more'}</span>
            <ChevronRight size={16} strokeWidth={2.4} style={{ transform: isExpanded ? 'rotate(-90deg)' : 'none' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
