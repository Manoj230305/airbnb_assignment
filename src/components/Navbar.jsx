import React, { useState } from 'react';
import { Search, Globe, Menu, User, Sparkles } from 'lucide-react';
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
            <svg
              viewBox="0 0 32 32"
              className="logo-icon"
              width="32"
              height="32"
              fill="#FF385C"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.256-3.238 7.806-7.5 7.806-2.58 0-4.836-1.282-6.22-3.276a9.574 9.574 0 0 1-6.22 3.276C4.738 32 1.5 28.45 1.5 24.194c0-.987.243-1.895.91-3.486l.156-.37c1.026-2.38 5.176-11.082 7.135-14.912l.533-1.025C11.528 2.063 12.983 1 14.991 1H16zm0 2h-1.009c-1.34 0-2.316.643-3.328 2.445l-.46.883c-1.955 3.82-6.108 12.51-7.13 14.887l-.146.347c-.604 1.442-.816 2.18-.816 2.632 0 3.252 2.41 5.806 5.389 5.806 2.502 0 4.606-1.742 5.253-4.148l.102-.429.35-.916.313-.746c.551-1.24 1.58-1.97 2.766-1.97 1.187 0 2.216.73 2.766 1.97l.313.746.35.916.102.43c.647 2.405 2.75 4.147 5.253 4.147 2.98 0 5.39-2.554 5.39-5.806 0-.453-.213-1.19-.817-2.632l-.146-.347c-1.022-2.376-5.174-11.066-7.13-14.887l-.46-.883C19.324 3.643 18.349 3 17.009 3H16zm0 18.5c-.868 0-1.626.54-1.992 1.397l-.11.282-.32.765-.357.933c-.45 1.554-1.854 2.623-3.441 2.623-1.91 0-3.389-1.553-3.389-3.806 0-.447.162-1.077.674-2.298l.156-.37c.974-2.257 5.093-10.902 7.02-14.67l.489-.938c.677-1.212 1.258-1.416 1.97-1.416.712 0 1.293.204 1.97 1.416l.489.938c1.927 3.768 6.046 12.413 7.02 14.67l.156.37c.512 1.22.674 1.851.674 2.298 0 2.253-1.479 3.806-3.39 3.806-1.586 0-2.99-1.069-3.44-2.623l-.358-.933-.32-.765-.11-.282A2.164 2.164 0 0 0 16 21.5zm0-15c-.443 0-.84.275-1.026.708l-.053.15-.49 1.171c-1.393 3.327-4.148 9.53-5.59 12.78l-.13.298c-.41.97-.502 1.433-.502 1.693 0 1.29.837 2.194 1.89 2.194 1.05 0 1.97-.732 2.278-1.777l.104-.407.398-1.04.34-.813a4.17 4.17 0 0 1 3.881-2.867 4.17 4.17 0 0 1 3.882 2.867l.34.814.398 1.039.104.407c.307 1.045 1.228 1.777 2.278 1.777 1.053 0 1.89-.904 1.89-2.194 0-.26-.092-.723-.502-1.693l-.13-.298c-1.442-3.25-4.197-9.453-5.59-12.78l-.49-1.171-.053-.15A1.116 1.116 0 0 0 16 6.5z"/>
            </svg>
            <span className="logo-text">airbnb</span>
          </a>
        </div>

        {/* Center Search Pill */}
        <div className="header-search-bar" onClick={onOpenSearch}>
          <button className="search-pill-btn">
            <div className="search-pill-left-icon">
              <span className="tiny-home-icon">🏡</span>
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
            className="globe-btn"
            aria-label="Choose language and currency"
            onClick={() => setLangModalOpen(true)}
          >
            <Globe size={17} strokeWidth={1.8} />
          </button>

          <div className="user-menu-container">
            <button
              className="user-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="User navigation menu"
            >
              <Menu size={16} strokeWidth={2.4} />
              <div className="user-avatar-circle">
                <svg viewBox="0 0 32 32" width="16" height="16" fill="#FFFFFF">
                  <path d="M16 1a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 18c-5.33 0-16 2.67-16 8v3h32v-3c0-5.33-10.67-8-16-8z"/>
                </svg>
              </div>
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
