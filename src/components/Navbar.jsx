import React, { useState } from 'react';
import { Search, Globe, Menu } from 'lucide-react';
import logoImg from '../assets/logo.png';
import searchHouseImg from '../assets/searchbar-house.png';
import './Navbar.css';

export default function Navbar({ onOpenSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langModalOpen, setLangModalOpen] = useState(false);

  return (
    <header className="airbnb-header">
      <div className="header-inner page-container">
        {/* Logo */}
        <div className="header-logo">
          <a href="#" className="logo-link" aria-label="Airbnb Home">
            <img src={logoImg} alt="Airbnb" className="header-logo-img" />
          </a>
        </div>

        {/* Center Search Pill */}
        <div className="header-search-bar" onClick={onOpenSearch}>
          <button className="search-pill-btn">
            <div className="search-pill-left-icon">
              <img src={searchHouseImg} alt="" className="search-home-img" />
            </div>
            <span className="search-pill-item bold">Anywhere</span>
            <span className="search-pill-divider" />
            <span className="search-pill-item bold">Anytime</span>
            <span className="search-pill-divider" />
            <span className="search-pill-item muted">Add guests</span>
            <div className="search-pill-icon">
              <Search size={13} strokeWidth={3.2} color="#FFFFFF" />
            </div>
          </button>
        </div>

        {/* Right User Controls */}
        <div className="header-right">
          <button className="host-cta-btn">Become a host</button>

          <button
            className="header-circle-btn globe-btn"
            aria-label="Choose language and currency"
            onClick={() => setLangModalOpen(true)}
          >
            <Globe size={18} strokeWidth={1.8} />
          </button>

          <div className="user-menu-container">
            <button
              className="header-circle-btn menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="User navigation menu"
            >
              <Menu size={18} strokeWidth={2.4} />
            </button>

            {menuOpen && (
              <div className="user-dropdown-menu">
                <div className="dropdown-item bold" onClick={() => setMenuOpen(false)}>
                  Sign up
                </div>
                <div className="dropdown-item" onClick={() => setMenuOpen(false)}>
                  Log in
                </div>
                <div className="dropdown-divider" />
                <div className="dropdown-item" onClick={() => setMenuOpen(false)}>
                  Gift cards
                </div>
                <div className="dropdown-item" onClick={() => setMenuOpen(false)}>
                  Airbnb your home
                </div>
                <div className="dropdown-item" onClick={() => setMenuOpen(false)}>
                  Help Centre
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {langModalOpen && (
        <div className="modal-backdrop" onClick={() => setLangModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540 }}>
            <div className="modal-header">
              <h3>Language and Currency</h3>
              <button className="modal-close-btn" onClick={() => setLangModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ padding: 12, border: '1px solid #222', borderRadius: 8 }}>
                <strong>English (IN)</strong>
                <p className="text-muted" style={{ fontSize: 13 }}>India</p>
              </div>
              <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8, cursor: 'pointer' }}>
                <strong>English (US)</strong>
                <p className="text-muted" style={{ fontSize: 13 }}>United States</p>
              </div>
              <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8, cursor: 'pointer' }}>
                <strong>₹ INR</strong>
                <p className="text-muted" style={{ fontSize: 13 }}>Indian Rupee</p>
              </div>
              <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8, cursor: 'pointer' }}>
                <strong>$ USD</strong>
                <p className="text-muted" style={{ fontSize: 13 }}>US Dollar</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
