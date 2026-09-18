# Airbnb Listing Clone (Full-Stack React + Node.js)

A recreation of an Airbnb property listing detail page based on a real stay in Candolim, Goa 

The goal of this project was to capture the UX, micro-interactions, and visual polish of Airbnb's production web app—from sticky scroll-spy navigation and photo tour modals to dynamic pricing calculations and date collision checking—backed by a lightweight Node.js Express API.

---

## What's Inside

- **Frontend:** React 19 bootstrapped with Vite, Lucide icons, and handcrafted CSS. No heavyweight component frameworks (Tailwind, MUI, etc.) were used, allowing full control over Airbnb's typography, spacing scales, modals, and responsive breakpoints.
- **Backend:** Node.js with Express 5, providing REST endpoints for listing data, real-time date availability, review submissions, and booking reservations with overlap detection.
- **Data Layer:** In-memory store with file-backed JSON persistence (`server/data/db.json`). Automatically seeds itself on first launch and heals itself if the database file is corrupted or deleted.
- **Dev Workflow:** A single `npm run dev` command fires up both the Vite client and the Express backend concurrently, with Vite proxying `/api` requests to eliminate CORS headaches during development.

---

## Key Features & How They Work

### 1. Sticky Navigation & Scroll-Spy (`SubNavbar.jsx`)
As you scroll past the hero photos, a secondary sticky navigation bar slides into view at the top of the screen. It tracks your current scroll position across sections (Photos, Amenities, Reviews, Location) and includes a compact price tag with an inline "Reserve" button that smoothly scrolls you directly to the booking card.

### 2. Photo Gallery & Full Photo Tour Modal
- **Hero Mosaic:** A desktop 5-photo grid layout with subtle hover zooms.
- **Photo Tour Modal:** Clicking "Show all photos" or any gallery image opens an overlay modal. It lets you filter photos by room (Deck & Jacuzzi, Living Room, Bedroom, Exterior, Pool) with keyboard shortcuts (`Esc` to close) and fluid transitions.

### 3. Smart Reservation Engine (`ReserveCard.jsx` & `/api/reserve`)
- **Live Price Calculation:** Automatically derives the total number of nights from check-in and check-out dates, computes the base stay cost, adds the cleaning fee, Airbnb service fee, and local taxes.
- **Promo Discount Toggle:** Features an interactive 10% coupon toggle that updates line-item pricing in real time.
- **Guest Picker:** Custom dropdown counter for Adults, Children, Infants, and Pets, enforcing maximum guest capacity rules.
- **Backend Booking & Overlap Validation:** When you hit "Reserve", the client posts your dates to the Express server. The backend validates date formats, checks whether any day in that range conflicts with existing bookings, writes the confirmed reservation to disk, and returns a confirmation voucher code (e.g., `BK-XXXXXX`).

### 4. Live Calendar & Availability Sync (`CalendarSection.jsx`)
- Displays an interactive dual-month calendar view.
- Renders past dates as disabled.
- Synchronizes with the backend's `/api/availability` endpoint: dates booked via the Reserve card immediately reflect on the calendar as blocked without requiring a manual page refresh.

### 5. Review System with Dynamic Ratings (`ReviewsSection.jsx`)
- Breakdown cards for key rating dimensions: Cleanliness, Accuracy, Communication, Location, Check-in, and Value (4.95 overall).
- Search and sort filters powered by backend query parameters (`/api/reviews?search=pool&sort=highest`).
- "Write a Review" modal that lets guests submit a new review. When submitted, the backend updates the listing's cumulative score and review count in real time.

### 6. Modal Ecosystem
- **Amenities Modal:** Full categorized view (Bathroom, Bedroom & Laundry, Entertainment, Heating & Cooling, Internet & Office, Kitchen, Outdoor, Services) with icons and availability tags.
- **Message Host Modal:** Simulates an inquiry flow to host *Mirashya Homes* with automated response acknowledgment.
- **Share & Rules Modals:** Native link copying to clipboard with confirmation toast, plus dedicated popups for house rules, safety policies, and review guidelines.

---

## Architecture & Project Structure

