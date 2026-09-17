import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Flag, Minus, Plus } from 'lucide-react';
import './ReserveCard.css';

export default function ReserveCard({
  nightlyPrice = 5699,
  currency = '₹',
  rating = 4.95,
  reviewsCount = 19,
  checkInDate = '10/18/2026',
  checkOutDate = '10/23/2026',
  onOpenCalendar,
  onOpenReport
}) {
  const [guests, setGuests] = useState({ adults: 2, children: 0, infants: 0, pets: 0 });
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [reservationMade, setReservationMade] = useState(false);

  const totalGuests = guests.adults + guests.children;
  const guestLabel = `${totalGuests} guest${totalGuests > 1 ? 's' : ''}${
    guests.infants > 0 ? `, ${guests.infants} infant${guests.infants > 1 ? 's' : ''}` : ''
  }${guests.pets > 0 ? `, ${guests.pets} pet${guests.pets > 1 ? 's' : ''}` : ''}`;

  const currentCheckIn = checkInDate || '10/18/2026';
  const currentCheckOut = checkOutDate || '10/23/2026';

  const updateGuestCount = (type, delta) => {
    setGuests(prev => {
      const current = prev[type];
      const updated = Math.max(type === 'adults' ? 1 : 0, current + delta);
      if (type === 'adults' || type === 'children') {
        const other = type === 'adults' ? prev.children : prev.adults;
        if (updated + other > 3) return prev;
      }
      return { ...prev, [type]: updated };
    });
  };

  const handleAction = () => {
    setReservationMade(true);
  };

  return (
    <div className="reserve-sidebar-sticky">
      {/* 10% Off Promo Tag Box */}
      <div className="promo-tag-card">
        <div className="promo-left">
          <div className="tag-icon-circle">
            <svg viewBox="0 0 32 32" width="22" height="22" fill="#43A047">
              <path d="M12.4 2.6a4 4 0 0 1 2.8 1.2l14.2 14.2a4 4 0 0 1 0 5.6l-8.4 8.4a4 4 0 0 1-5.6 0L1.2 17.8A4 4 0 0 1 0 15V6a4 4 0 0 1 4-4h8.4zm-4.4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
          </div>
          <div className="promo-text-wrap">
            <span className="promo-main-text">Get 10% off your next stay.</span>
            <span className="promo-terms-link">Terms apply</span>
          </div>
        </div>
        <button
          className={`claim-promo-btn ${claimed ? 'claimed' : ''}`}
          onClick={() => setClaimed(!claimed)}
        >
          {claimed ? 'Claimed' : 'Claim'}
        </button>
      </div>

      {/* Main Reservation Card */}
      <div className="reserve-card">
        <div className="reserve-card-header">
          <div className="price-title-row">
            <span className="price-amount">{currency}28,499</span>
            <span className="price-period">for 5 nights</span>
          </div>
        </div>

        {/* Inputs Border Box */}
        <div className="date-guest-box">
          <div className="dates-row" onClick={onOpenCalendar} role="button" tabIndex={0}>
            <div className="date-cell check-in-cell">
              <span className="cell-label">CHECK-IN</span>
              <span className="cell-value">{currentCheckIn}</span>
            </div>
            <div className="date-cell check-out-cell">
              <span className="cell-label">CHECKOUT</span>
              <span className="cell-value">{currentCheckOut}</span>
            </div>
          </div>

          <div
            className="guests-row"
            onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
            role="button"
            tabIndex={0}
          >
            <div className="guests-cell">
              <span className="cell-label">GUESTS</span>
              <span className="cell-value">{guestLabel}</span>
            </div>
            <div className="guests-arrow">
              {guestDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>
        </div>

        {/* Guest Dropdown */}
        {guestDropdownOpen && (
          <div className="guest-selector-dropdown">
            <div className="guest-row-item">
              <div>
                <p className="guest-type">Adults</p>
                <p className="guest-desc">Age 13+</p>
              </div>
              <div className="stepper-controls">
                <button
                  disabled={guests.adults <= 1}
                  onClick={() => updateGuestCount('adults', -1)}
                  className="stepper-btn"
                >
                  <Minus size={14} />
                </button>
                <span className="stepper-val">{guests.adults}</span>
                <button
                  disabled={totalGuests >= 3}
                  onClick={() => updateGuestCount('adults', 1)}
                  className="stepper-btn"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="guest-row-item">
              <div>
                <p className="guest-type">Children</p>
                <p className="guest-desc">Ages 2–12</p>
              </div>
              <div className="stepper-controls">
                <button
                  disabled={guests.children <= 0}
                  onClick={() => updateGuestCount('children', -1)}
                  className="stepper-btn"
                >
                  <Minus size={14} />
                </button>
                <span className="stepper-val">{guests.children}</span>
                <button
                  disabled={totalGuests >= 3}
                  onClick={() => updateGuestCount('children', 1)}
                  className="stepper-btn"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="guest-row-item">
              <div>
                <p className="guest-type">Infants</p>
                <p className="guest-desc">Under 2</p>
              </div>
              <div className="stepper-controls">
                <button
                  disabled={guests.infants <= 0}
                  onClick={() => updateGuestCount('infants', -1)}
                  className="stepper-btn"
                >
                  <Minus size={14} />
                </button>
                <span className="stepper-val">{guests.infants}</span>
                <button
                  disabled={guests.infants >= 2}
                  onClick={() => updateGuestCount('infants', 1)}
                  className="stepper-btn"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="guest-row-item">
              <div>
                <p className="guest-type">Pets</p>
                <p className="guest-desc">Bringing a service animal?</p>
              </div>
              <div className="stepper-controls">
                <button
                  disabled={guests.pets <= 0}
                  onClick={() => updateGuestCount('pets', -1)}
                  className="stepper-btn"
                >
                  <Minus size={14} />
                </button>
                <span className="stepper-val">{guests.pets}</span>
                <button
                  disabled={guests.pets >= 2}
                  onClick={() => updateGuestCount('pets', 1)}
                  className="stepper-btn"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="guest-dropdown-close">
              <button
                className="close-dropdown-btn"
                onClick={() => setGuestDropdownOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Free cancellation banner */}
        <div className="cancellation-promo-badge">
          Free cancellation before <strong>17 October</strong>
        </div>

        {/* CTA Button */}
        <button className="reserve-cta-btn" onClick={handleAction}>
          Reserve
        </button>

        {reservationMade && (
          <div className="reservation-success-msg">
            🎉 Great choice! Dates are available. Frontend demo completed.
          </div>
        )}

        <p className="wont-be-charged-note">You won't be charged yet</p>
      </div>

      {/* Report listing */}
      <div className="report-listing-wrap">
        <button className="report-listing-btn" onClick={onOpenReport}>
          <Flag size={14} fill="#717171" stroke="none" />
          <span>Report this listing</span>
        </button>
      </div>
    </div>
  );
}
