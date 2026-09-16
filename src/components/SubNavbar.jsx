import React, { useState, useEffect } from 'react';
import './SubNavbar.css';

export default function SubNavbar({ visible, rating, reviewsCount, onScrollToSection, onCheckAvailability }) {
  const [activeTab, setActiveTab] = useState('photos');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['photos', 'amenities', 'reviews', 'location'];
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveTab(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <nav className="sub-navbar">
      <div className="sub-navbar-inner page-container">
        <div className="sub-navbar-links">
          <button
            className={`sub-nav-link ${activeTab === 'photos' ? 'active' : ''}`}
            onClick={() => onScrollToSection('photos')}
          >
            Photos
          </button>
          <button
            className={`sub-nav-link ${activeTab === 'amenities' ? 'active' : ''}`}
            onClick={() => onScrollToSection('amenities')}
          >
            Amenities
          </button>
          <button
            className={`sub-nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => onScrollToSection('reviews')}
          >
            Reviews
          </button>
          <button
            className={`sub-nav-link ${activeTab === 'location' ? 'active' : ''}`}
            onClick={() => onScrollToSection('location')}
          >
            Location
          </button>
        </div>

        <div className="sub-navbar-cta">
          <div className="sub-navbar-price-info">
            <span className="sub-price-title">Add dates for prices</span>
            <div className="sub-price-rating">
              <span className="sub-star">★</span>
              <span className="sub-rating-num">{rating}</span>
              <span className="sub-dot">·</span>
              <span className="sub-reviews-link">{reviewsCount} reviews</span>
            </div>
          </div>
          <button className="btn-primary sub-reserve-btn" onClick={onCheckAvailability}>
            Check availability
          </button>
        </div>
      </div>
    </nav>
  );
}
