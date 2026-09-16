import React from 'react';
import { Star } from 'lucide-react';
import './Overview.css';

export default function Overview({ type, specs, rating, reviewsCount, onScrollToReviews }) {
  return (
    <div className="overview-section">
      <div className="property-specs-block">
        <h2 className="property-type-heading">{type}</h2>
        <p className="property-specs-line">{specs}</p>
      </div>

      {/* Guest Favourite Laurel Card */}
      <div className="guest-favourite-card" onClick={onScrollToReviews} role="button" tabIndex={0}>
        <div className="gf-left">
          <div className="laurel-wrapper">
            <svg viewBox="0 0 32 32" className="laurel-icon" width="32" height="32" fill="currentColor">
              <path d="M12.63 2.05a1 1 0 0 1 .71.93v.08a16.8 16.8 0 0 1-2.9 8.95 18.28 18.28 0 0 1-7.7 6.13 1 1 0 0 1-1.3-.53 1 1 0 0 1 .53-1.3A16.29 16.29 0 0 0 8.8 11a14.8 14.8 0 0 0 2.54-7.98 1 1 0 0 1 1-1h.29zm6.74 0a1 1 0 0 1 1.28.97 14.8 14.8 0 0 0 2.54 7.98 16.29 16.29 0 0 0 6.91 5.31 1 1 0 0 1 .54 1.3 1 1 0 0 1-1.31.54 18.28 18.28 0 0 1-7.7-6.14A16.8 16.8 0 0 1 18.66 3v-.08a1 1 0 0 1 .71-.87zM6.9 16.7a1 1 0 0 1 .28 1.39A15.7 15.7 0 0 0 5 24.16a1 1 0 0 1-1.4.15 1 1 0 0 1-.16-1.4 17.65 17.65 0 0 1 2.44-6.83 1 1 0 0 1 1.02-.38zm18.2 0a1 1 0 0 1 1.02.38 17.65 17.65 0 0 1 2.44 6.83 1 1 0 0 1-.16 1.4 1 1 0 0 1-1.4-.15 15.7 15.7 0 0 0-2.18-6.07 1 1 0 0 1 .28-1.39zm-13.8 8.6a1 1 0 0 1 .42 1.35 15.9 15.9 0 0 0 3.28 4.2 1 1 0 1 1-1.4 1.43 17.9 17.9 0 0 1-3.66-4.7 1 1 0 0 1 .43-1.35.93.93 0 0 1 .93.07zm9.4 0a1 1 0 0 1 .93-.07 1 1 0 0 1 .43 1.35 17.9 17.9 0 0 1-3.66 4.7 1 1 0 0 1-1.4-1.43 15.9 15.9 0 0 0 3.28-4.2 1 1 0 0 1 .42-.35z" />
            </svg>
            <span className="gf-title">Guest<br />favourite</span>
            <svg viewBox="0 0 32 32" className="laurel-icon flip" width="32" height="32" fill="currentColor">
              <path d="M12.63 2.05a1 1 0 0 1 .71.93v.08a16.8 16.8 0 0 1-2.9 8.95 18.28 18.28 0 0 1-7.7 6.13 1 1 0 0 1-1.3-.53 1 1 0 0 1 .53-1.3A16.29 16.29 0 0 0 8.8 11a14.8 14.8 0 0 0 2.54-7.98 1 1 0 0 1 1-1h.29zm6.74 0a1 1 0 0 1 1.28.97 14.8 14.8 0 0 0 2.54 7.98 16.29 16.29 0 0 0 6.91 5.31 1 1 0 0 1 .54 1.3 1 1 0 0 1-1.31.54 18.28 18.28 0 0 1-7.7-6.14A16.8 16.8 0 0 1 18.66 3v-.08a1 1 0 0 1 .71-.87zM6.9 16.7a1 1 0 0 1 .28 1.39A15.7 15.7 0 0 0 5 24.16a1 1 0 0 1-1.4.15 1 1 0 0 1-.16-1.4 17.65 17.65 0 0 1 2.44-6.83 1 1 0 0 1 1.02-.38zm18.2 0a1 1 0 0 1 1.02.38 17.65 17.65 0 0 1 2.44 6.83 1 1 0 0 1-.16 1.4 1 1 0 0 1-1.4-.15 15.7 15.7 0 0 0-2.18-6.07 1 1 0 0 1 .28-1.39zm-13.8 8.6a1 1 0 0 1 .42 1.35 15.9 15.9 0 0 0 3.28 4.2 1 1 0 1 1-1.4 1.43 17.9 17.9 0 0 1-3.66-4.7 1 1 0 0 1 .43-1.35.93.93 0 0 1 .93.07zm9.4 0a1 1 0 0 1 .93-.07 1 1 0 0 1 .43 1.35 17.9 17.9 0 0 1-3.66 4.7 1 1 0 0 1-1.4-1.43 15.9 15.9 0 0 0 3.28-4.2 1 1 0 0 1 .42-.35z" />
            </svg>
          </div>
        </div>

        <div className="gf-center">
          <p className="gf-desc">
            One of the most loved homes on Airbnb, according to guests
          </p>
        </div>

        <div className="gf-right">
          <div className="gf-score-col">
            <span className="gf-score">{rating}</span>
            <div className="gf-stars-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} fill="#222222" color="#222222" />
              ))}
            </div>
          </div>
          <div className="gf-divider-line" />
          <div className="gf-reviews-col">
            <span className="gf-reviews-num">{reviewsCount}</span>
            <span className="gf-reviews-text">Reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
}
