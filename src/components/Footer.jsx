import React from 'react';
import { Globe, ChevronRight } from 'lucide-react';
import './Footer.css';

export default function Footer({ onOpenLangModal }) {
  return (
    <footer className="airbnb-footer">
      <div className="page-container">
        {/* Breadcrumbs */}
        <div className="footer-breadcrumbs">
          <a href="#" className="crumb-link">Airbnb</a>
          <ChevronRight size={12} className="crumb-sep" />
          <a href="#" className="crumb-link">India</a>
          <ChevronRight size={12} className="crumb-sep" />
          <a href="#" className="crumb-link">Goa</a>
          <ChevronRight size={12} className="crumb-sep" />
          <a href="#" className="crumb-link">Candolim</a>
          <ChevronRight size={12} className="crumb-sep" />
          <span className="crumb-current">Amor de Goa</span>
        </div>

        <div className="divider" style={{ margin: '24px 0' }} />

        {/* 3-Column Links */}
        <div className="footer-links-grid">
          <div className="footer-col">
            <h4 className="footer-col-title">Support</h4>
            <ul className="footer-links-list">
              <li><a href="#">Help Centre</a></li>
              <li><a href="#">AirCover</a></li>
              <li><a href="#">Anti-discrimination</a></li>
              <li><a href="#">Disability support</a></li>
              <li><a href="#">Cancellation options</a></li>
              <li><a href="#">Report neighbourhood concern</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Hosting</h4>
            <ul className="footer-links-list">
              <li><a href="#">Airbnb your home</a></li>
              <li><a href="#">AirCover for Hosts</a></li>
              <li><a href="#">Hosting resources</a></li>
              <li><a href="#">Community forum</a></li>
              <li><a href="#">Hosting responsibly</a></li>
              <li><a href="#">Join a free Hosting class</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Airbnb</h4>
            <ul className="footer-links-list">
              <li><a href="#">Newsroom</a></li>
              <li><a href="#">New features</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Investors</a></li>
              <li><a href="#">Gift cards</a></li>
              <li><a href="#">Airbnb.org emergency stays</a></li>
            </ul>
          </div>
        </div>

        <div className="divider" style={{ margin: '24px 0' }} />

        {/* Bottom Legal Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-left">
            <span>© 2026 Airbnb, Inc.</span>
            <span className="bullet">·</span>
            <a href="#">Privacy</a>
            <span className="bullet">·</span>
            <a href="#">Terms</a>
            <span className="bullet">·</span>
            <a href="#">Sitemap</a>
            <span className="bullet">·</span>
            <a href="#">Company details</a>
          </div>

          <div className="footer-bottom-right">
            <button className="footer-lang-btn" onClick={onOpenLangModal}>
              <Globe size={16} />
              <span>English (IN)</span>
            </button>
            <button className="footer-currency-btn" onClick={onOpenLangModal}>
              <span>₹ INR</span>
            </button>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
