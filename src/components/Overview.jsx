import React from 'react';
import { Star } from 'lucide-react';
import side1 from '../assets/side1.png';
import side2 from '../assets/side2.png';
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
            <img src={side1} alt="" className="gf-laurel-img" />
            <span className="gf-title">Guest<br />favourite</span>
            <img src={side2} alt="" className="gf-laurel-img" />
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
