import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getInitialData } from './initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

class Store {
  constructor() {
    this.data = null;
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
      } else {
        this.reset();
      }
    } catch (err) {
      console.warn('[DB] Failed reading db.json, resetting to initial seed:', err.message);
      this.reset();
    }
  }

  reset() {
    this.data = getInitialData();
    this.save();
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[DB] Error writing to db.json:', err.message);
    }
  }

  getListing() {
    return {
      ...this.data.listing,
      reviewsCount: this.data.reviews.length,
      reviews: this.data.reviews
    };
  }

  getAvailability() {
    return {
      blockedRanges: this.data.reservations.map(r => ({
        id: r.id,
        start: r.start,
        end: r.end
      })),
      reservationsCount: this.data.reservations.length
    };
  }

  isRangeAvailable(checkIn, checkOut) {
    const inTime = new Date(checkIn).getTime();
    const outTime = new Date(checkOut).getTime();

    if (isNaN(inTime) || isNaN(outTime) || inTime >= outTime) {
      return { valid: false, reason: 'Invalid date range' };
    }

    for (const res of this.data.reservations) {
      const resStart = new Date(res.start).getTime();
      const resEnd = new Date(res.end).getTime();

      // Check date overlap
      if (inTime < resEnd && outTime > resStart) {
        return {
          valid: false,
          reason: `Dates overlap with an existing booking (${res.start} - ${res.end})`
        };
      }
    }

    return { valid: true };
  }

  createReservation({ checkInDate, checkOutDate, guests, guestName = 'Guest Traveler', promoApplied = false }) {
    const checkAvailability = this.isRangeAvailable(checkInDate, checkOutDate);
    if (!checkAvailability.valid) {
      const error = new Error(checkAvailability.reason);
      error.statusCode = 400;
      throw error;
    }

    const inTime = new Date(checkInDate).getTime();
    const outTime = new Date(checkOutDate).getTime();
    const nights = Math.round((outTime - inTime) / (1000 * 60 * 60 * 24));

    const nightlyRate = this.data.listing.nightlyPrice || 5699;
    const baseSubtotal = nightlyRate * nights;
    const discount = promoApplied ? Math.round(baseSubtotal * 0.10) : 0;
    const cleaningFee = 1200;
    const serviceFee = Math.round(baseSubtotal * 0.08);
    const taxes = Math.round((baseSubtotal - discount + cleaningFee + serviceFee) * 0.12);
    const totalAmount = (baseSubtotal - discount) + cleaningFee + serviceFee + taxes;

    const reservation = {
      id: `BK-${Date.now().toString(36).toUpperCase()}`,
      start: checkInDate,
      end: checkOutDate,
      nights,
      guests: guests || { adults: 2, children: 0, infants: 0, pets: 0 },
      guestName,
      pricing: {
        nightlyRate,
        nights,
        baseSubtotal,
        discount,
        cleaningFee,
        serviceFee,
        taxes,
        totalAmount,
        currency: this.data.listing.currency || '₹'
      },
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    this.data.reservations.push(reservation);
    this.save();

    return reservation;
  }

  getReviews(query = '', sort = 'newest') {
    let list = [...this.data.reviews];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(r => r.text.toLowerCase().includes(q) || r.author.toLowerCase().includes(q));
    }

    if (sort === 'highest') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'lowest') {
      list.sort((a, b) => a.rating - b.rating);
    }

    return list;
  }

  addReview({ author, rating = 5, text }) {
    if (!author || !text) {
      const error = new Error('Author and review text are required');
      error.statusCode = 400;
      throw error;
    }

    const initials = author.trim().charAt(0).toUpperCase();
    const newReview = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      tenure: 'Guest on Airbnb',
      rating: Number(rating) || 5,
      date: 'Just now',
      initial: initials,
      avatarBg: '#E0F2FE',
      textColor: '#0369A1',
      text: text.trim()
    };

    this.data.reviews.unshift(newReview);

    // Recalculate listing rating
    const avg = (
      this.data.reviews.reduce((acc, r) => acc + r.rating, 0) / this.data.reviews.length
    ).toFixed(2);
    this.data.listing.rating = Number(avg);
    this.data.listing.reviewsCount = this.data.reviews.length;

    this.save();
    return newReview;
  }
}

export const store = new Store();
