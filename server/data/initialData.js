import { listingData } from '../../src/data/listingData.js';

export const initialBlockedRanges = [
  {
    id: 'res-seed-1',
    start: '11/18/2026',
    end: '11/24/2026',
    guestName: 'Private Host Block',
    guests: { adults: 2, children: 0, infants: 0, pets: 0 },
    status: 'confirmed',
    createdAt: '2026-09-01T10:00:00.000Z'
  }
];

export const getInitialData = () => ({
  listing: { ...listingData },
  reservations: [...initialBlockedRanges],
  reviews: [...listingData.reviews]
});
