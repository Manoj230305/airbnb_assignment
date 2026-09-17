import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Keyboard } from 'lucide-react';
import './CalendarSection.css';

export default function CalendarSection({ checkInDate, checkOutDate, onSelectDates, onClearDates }) {
  // Default months: October 2026 (index 0) and November 2026 (index 1)
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  const months = [
    { name: 'October', year: 2026, daysInMonth: 31, startDay: 4 }, // Thursday
    { name: 'November', year: 2026, daysInMonth: 30, startDay: 0 }, // Sunday
    { name: 'December', year: 2026, daysInMonth: 31, startDay: 2 }, // Tuesday
    { name: 'January', year: 2027, daysInMonth: 31, startDay: 5 }
  ];

  const month1 = months[currentMonthIndex];
  const month2 = months[currentMonthIndex + 1] || months[months.length - 1];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const isSelectedCheckIn = (m, day) => {
    return checkInDate === '10/18/2026' && m.name === 'October' && day === 18;
  };

  const isSelectedCheckOut = (m, day) => {
    return checkOutDate === '10/23/2026' && m.name === 'October' && day === 23;
  };

  const isInRange = (m, day) => {
    if (checkInDate === '10/18/2026' && checkOutDate === '10/23/2026') {
      return m.name === 'October' && day > 18 && day < 23;
    }
    return false;
  };

  const isBlocked = (m, day) => {
    // In November 2026, days 18-24 are blocked as shown in mockup
    return m.name === 'November' && day >= 18 && day <= 24;
  };

  const handleDateClick = (m, day) => {
    if (isBlocked(m, day)) return;
    const formatted = `${m.name === 'October' ? '10' : '11'}/${day < 10 ? '0' + day : day}/${m.year}`;
    if (!checkInDate || (checkInDate && checkOutDate)) {
      onSelectDates && onSelectDates(formatted, null);
    } else {
      onSelectDates && onSelectDates(checkInDate, formatted);
    }
  };

  const handleClear = () => {
    if (onClearDates) {
      onClearDates();
    }
  };

  const hasSelectedRange = checkInDate === '10/18/2026' && checkOutDate === '10/23/2026';

  const renderMonthGrid = (m) => {
    const cells = [];
    for (let i = 0; i < m.startDay; i++) {
      cells.push(<div key={`empty-${i}`} className="cal-day-cell empty" />);
    }

    for (let day = 1; day <= m.daysInMonth; day++) {
      const checkIn = isSelectedCheckIn(m, day);
      const checkOut = isSelectedCheckOut(m, day);
      const inRange = isInRange(m, day);
      const blocked = isBlocked(m, day);

      cells.push(
        <div
          key={day}
          className={`cal-day-cell-wrap ${inRange ? 'in-range-wrap' : ''} ${checkIn ? 'checkin-wrap' : ''} ${checkOut ? 'checkout-wrap' : ''}`}
        >
          <button
            type="button"
            className={`cal-day-btn ${checkIn ? 'selected-endpoint checkin' : ''} ${checkOut ? 'selected-endpoint checkout' : ''} ${inRange ? 'in-range' : ''} ${blocked ? 'blocked' : ''}`}
            onClick={() => handleDateClick(m, day)}
            disabled={blocked}
          >
            {day}
          </button>
        </div>
      );
    }
    return cells;
  };

  return (
    <section className="calendar-section" id="calendar">
      <div className="calendar-header-block">
        <h2 className="calendar-main-title">
          {hasSelectedRange ? '5 nights in Candolim' : checkInDate ? 'Select checkout date' : 'Select check-in date'}
        </h2>
        <p className="calendar-sub-title">
          {hasSelectedRange ? '18 Oct 2026 - 23 Oct 2026' : 'Add your travel dates for exact pricing'}
        </p>
      </div>

      <div className="calendar-nav-row">
        <button
          type="button"
          className="cal-chevron-btn prev-btn"
          disabled={currentMonthIndex === 0}
          onClick={() => setCurrentMonthIndex(Math.max(0, currentMonthIndex - 1))}
          aria-label="Previous month"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>

        <div className="month-names-header-row">
          <h3 className="month-label">{month1.name} {month1.year}</h3>
          <h3 className="month-label">{month2.name} {month2.year}</h3>
        </div>

        <button
          type="button"
          className="cal-chevron-btn next-btn"
          disabled={currentMonthIndex >= months.length - 2}
          onClick={() => setCurrentMonthIndex(Math.min(months.length - 2, currentMonthIndex + 1))}
          aria-label="Next month"
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="two-months-container">
        {/* Month 1 */}
        <div className="single-month-col">
          <div className="cal-weekdays-row">
            {daysOfWeek.map((d, i) => (
              <span key={i} className="weekday-col-label">{d}</span>
            ))}
          </div>
          <div className="cal-days-grid">
            {renderMonthGrid(month1)}
          </div>
        </div>

        {/* Month 2 */}
        <div className="single-month-col">
          <div className="cal-weekdays-row">
            {daysOfWeek.map((d, i) => (
              <span key={i} className="weekday-col-label">{d}</span>
            ))}
          </div>
          <div className="cal-days-grid">
            {renderMonthGrid(month2)}
          </div>
        </div>
      </div>

      <div className="calendar-footer-toolbar">
        <button type="button" className="keyboard-icon-btn" aria-label="Keyboard shortcuts">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#222222" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2.5" />
            <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 16h10" />
          </svg>
        </button>

        <button type="button" className="cal-clear-dates-btn" onClick={handleClear}>
          Clear dates
        </button>
      </div>
    </section>
  );
}
