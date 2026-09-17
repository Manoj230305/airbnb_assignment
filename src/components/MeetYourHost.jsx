import React from 'react';
import { Star, Check, Balloon, GraduationCap, Shield } from 'lucide-react';
import './MeetYourHost.css';

export default function MeetYourHost({ host, onMessageHost }) {
  return (
    <section id="host-section" className="meet-your-host-section">
      <h2 className="section-title">Meet your host</h2>

      <div className="host-layout-grid">
        {/* Left Column: Passport Card & Details below */}
        <div className="host-left-column">
          <div className="host-passport-card">
            <div className="passport-inner-row">
              <div className="passport-left-col">
                <div className="passport-avatar-box">
                  <img src={host.avatar} alt={host.name} className="passport-avatar-img" />
                  <div className="verified-badge-icon" aria-label="Identity verified">
                    <Check size={12} strokeWidth={3.5} color="#FFFFFF" />
                  </div>
                </div>
                <h3 className="passport-host-name">
                  <span>Mirashya</span>
                  <span>Homes</span>
                </h3>
                <p className="passport-host-label">Host</p>
              </div>

              <div className="passport-right-col">
                <div className="stat-group">
                  <span className="stat-num">{host.reviewsCount}</span>
                  <span className="stat-lbl">Reviews</span>
                </div>
                <div className="passport-stat-divider" />
                <div className="stat-group">
                  <span className="stat-num stat-rating-num">
                    {host.rating}
                    <Star size={13} fill="#222222" stroke="none" className="passport-star-icon" />
                  </span>
                  <span className="stat-lbl">Rating</span>
                </div>
                <div className="passport-stat-divider" />
                <div className="stat-group">
                  <span className="stat-num">{host.yearsHosting}</span>
                  <span className="stat-lbl">Years hosting</span>
                </div>
              </div>
            </div>
          </div>

          <div className="host-bio-details">
            <div className="bio-item-row">
              <Balloon size={20} strokeWidth={1.5} className="bio-icon" />
              <span>{host.bornDecade}</span>
            </div>
            <div className="bio-item-row">
              <GraduationCap size={20} strokeWidth={1.5} className="bio-icon" />
              <span>Where I went to school: {host.school}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Co-Hosts & Host Details */}
        <div className="host-right-column">
          <div className="co-hosts-block">
            <h3 className="co-hosts-heading">Co-Hosts</h3>
            <div className="co-hosts-grid">
              {host.coHosts.map((ch, i) => (
                <div key={i} className="co-host-item">
                  {ch.avatar ? (
                    <img src={ch.avatar} alt={ch.name} className="co-host-avatar-img" />
                  ) : (
                    <div
                      className="co-host-initial-avatar"
                      style={{ background: ch.bgColor, color: ch.textColor }}
                    >
                      {ch.initial}
                    </div>
                  )}
                  <span className="co-host-name">{ch.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="host-details-block">
            <h3 className="host-details-heading">Host details</h3>
            <p className="response-stat-line">Response rate: {host.responseRate}</p>
            <p className="response-stat-line response-time-line">{host.responseTime}</p>

            <button className="message-host-btn" onClick={onMessageHost}>
              Message host
            </button>
          </div>

          <div className="payment-protection-notice">
            <Shield size={18} strokeWidth={1.5} className="protection-shield-icon" />
            <p className="protection-text">
              To help protect your payment, always use Airbnb to send money and communicate with hosts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
