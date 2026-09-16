import React, { useState } from 'react';
import { X, Search, Star } from 'lucide-react';
import './Modals.css';

export default function ReviewsModal({ rating, reviewsCount, reviews, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = reviews.filter(
    (r) =>
      r.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content reviews-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="reviews-modal-title-row">
            <span className="reviews-modal-star">★</span>
            <span className="reviews-modal-rating">{rating}</span>
            <span className="bullet">·</span>
            <span>{reviewsCount} reviews</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close reviews">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body reviews-modal-body">
          <div className="reviews-search-box">
            <Search size={16} color="#717171" />
            <input
              type="text"
              placeholder="Search reviews"
              className="reviews-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="modal-reviews-list">
            {filtered.map((rev) => (
              <div key={rev.id} className="modal-review-card">
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

                <p className="review-comment-text">{rev.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
