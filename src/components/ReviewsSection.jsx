import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  Key,
  MessageSquare,
  Map,
  Tag,
  ChevronRight
} from 'lucide-react';
import side1 from '../assets/side1.png';
import side2 from '../assets/side2.png';
import './ReviewsSection.css';

function SprayBottleIcon({ size = 26, color = '#222222' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 2h4M12 2v4M9 6h6l1 4v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10l3-4z" />
      <path d="M5.5 10.5 4 11.5" />
      <circle cx="18" cy="5" r="0.75" fill={color} />
      <circle cx="21" cy="7" r="0.75" fill={color} />
      <circle cx="19" cy="9.5" r="0.75" fill={color} />
    </svg>
  );
}

export default function ReviewsSection({
  rating = 4.95,
  reviewsCount = 19,
  ratingCategories,
  reviewsMentions,
  reviews,
  onShowAllReviews,
  onHowReviewsWork
}) {
  const [selectedTag, setSelectedTag] = useState(null);

  const filteredReviews = selectedTag
    ? reviews.filter(r => r.text.toLowerCase().includes(selectedTag.toLowerCase()))
    : reviews;

  return (
    <section id="reviews" className="reviews-section">
      {/* Big Hero Rating Badge with side1 and side2 decorative laurels */}
      <div className="reviews-hero-badge">
        <div className="laurel-big-wrapper">
          <img src={side1} alt="" className="laurel-branch-img left-branch" />
          <span className="big-rating-number">{rating}</span>
          <img src={side2} alt="" className="laurel-branch-img right-branch" />
        </div>

        <h3 className="gf-heading">Guest favourite</h3>
        <p className="gf-sub-text">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <button className="how-reviews-work-btn" onClick={onHowReviewsWork}>
          How reviews work
        </button>
      </div>

      {/* Category Ratings Row - No scroll bar, clean 7 columns */}
      <div className="category-ratings-row">
        {/* Overall rating bar chart */}
        <div className="category-col overall-col">
          <span className="cat-title">Overall rating</span>
          <div className="rating-bars-stack">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="rating-bar-line">
                <span className="star-level">{stars}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: stars === 5 ? '92%' : stars === 4 ? '8%' : '0%'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cat-divider" />

        {/* Cleanliness */}
        <div className="category-col">
          <span className="cat-title">Cleanliness</span>
          <span className="cat-score">{ratingCategories.cleanliness}</span>
          <div className="cat-icon-wrap">
            <SprayBottleIcon size={26} />
          </div>
        </div>

        <div className="cat-divider" />

        {/* Accuracy */}
        <div className="category-col">
          <span className="cat-title">Accuracy</span>
          <span className="cat-score">{ratingCategories.accuracy}</span>
          <div className="cat-icon-wrap">
            <CheckCircle2 size={26} strokeWidth={1.6} />
          </div>
        </div>

        <div className="cat-divider" />

        {/* Check-in */}
        <div className="category-col">
          <span className="cat-title">Check-in</span>
          <span className="cat-score">{ratingCategories.checkIn}</span>
          <div className="cat-icon-wrap">
            <Key size={26} strokeWidth={1.6} />
          </div>
        </div>

        <div className="cat-divider" />

        {/* Communication */}
        <div className="category-col">
          <span className="cat-title">Communication</span>
          <span className="cat-score">{ratingCategories.communication}</span>
          <div className="cat-icon-wrap">
            <MessageSquare size={26} strokeWidth={1.6} />
          </div>
        </div>

        <div className="cat-divider" />

        {/* Location */}
        <div className="category-col">
          <span className="cat-title">Location</span>
          <span className="cat-score">{ratingCategories.location}</span>
          <div className="cat-icon-wrap">
            <Map size={26} strokeWidth={1.6} />
          </div>
        </div>

        <div className="cat-divider" />

        {/* Value */}
        <div className="category-col">
          <span className="cat-title">Value</span>
          <span className="cat-score">{ratingCategories.value}</span>
          <div className="cat-icon-wrap">
            <Tag size={26} strokeWidth={1.6} />
          </div>
        </div>
      </div>

      {/* Guest reviews mention chips - No scroll bar */}
      <div className="reviews-mentions-block">
        <div className="mentions-carousel">
          {reviewsMentions.map((tag, idx) => (
            <button
              key={idx}
              className={`mention-chip ${selectedTag === tag.label ? 'active' : ''}`}
              onClick={() => setSelectedTag(selectedTag === tag.label ? null : tag.label)}
            >
              <span className="mention-emoji">{tag.emoji}</span>
              <span className="mention-name">{tag.label}</span>
              <span className="mention-count">{tag.count}</span>
            </button>
          ))}
          <button className="carousel-arrow-btn" aria-label="More mentions">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 2-Column Review Cards */}
      <div className="review-cards-grid">
        {filteredReviews.map((rev) => (
          <div key={rev.id} className="review-card">
            <div className="reviewer-header">
              {rev.avatar ? (
                <img src={rev.avatar} alt={rev.author} className="reviewer-avatar-img" />
              ) : (
                <div
                  className="reviewer-avatar-initial"
                  style={{ backgroundColor: rev.avatarBg, color: rev.textColor }}
                >
                  {rev.initial}
                </div>
              )}
              <div className="reviewer-info">
                <h4 className="reviewer-name">{rev.author}</h4>
                <p className="reviewer-tenure">{rev.tenure}</p>
              </div>
            </div>

            <div className="review-stars-date">
              <div className="review-stars">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={10} fill="#222222" color="#222222" />
                ))}
              </div>
              <span className="review-dot">·</span>
              <span className="review-date">{rev.date}</span>
            </div>

            <p className="review-comment-text">
              {rev.text}
            </p>
          </div>
        ))}
      </div>

      <div className="reviews-bottom-action">
        <button className="btn-secondary show-all-reviews-btn" onClick={onShowAllReviews}>
          Show all {reviewsCount} reviews
        </button>
      </div>
    </section>
  );
}
