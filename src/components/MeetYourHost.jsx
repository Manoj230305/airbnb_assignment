import React, { useState } from 'react';
import { Star, ShieldCheck, GraduationCap, PartyPopper, Shield } from 'lucide-react';
import './MeetYourHost.css';

export default function MeetYourHost({ host, onMessageHost }) {
  return (
    <section id="host-section" className="meet-your-host-section">
      <h2 className="section-title">Meet your host</h2>

      <div className="host-layout-grid">
        {/* Left Host Passport Card */}
        <div className="host-passport-card">
          <div className="passport-inner-row">
            <div className="passport-left-col">
              <div className="passport-avatar-box">
                <img src={host.avatar} alt={host.name} className="passport-avatar-img" />
                <div className="verified-badge-icon">
                  <ShieldCheck size={14} fill="#E00B41" color="#FFFFFF" />
                </div>
              </div>
              <h3 className="passport-host-name">{host.name}</h3>
              <p className="passport-host-label">Host</p>
            </div>

            <div className="passport-right-col">
              <div className="stat-group">
                <span className="stat-num">{host.reviewsCount}</span>
                <span className="stat-lbl">Reviews</span>
              </div>
              <div className="passport-stat-divider" />
              <div className="stat-group">
                <span className="stat-num">{host.rating}★</span>
                <span className="stat-lbl">Rating</span>
              </div>
              <div className="passport-stat-divider" />
              <div className="stat-group">
                <span className="stat-num">{host.yearsHosting}</span>
                <span className="stat-lbl">Years hosting</span>
              </div>
            </div>
          </div>

          <div className="passport-bottom-details">
            <div className="passport-meta-row">
              <PartyPopper size={18} strokeWidth={1.8} />
              <span>{host.bornDecade}</span>
            </div>
            <div className="passport-meta-row">
              <GraduationCap size={18} strokeWidth={1.8} />
              <span>Where I went to school: {host.school}</span>
            </div>
          </div>
        </div>

        {/* Right Details & Co-hosts Column */}
        <div className="host-details-column">
          {/* Co-Hosts */}
          <div className="co-hosts-block">
            <h4 className="co-hosts-heading">Co-Hosts</h4>
            <div className="co-hosts-grid">
              {host.coHosts.map((ch, i) => (
                <div key={i} className="co-host-pill">
                  {ch.avatar ? (
                    <img src={ch.avatar} alt={ch.name} className="co-host-avatar-img" />
                  ) : (
                    <div className="co-host-initial-avatar" style={{ background: ch.bgColor }}>
                      {ch.initial}
                    </div>
                  )}
                  <span className="co-host-name">{ch.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Host Response Details */}
          <div className="host-response-details">
            <h4 className="host-details-heading">Host details</h4>
            <p className="response-rate-line">Response rate: {host.responseRate}</p>
            <p className="response-time-line">{host.responseTime}</p>

            <button className="btn-secondary message-host-btn" onClick={onMessageHost}>
              Message host
            </button>
          </div>

          {/* Payment protection notice */}
          <div className="payment-protection-notice">
            <div className="shield-icon-wrap">
              <Shield size={20} strokeWidth={1.8} color="#FF385C" />
            </div>
            <p className="protection-text">
              To help protect your payment, always use Airbnb to send money and communicate with hosts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
