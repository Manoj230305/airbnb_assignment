import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import './MoreStays.css';

import s1 from '../assets/footer/s1.jpeg';
import s2 from '../assets/footer/s2.jpeg';
import s3 from '../assets/footer/s3.jpeg';
import s4 from '../assets/footer/s4.jpeg';
import s5 from '../assets/footer/s5.jpeg';
import s6 from '../assets/footer/s6.jpeg';

export const moreStaysList = [
  {
    id: 1,
    title: "Beautiful Studio with a view to die for",
    price: "₹23,600",
    rating: "4.91",
    image: s1
  },
  {
    id: 2,
    title: "NAQAB - 1bhk with private pool",
    price: "₹42,218",
    rating: "4.95",
    image: s2
  },
  {
    id: 3,
    title: "Greentique Luxury Flat with plunge pool, Calangute",
    price: "₹44,506",
    rating: "4.94",
    image: s3
  },
  {
    id: 4,
    title: "The Tropical Studio | 5 mins to Beach",
    price: "₹22,824",
    rating: "4.96",
    image: s4
  },
  {
    id: 5,
    title: "Luxury Casa Bella 1BHK with plunge pool, Calangute",
    price: "₹39,942",
    rating: "4.95",
    image: s5
  },
  {
    id: 6,
    title: "Serene Palms Villa with Private Jacuzzi, Candolim",
    price: "₹31,450",
    rating: "4.98",
    image: s6
  },
  {
    id: 7,
    title: "Sunset Horizon 2BHK Sea-View Penthouse",
    price: "₹48,900",
    rating: "4.92",
    image: s1
  },
  {
    id: 8,
    title: "The Bohemian Courtyard Suite with Plunge Pool",
    price: "₹27,300",
    rating: "4.89",
    image: s2
  },
  {
    id: 9,
    title: "Heritage Portuguese Villa with Garden Oasis",
    price: "₹52,000",
    rating: "4.97",
    image: s3
  }
];

export default function MoreStays({ stays = moreStaysList }) {
  const [page, setPage] = useState(1);
  const totalPages = 2; // Slide 1 shows cards 1 to 5, Slide 2 shows cards 5 to 9

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <section className="more-stays-section page-container">
      <div className="more-stays-header">
        <h2 className="more-stays-title">More stays nearby</h2>

        <div className="more-stays-pagination">
          <span className="pagination-text">{page} / {totalPages}</span>
          <button
            className="carousel-nav-btn"
            onClick={handlePrev}
            disabled={page === 1}
            aria-label="Previous stays"
          >
            <ChevronLeft size={16} strokeWidth={2.2} />
          </button>
          <button
            className="carousel-nav-btn"
            onClick={handleNext}
            disabled={page === totalPages}
            aria-label="Next stays"
          >
            <ChevronRight size={16} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <div className="more-stays-carousel-viewport">
        <div className={`more-stays-track ${page === 2 ? 'slide-page-2' : 'slide-page-1'}`}>
          {stays.map((stay) => (
            <div key={stay.id} className="stay-card" tabIndex={0} role="article">
              <div className="stay-img-wrapper">
                <img
                  src={stay.image}
                  alt={stay.title}
                  className="stay-img"
                  loading="lazy"
                />
              </div>
              <div className="stay-info">
                <h3 className="stay-title">{stay.title}</h3>
                <div className="stay-meta">
                  <span className="stay-price">{stay.price}</span>
                  <span className="stay-rating">
                    <Star size={12} fill="#222222" stroke="none" className="star-icon" />
                    <span>{stay.rating}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
