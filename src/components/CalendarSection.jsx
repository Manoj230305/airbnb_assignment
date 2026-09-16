import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './CalendarSection.css';

export default function CalendarSection({ checkInDate, checkOutDate, onSelectDates, onClearDates }) {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // 0 = Sept 2026, 1 = Oct 2026

  const months = [
    { name: "September", year: 2026, daysInMonth: 30, startDay: 2 }, // Tuesday
    { name: "October", year: 2026, daysInMonth: 31, startDay: 4 }, // Thursday
    { name: "November", year: 2026, daysInMonth: 30, startDay: 0 }, // Sunday
    { name: "December", year: 2026, daysInMonth: 31, startDay: 2 }, // Tuesday
  ];

  const month1 = months[currentMonthIndex];
  const month2 = months[currentMonthIndex + 1] || months[months.length - 1];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handleDateClick = (year, monthName, day) => {
    const formatted = `${monthName.slice(0, 3)} ${day}, ${year}`;
    if (!checkInDate || (checkInDate && checkOutDate)) {
      onSelectDates(formatted, null);
    } else {
      onSelectDates(checkInDate, formatted);
    }
  };

  const renderMonth = (m) => {
    const cells = [];
    for (let i = 0; i < m.startDay; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-day empty" />);
    }
    for (let day = 1; day <= m.daysInMonth; day++) {
      const formatted = `${m.name.slice(0, 3)} ${day}, ${m.year}`;
      const isCheckIn = checkInDate === formatted;
      const isCheckOut = checkOutDate === formatted;
      const isSelected = isCheckIn || isCheckOut;

      cells.push(
        <button
          key={day}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${isCheckIn ? 'check-in' : ''} ${isCheckOut ? 'check-out' : ''}`}
          onClick={() => handleDateClick(m.year, m.name, day)}
        >
          {day}
        </button>
      );
    }
    return cells;
  };

  return (
    <div className="calendar-section" id="calendar">
      <h2 className="section-title">
        {checkInDate && checkOutDate ? 'Trip dates selected' : 'Select check-in date'}
      </h2>
      <p className="calendar-subtitle text-muted">
        {checkInDate && checkOutDate
          ? `${checkInDate} - ${checkOutDate}`
          : 'Add your travel dates for exact pricing'}
      </p>

      <div className="calendar-controls">
        <button
          className="calendar-arrow-btn"
          disabled={currentMonthIndex === 0}
          onClick={() => setCurrentMonthIndex(Math.max(0, currentMonthIndex - 1))}
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          className="calendar-arrow-btn"
          disabled={currentMonthIndex >= months.length - 2}
          onClick={() => setCurrentMonthIndex(Math.min(months.length - 2, currentMonthIndex + 1))}
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="two-month-grid">
        {/* Month 1 */}
        <div className="month-column">
          <h3 className="month-heading">{month1.name} {month1.year}</h3>
          <div className="days-header-row">
            {daysOfWeek.map((d, i) => (
              <span key={i} className="day-header">{d}</span>
            ))}
          </div>
          <div className="days-grid">
            {renderMonth(month1)}
          </div>
        </div>

        {/* Month 2 */}
        <div className="month-column">
          <h3 className="month-heading">{month2.name} {month2.year}</h3>
          <div className="days-header-row">
            {daysOfWeek.map((d, i) => (
              <span key={i} className="day-header">{d}</span>
            ))}
          </div>
          <div className="days-grid">
            {renderMonth(month2)}
          </div>
        </div>
      </div>

      <div className="calendar-footer-row">
        <button className="clear-dates-btn" onClick={onClearDates}>
          Clear dates
        </button>
      </div>
    </div>
  );
}
