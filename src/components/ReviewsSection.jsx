import React, { useState } from 'react';
import {
  Star,
  Sparkles,
  CheckCircle,
  Key,
  MessageSquare,
  MapPin,
  Tag,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import './ReviewsSection.css';

export default function ReviewsSection({
  rating,
  reviewsCount,
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
      {/* Big Hero Rating Badge */}
      <div className="reviews-hero-badge">
        <div className="laurel-big-wrapper">
          <svg viewBox="0 0 48 48" className="laurel-big" width="56" height="56" fill="currentColor">
            <path d="M18.94 3.08a1.5 1.5 0 0 1 1.07 1.4v.12a25.2 25.2 0 0 1-4.35 13.42 27.42 27.42 0 0 1-11.55 9.2 1.5 1.5 0 0 1-1.95-.8 1.5 1.5 0 0 1 .8-1.95A24.44 24.44 0 0 0 13.2 16.5 22.2 22.2 0 0 0 17 4.53a1.5 1.5 0 0 1 1.5-1.5h.44zm10.12 0a1.5 1.5 0 0 1 1.92 1.45 22.2 22.2 0 0 0 3.81 11.97 24.44 24.44 0 0 0 10.37 7.97 1.5 1.5 0 0 1 .8 1.95 1.5 1.5 0 0 1-1.96.8 27.42 27.42 0 0 1-11.55-9.2 25.2 25.2 0 0 1-4.35-13.42v-.12a1.5 1.5 0 0 1 1.06-1.3zM10.35 25.05a1.5 1.5 0 0 1 .42 2.08A23.55 23.55 0 0 0 7.5 36.24a1.5 1.5 0 0 1-2.1.22 1.5 1.5 0 0 1-.24-2.1 26.48 26.48 0 0 1 3.66-10.25 1.5 1.5 0 0 1 1.53-.57zm27.3 0a1.5 1.5 0 0 1 1.53.57 26.48 26.48 0 0 1 3.66 10.25 1.5 1.5 0 0 1-.24 2.1 1.5 1.5 0 0 1-2.1-.22 23.55 23.55 0 0 0-3.27-9.11 1.5 1.5 0 0 1 .42-2.09zm-20.7 12.9a1.5 1.5 0 0 1 .63 2.03 23.85 23.85 0 0 0 4.92 6.3 1.5 1.5 0 0 1-2.1 2.14 26.85 26.85 0 0 1-5.49-7.05 1.5 1.5 0 0 1 .65-2.03 1.4 1.4 0 0 1 1.39.11zm14.1 0a1.5 1.5 0 0 1 1.4-.11 1.5 1.5 0 0 1 .64 2.03 26.85 26.85 0 0 1-5.49 7.05 1.5 1.5 0 0 1-2.1-2.14 23.85 23.85 0 0 0 4.92-6.3 1.5 1.5 0 0 1 .63-.53z" />
          </svg>
          <span className="big-rating-number">{rating}</span>
          <svg viewBox="0 0 48 48" className="laurel-big flip" width="56" height="56" fill="currentColor">
            <path d="M18.94 3.08a1.5 1.5 0 0 1 1.07 1.4v.12a25.2 25.2 0 0 1-4.35 13.42 27.42 27.42 0 0 1-11.55 9.2 1.5 1.5 0 0 1-1.95-.8 1.5 1.5 0 0 1 .8-1.95A24.44 24.44 0 0 0 13.2 16.5 22.2 22.2 0 0 0 17 4.53a1.5 1.5 0 0 1 1.5-1.5h.44zm10.12 0a1.5 1.5 0 0 1 1.92 1.45 22.2 22.2 0 0 0 3.81 11.97 24.44 24.44 0 0 0 10.37 7.97 1.5 1.5 0 0 1 .8 1.95 1.5 1.5 0 0 1-1.96.8 27.42 27.42 0 0 1-11.55-9.2 25.2 25.2 0 0 1-4.35-13.42v-.12a1.5 1.5 0 0 1 1.06-1.3zM10.35 25.05a1.5 1.5 0 0 1 .42 2.08A23.55 23.55 0 0 0 7.5 36.24a1.5 1.5 0 0 1-2.1.22 1.5 1.5 0 0 1-.24-2.1 26.48 26.48 0 0 1 3.66-10.25 1.5 1.5 0 0 1 1.53-.57zm27.3 0a1.5 1.5 0 0 1 1.53.57 26.48 26.48 0 0 1 3.66 10.25 1.5 1.5 0 0 1-.24 2.1 1.5 1.5 0 0 1-2.1-.22 23.55 23.55 0 0 0-3.27-9.11 1.5 1.5 0 0 1 .42-2.09zm-20.7 12.9a1.5 1.5 0 0 1 .63 2.03 23.85 23.85 0 0 0 4.92 6.3 1.5 1.5 0 0 1-2.1 2.14 26.85 26.85 0 0 1-5.49-7.05 1.5 1.5 0 0 1 .65-2.03 1.4 1.4 0 0 1 1.39.11zm14.1 0a1.5 1.5 0 0 1 1.4-.11 1.5 1.5 0 0 1 .64 2.03 26.85 26.85 0 0 1-5.49 7.05 1.5 1.5 0 0 1-2.1-2.14 23.85 23.85 0 0 0 4.92-6.3 1.5 1.5 0 0 1 .63-.53z" />
          </svg>
        </div>

        <h3 className="gf-heading">Guest favourite</h3>
        <p className="gf-sub-text">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <button className="how-reviews-work-btn" onClick={onHowReviewsWork}>
          How reviews work
        </button>
      </div>

      {/* Category Ratings Row */}
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
                      width: stars === 5 ? '94%' : stars === 4 ? '6%' : '0%'
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
            <Sparkles size={24} strokeWidth={1.7} />
          </div>
        </div>

        <div className="cat-divider" />

        {/* Accuracy */}
        <div className="category-col">
          <span className="cat-title">Accuracy</span>
          <span className="cat-score">{ratingCategories.accuracy}</span>
          <div className="cat-icon-wrap">
            <CheckCircle size={24} strokeWidth={1.7} />
          </div>
        </div>

        <div className="cat-divider" />

        {/* Check-in */}
        <div className="category-col">
          <span className="cat-title">Check-in</span>
          <span className="cat-score">{ratingCategories.checkIn}</span>
          <div className="cat-icon-wrap">
            <Key size={24} strokeWidth={1.7} />
          </div>
        </div>

        <div className="cat-divider" />

        {/* Communication */}
        <div className="category-col">
          <span className="cat-title">Communication</span>
          <span className="cat-score">{ratingCategories.communication}</span>
          <div className="cat-icon-wrap">
            <MessageSquare size={24} strokeWidth={1.7} />
          </div>
        </div>

        <div className="cat-divider" />

        {/* Location */}
        <div className="category-col">
          <span className="cat-title">Location</span>
          <span className="cat-score">{ratingCategories.location}</span>
          <div className="cat-icon-wrap">
            <MapPin size={24} strokeWidth={1.7} />
          </div>
        </div>

        <div className="cat-divider" />

        {/* Value */}
        <div className="category-col">
          <span className="cat-title">Value</span>
          <span className="cat-score">{ratingCategories.value}</span>
          <div className="cat-icon-wrap">
            <Tag size={24} strokeWidth={1.7} />
          </div>
        </div>
      </div>

      {/* Guest reviews mention */}
      <div className="reviews-mentions-block">
        <h4 className="mentions-heading">Guest reviews mention</h4>
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
