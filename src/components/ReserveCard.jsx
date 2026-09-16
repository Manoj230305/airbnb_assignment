import React, { useState } from 'react';
import { Tag, ChevronDown, ChevronUp, Flag, Star, Minus, Plus } from 'lucide-react';
import './ReserveCard.css';

export default function ReserveCard({
  nightlyPrice,
  currency,
  rating,
  reviewsCount,
  checkInDate,
  checkOutDate,
  onOpenCalendar,
  onOpenReport
}) {
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 });
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [reservationMade, setReservationMade] = useState(false);

  const totalGuests = guests.adults + guests.children;
  const guestLabel = `${totalGuests} guest${totalGuests > 1 ? 's' : ''}${
    guests.infants > 0 ? `, ${guests.infants} infant${guests.infants > 1 ? 's' : ''}` : ''
  }${guests.pets > 0 ? `, ${guests.pets} pet${guests.pets > 1 ? 's' : ''}` : ''}`;

  const hasDates = checkInDate && checkOutDate;
  const nights = hasDates ? 3 : 0; // Default estimate 3 nights
  const discountMultiplier = claimed ? 0.9 : 1.0;
  const effectiveNightlyPrice = Math.round(nightlyPrice * discountMultiplier);
  const basePrice = effectiveNightlyPrice * (nights || 1);
  const cleaningFee = 850;
  const serviceFee = Math.round(basePrice * 0.12);
  const totalPrice = basePrice + cleaningFee + serviceFee;

  const updateGuestCount = (type, delta) => {
    setGuests(prev => {
      const current = prev[type];
      const updated = Math.max(type === 'adults' ? 1 : 0, current + delta);
      // max 3 guests total for adults+children
      if (type === 'adults' || type === 'children') {
        const other = type === 'adults' ? prev.children : prev.adults;
        if (updated + other > 3) return prev;
      }
      return { ...prev, [type]: updated };
    });
  };

  const handleAction = () => {
    if (!hasDates) {
      onOpenCalendar();
    } else {
      setReservationMade(true);
    }
  };

  return (
    <div className="reserve-sidebar-sticky">
      {/* 10% Off Promo Tag Box */}
      <div className="promo-tag-card">
        <div className="promo-left">
          <div className="tag-icon-circle">
            <Tag size={18} fill="#2E7D32" color="#2E7D32" />
          </div>
          <div className="promo-text-wrap">
            <span className="promo-main-text">Take 10% off your next stay.</span>
            <span className="promo-terms-link">Terms apply</span>
          </div>
        </div>
        <button
          className={`claim-promo-btn ${claimed ? 'claimed' : ''}`}
          onClick={() => setClaimed(!claimed)}
        >
          {claimed ? 'Applied' : 'Claim'}
        </button>
      </div>

      {/* Main Reservation Card */}
      <div className="reserve-card">
        <div className="reserve-card-header">
          {hasDates ? (
            <div className="price-title-row">
              <span className="price-amount">{currency}{effectiveNightlyPrice.toLocaleString('en-IN')}</span>
              <span className="price-period"> night</span>
              {claimed && <span className="discount-badge">10% OFF</span>}
            </div>
          ) : (
            <h3 className="add-dates-title">Add dates for prices</h3>
          )}
        </div>

        {/* Inputs Border Box */}
        <div className="date-guest-box">
          <div className="dates-row" onClick={onOpenCalendar} role="button" tabIndex={0}>
            <div className="date-cell check-in-cell">
              <span className="cell-label">CHECK-IN</span>
              <span className={`cell-value ${!checkInDate ? 'placeholder' : ''}`}>
                {checkInDate || 'Add date'}
              </span>
            </div>
            <div className="date-cell check-out-cell">
              <span className="cell-label">CHECKOUT</span>
              <span className={`cell-value ${!checkOutDate ? 'placeholder' : ''}`}>
                {checkOutDate || 'Add date'}
              </span>
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

        {/* CTA Button */}
        <button className="btn-primary reserve-cta-btn" onClick={handleAction}>
          {hasDates ? 'Reserve' : 'Check availability'}
        </button>

        {reservationMade && (
          <div className="reservation-success-msg">
            🎉 Great choice! Dates are available. Frontend demo completed.
          </div>
        )}

        {hasDates && (
          <div className="price-calculation-breakdown">
            <p className="wont-be-charged-note">You won't be charged yet</p>
            <div className="calc-row">
              <span className="calc-label underline-link">
                {currency}{effectiveNightlyPrice.toLocaleString('en-IN')} x {nights} nights
              </span>
              <span className="calc-val">{currency}{basePrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="calc-row">
              <span className="calc-label underline-link">Cleaning fee</span>
              <span className="calc-val">{currency}{cleaningFee.toLocaleString('en-IN')}</span>
            </div>
            <div className="calc-row">
              <span className="calc-label underline-link">Airbnb service fee</span>
              <span className="calc-val">{currency}{serviceFee.toLocaleString('en-IN')}</span>
            </div>
            <div className="calc-divider" />
            <div className="calc-row total-row">
              <span className="total-label">Total before taxes</span>
              <span className="total-val">{currency}{totalPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Report listing */}
      <div className="report-listing-wrap">
        <button className="report-listing-btn" onClick={onOpenReport}>
          <Flag size={14} />
          <span>Report this listing</span>
        </button>
      </div>
    </div>
  );
}