```text
airbnb_assignment/
├── server/                         # Node.js + Express 5 backend
│   ├── data/
│   │   ├── initialData.js          # Seed listing data, reviews & blocked dates
│   │   ├── store.js                # Atomic JSON file persistence & collision engine
│   │   └── db.json                 # Auto-generated local JSON database
│   └── index.js                    # Express REST routes, CORS & API explorer dashboard
├── src/                            # React 19 Frontend
│   ├── assets/                     # High-res CDN media, logos & SVG icons
│   ├── components/
│   │   ├── Modals/
│   │   │   ├── PhotoTourModal.jsx  # Full-screen categorized room photo tour
│   │   │   ├── AmenitiesModal.jsx  # Categorized amenities sheet with safety items
│   │   │   ├── ReviewsModal.jsx    # Searchable & sortable reviews modal
│   │   │   └── ShareModal.jsx      # Social share links & clipboard copy
│   │   ├── Navbar.jsx              # Main search header & responsive mobile pill
│   │   ├── SubNavbar.jsx           # Sticky scroll-spy navigation with live price
│   │   ├── TitleSection.jsx        # Property title, badges, save & share actions
│   │   ├── PhotoGallery.jsx        # 5-photo desktop mosaic & mobile hero image
│   │   ├── Overview.jsx            # Property type, room specs & guest favorite badge
│   │   ├── HostPreview.jsx         # Host avatar, co-hosts & tenure badge
│   │   ├── Highlights.jsx          # Feature perks (Jacuzzi, A/C, Self check-in)
│   │   ├── Description.jsx         # Expandable narrative with "Show more" toggle
│   │   ├── SleepingArrangements.jsx# Bedroom & living room bed configurations
│   │   ├── Amenities.jsx           # Top 10 featured amenities with Lucide icons
│   │   ├── CalendarSection.jsx     # Dual-month interactive date & availability picker
│   │   ├── ReserveCard.jsx         # Booking engine with live price math & API reservation
│   │   ├── ReviewsSection.jsx      # Rating scorecards, keyword tags & guest reviews
│   │   ├── LocationMap.jsx         # Candolim neighborhood overview & distance guide
│   │   ├── MeetYourHost.jsx        # Deep-dive host profile & "Message Host" modal
│   │   ├── ThingsToKnow.jsx        # House rules, safety checklist & cancellation policy
│   │   ├── MoreStays.jsx           # Carousel of similar stays in Candolim & Goa
│   │   └── Footer.jsx              # Airbnb-style multi-tier footer
│   ├── data/
│   │   ├── listingData.js          # Core listing schema, host info & reviews seed
│   │   └── photoTourData.js        # Grouped photo tour rooms & image metadata
│   ├── App.jsx                     # State coordinator (API sync, calendar blocking, mobile bar)
│   ├── App.css                     # Main layout grid, mobile bar & responsive rules
│   ├── index.css                   # Custom design system tokens, typography & reset
│   └── main.jsx                    # React DOM root entry point
├── package.json                    # Concurrently script ("dev") & dependencies
├── vite.config.js                  # Vite dev server with reverse proxy (/api -> :5000)
└── PROMPTS.txt                     # Prompt engineering log & developer specifications
```

---

## REST API Reference

The backend runs on `http://localhost:5000`. Opening the root URL `http://localhost:5000/` in your browser will display an interactive API directory page.

| Method | Endpoint | Description | Query / Body Payload |
|---|---|---|---|
| `GET` | `/api/health` | Health check, server uptime, and timestamp | None |
| `GET` | `/api/listing` | Complete listing details, amenities, host profile, and blocked ranges | None |
| `GET` | `/api/availability` | Blocked date ranges and total active reservations | None |
| `POST` | `/api/reserve` | Validates dates, checks for collisions, and creates a reservation | `{ checkInDate, checkOutDate, guests, guestName, promoApplied }` |
| `GET` | `/api/reviews` | Returns reviews list with optional filtering and sorting | `?search=clean&sort=highest` |
| `POST` | `/api/reviews` | Submits a guest review and recalculates property rating | `{ author, rating, text }` |
| `POST` | `/api/inquiries` | Sends an inquiry message to the property host | `{ guestName, email, message, dates }` |

### Sample Reservation Request:
```bash
curl -X POST http://localhost:5000/api/reserve \
  -H "Content-Type: application/json" \
  -d '{
    "checkInDate": "12/01/2026",
    "checkOutDate": "12/05/2026",
    "guests": { "adults": 2, "children": 0, "infants": 0, "pets": 0 },
    "guestName": "Alex traveler",
    "promoApplied": true
  }'
```

---

## Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (comes with Node)

### Installation
Clone the repository and install all dependencies:
```bash
git clone https://github.com/<your-username>/airbnb_assignment.git
cd airbnb_assignment
npm install
```

### Running Locally
To launch both the React client and the Express API together:
```bash
npm run dev
```

Once running:
- **Web App (Vite):** [http://localhost:5173](http://localhost:5173)
- **API Server (Express):** [http://localhost:5000](http://localhost:5000)

### Individual Scripts
If you want to run or debug services independently:
- `npm run dev:client` — Runs only the Vite frontend on port 5173.
- `npm run server` — Runs only the Express backend on port 5000.
- `npm run build` — Compiles the React frontend for production into `dist/`.
- `npm run preview` — Locally previews the production build.
- `npm run lint` — Runs `oxlint` for lightning-fast JavaScript and React linting.

---

## Technical Details & Design Decisions

1. **Why Pure CSS instead of a CSS Framework?**  
   Airbnb's design language relies heavily on subtle details: `0.5px` border dividers, custom box shadows (`0 6px 20px rgba(0,0,0,0.2)`), circular icon button states, and smooth modal slide-ins. Writing custom CSS allowed mimicking these exact specs without wrestling against utility-class overrides.

2. **Decoupled API Proxying:**  
   In `vite.config.js`, requests starting with `/api` are automatically proxied to `http://localhost:5000`. This mirrors real-world production setups (like Nginx or Cloudflare routing) and keeps frontend code clean: the client simply calls `fetch('/api/reserve')` without hardcoding ports or dealing with CORS headers in development.

3. **Date Overlap Prevention:**  
   The reservation algorithm in `server/data/store.js` parses incoming date strings into timestamps and cross-checks them against every existing booking. If any requested day falls within an already reserved block, the server returns an HTTP `400` status with a descriptive conflict message, preventing double-bookings.

4. **Resilient Data Store:**  
   The backend uses an atomic JSON store (`server/data/store.js`). On startup, it checks for `server/data/db.json`. If missing, it automatically creates it with pre-populated listings, reviews, and test reservations from `initialData.js`, making onboarding zero-config for new developers.

