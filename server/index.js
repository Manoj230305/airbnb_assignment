import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { store } from './data/store.js';

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

// Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.originalUrl}`);
  next();
});

// Serve static frontend assets unconditionally from dist
app.use(express.static(distPath));

// API Explorer Dashboard (available at /api)
app.get('/api', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Airbnb Clone API Server</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f7f7f7; color: #222; margin: 0; padding: 40px 20px; }
        .card { max-width: 640px; margin: 0 auto; background: white; border-radius: 12px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        h1 { color: #FF385C; margin-top: 0; display: flex; align-items: center; gap: 10px; font-size: 24px; }
        .badge { background: #E8F5E9; color: #2E7D32; font-size: 12px; padding: 4px 8px; border-radius: 12px; font-weight: 600; }
        p { color: #555; line-height: 1.5; }
        ul { list-style: none; padding: 0; margin: 20px 0; }
        li { margin: 12px 0; padding: 12px; border: 1px solid #eee; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; }
        a { color: #FF385C; text-decoration: none; font-weight: 600; }
        a:hover { text-decoration: underline; }
        .method { background: #E3F2FD; color: #1976D2; font-size: 11px; padding: 3px 6px; border-radius: 4px; font-weight: 700; margin-right: 8px; }
        .method.post { background: #FFF3E0; color: #E65100; }
        .desc { font-size: 13px; color: #777; }
        .btn-ui { display: inline-block; background: #FF385C; color: white; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 10px; }
        .btn-ui:hover { background: #E00B41; color: white; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🚀 Airbnb Clone API <span class="badge">Running</span></h1>
        <p>The Node.js + Express backend is live. Below are the available REST endpoints:</p>
        <ul>
          <li>
            <div>
              <span class="method">GET</span>
              <a href="/api/listing" target="_blank">/api/listing</a>
            </div>
            <span class="desc">Listing details & booked dates</span>
          </li>
          <li>
            <div>
              <span class="method">GET</span>
              <a href="/api/availability" target="_blank">/api/availability</a>
            </div>
            <span class="desc">Calendar blocked ranges</span>
          </li>
          <li>
            <div>
              <span class="method">GET</span>
              <a href="/api/reviews" target="_blank">/api/reviews</a>
            </div>
            <span class="desc">Guest reviews & ratings</span>
          </li>
          <li>
            <div>
              <span class="method">GET</span>
              <a href="/api/health" target="_blank">/api/health</a>
            </div>
            <span class="desc">Server uptime & status</span>
          </li>
          <li>
            <div>
              <span class="method post">POST</span>
              <code>/api/reserve</code>
            </div>
            <span class="desc">Creates booking & blocks dates</span>
          </li>
        </ul>
        <a class="btn-ui" href="http://localhost:5173" target="_blank">Open React UI (Port 5173) &rarr;</a>
      </div>
    </body>
    </html>
  `);
});

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    uptime: `${Math.round(process.uptime())}s`
  });
});

// 2. Get Listing details with up-to-date rating & blocked availability
app.get('/api/listing', (req, res) => {
  try {
    const listing = store.getListing();
    const availability = store.getAvailability();
    res.json({
      success: true,
      data: {
        ...listing,
        blockedRanges: availability.blockedRanges
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Get Availability / Blocked calendar dates
app.get('/api/availability', (req, res) => {
  try {
    const availability = store.getAvailability();
    res.json({ success: true, data: availability });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Create a Reservation
app.post('/api/reserve', (req, res) => {
  try {
    const { checkInDate, checkOutDate, guests, guestName, promoApplied } = req.body;

    if (!checkInDate || !checkOutDate) {
      return res.status(400).json({
        success: false,
        error: 'Both checkInDate and checkOutDate are required (e.g. MM/DD/YYYY)'
      });
    }

    const reservation = store.createReservation({
      checkInDate,
      checkOutDate,
      guests,
      guestName,
      promoApplied
    });

    res.status(201).json({
      success: true,
      message: 'Reservation confirmed successfully!',
      data: reservation
    });
  } catch (err) {
    const status = err.statusCode || 400;
    res.status(status).json({ success: false, error: err.message });
  }
});

// 5. Get Reviews (with optional keyword search & sort)
app.get('/api/reviews', (req, res) => {
  try {
    const { search, sort } = req.query;
    const reviews = store.getReviews(search, sort);
    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Post a New Review
app.post('/api/reviews', (req, res) => {
  try {
    const { author, rating, text } = req.body;
    const review = store.addReview({ author, rating, text });
    res.status(201).json({
      success: true,
      message: 'Review posted successfully!',
      data: review,
      listing: {
        rating: store.data.listing.rating,
        reviewsCount: store.data.listing.reviewsCount
      }
    });
  } catch (err) {
    const status = err.statusCode || 400;
    res.status(status).json({ success: false, error: err.message });
  }
});

// 7. Contact Host Inquiry
app.post('/api/inquiries', (req, res) => {
  try {
    const { guestName, email, message, dates } = req.body;
    if (!message || !email) {
      return res.status(400).json({ success: false, error: 'Email and message are required.' });
    }

    res.status(200).json({
      success: true,
      message: `Thanks ${guestName || 'Traveler'}! Host Mirashya Homes has received your message${dates ? ` for ${dates}` : ''} and usually responds within an hour.`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// SPA client fallback (compatible with Express 5 wildcard routing)
app.get('{*splat}', (req, res) => {
  const indexHtml = path.join(distPath, 'index.html');
  if (fs.existsSync(indexHtml)) {
    res.sendFile(indexHtml);
  } else {
    res.redirect('/api');
  }
});

// Start listening (in standalone / persistent server mode)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`🚀 Airbnb Full-Stack Server listening on http://localhost:${PORT}`);
    console.log(`📁 Client Bundle: ${fs.existsSync(distPath) ? 'Serving production /dist' : 'Dev mode (dist not built)'}`);
    console.log(`📡 Endpoints available:`);
    console.log(`   - GET  /api/health`);
    console.log(`   - GET  /api/listing`);
    console.log(`   - GET  /api/availability`);
    console.log(`   - POST /api/reserve`);
    console.log(`   - GET  /api/reviews`);
    console.log(`   - POST /api/reviews`);
    console.log(`   - POST /api/inquiries`);
    console.log(`========================================`);
  });
}

export default app;
