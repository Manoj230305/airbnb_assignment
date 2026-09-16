import React, { useState } from 'react';
import { Plus, Minus, Maximize2, Search, ChevronRight } from 'lucide-react';
import './LocationMap.css';

export default function LocationMap({ location }) {
  const [zoom, setZoom] = useState(1);
  const [showMoreHighlights, setShowMoreHighlights] = useState(false);

  return (
    <section id="location" className="location-section">
      <h2 className="section-title">Where you’ll be</h2>
      <p className="location-city-subtitle">{location.city}</p>

      {/* Styled Interactive Map Container */}
      <div className="map-wrapper">
        <div
          className="map-canvas"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: '55% 55%',
            transition: 'transform 0.3s ease-out'
          }}
        >
          {/* Custom SVG Stylized Map of Goa Coastal Area */}
          <svg
            viewBox="0 0 1000 480"
            className="goa-map-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="oceanGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#C4E7F8" />
                <stop offset="35%" stopColor="#D4EEF9" />
                <stop offset="100%" stopColor="#C8EAF8" />
              </linearGradient>
            </defs>

            {/* Arabian Sea */}
            <rect width="1000" height="480" fill="url(#oceanGrad)" />

            {/* Landmass of North Goa */}
            <path
              d="M380,0 Q430,70 415,130 Q390,190 440,240 Q475,270 470,330 Q460,380 500,430 Q540,480 600,480 L1000,480 L1000,0 Z"
              fill="#E8ECE1"
            />

            {/* River Mandovi */}
            <path
              d="M470,330 Q540,345 610,340 Q710,330 800,350 Q900,340 1000,360 L1000,390 Q850,370 700,370 Q580,380 490,370 Z"
              fill="#D4EEF9"
            />

            {/* Major Roads */}
            <path
              d="M420,0 Q480,100 530,160 Q570,240 580,340 Q590,420 620,480"
              stroke="#FFFFFF"
              strokeWidth="5"
              fill="none"
            />
            <path
              d="M420,0 Q480,100 530,160 Q570,240 580,340 Q590,420 620,480"
              stroke="#FAD082"
              strokeWidth="2.5"
              fill="none"
            />

            {/* Road to Candolim */}
            <path
              d="M440,240 Q490,260 550,250 Q600,245 700,250"
              stroke="#FFFFFF"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M440,240 Q490,260 550,250 Q600,245 700,250"
              stroke="#FAD082"
              strokeWidth="2"
              fill="none"
            />

            {/* Road network links */}
            <path
              d="M470,280 L520,330 L600,310"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              fill="none"
            />
            <path
              d="M470,280 L520,330 L600,310"
              stroke="#FAD082"
              strokeWidth="1.8"
              fill="none"
            />

            {/* Towns & Labels */}
            <text x="360" y="80" fill="#E65100" fontSize="13" fontWeight="600">
              Burger Factory 🍴
            </text>
            <text x="360" y="115" fill="#2E7D32" fontSize="13" fontWeight="600">
              Anjuna Beach 🏖️
            </text>

            <text x="445" y="220" fill="#4B5563" fontSize="13" fontWeight="600">
              Calangute
            </text>

            <text x="390" y="270" fill="#5B21B6" fontSize="13" fontWeight="600">
              Candolim Beach 📷
            </text>

            <text x="428" y="360" fill="#5B21B6" fontSize="13" fontWeight="600">
              Fort Aguada 📷
            </text>

            <text x="555" y="195" fill="#4B5563" fontSize="13" fontWeight="600">
              Porvorim
            </text>

            <text x="585" y="365" fill="#1F2937" fontSize="14" fontWeight="700">
              Panaji
            </text>

            <text x="605" y="295" fill="#15803D" fontSize="12" fontWeight="600">
              Dr. Salim Ali Bird Sanctuary 🌲
            </text>

            <text x="740" y="340" fill="#4B5563" fontSize="12">
              Old Goa
            </text>

            {/* Home Marker Pin at Candolim */}
            <g transform="translate(485, 275)">
              {/* Pulse ripple */}
              <circle r="36" fill="rgba(34, 34, 34, 0.12)" />
              <circle r="22" fill="#222222" />
              {/* Home Icon in Pin */}
              <path
                d="M-8,-2 L0,-9 L8,-2 L8,7 L4,7 L4,2 L-4,2 L-4,7 L-8,7 Z"
                fill="#FFFFFF"
              />
            </g>
          </svg>
        </div>

        {/* Map UI Controls */}
        <div className="map-search-btn-wrap">
          <button className="map-circle-btn" aria-label="Inspect map">
            <Search size={16} />
          </button>
        </div>

        <div className="map-zoom-controls">
          <button
            className="map-zoom-btn"
            onClick={() => setZoom(Math.min(1.6, zoom + 0.2))}
            aria-label="Zoom in"
          >
            <Plus size={16} />
          </button>
          <div className="zoom-btn-divider" />
          <button
            className="map-zoom-btn"
            onClick={() => setZoom(Math.max(0.8, zoom - 0.2))}
            aria-label="Zoom out"
          >
            <Minus size={16} />
          </button>
        </div>

        <div className="map-fullscreen-btn-wrap">
          <button
            className="map-circle-btn"
            onClick={() => setZoom(1)}
            aria-label="Reset zoom"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      <p className="exact-location-note">{location.addressSummary}</p>

      {/* Neighbourhood highlights */}
      <div className="neighborhood-block">
        <h3 className="neighborhood-heading">Neighbourhood highlights</h3>
        <p className="neighborhood-text">{location.highlights}</p>

        {showMoreHighlights && (
          <div className="expanded-neighborhood">
            <ul className="nearby-places-list">
              {location.nearbyPlaces.map((place, idx) => (
                <li key={idx} className="nearby-item">
                  <strong>{place.name}</strong> ({place.type}) — {place.distance}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          className="show-more-neighborhood-btn"
          onClick={() => setShowMoreHighlights(!showMoreHighlights)}
        >
          <span>{showMoreHighlights ? 'Show less' : 'Show more'}</span>
          <ChevronRight
            size={16}
            strokeWidth={2.4}
            style={{ transform: showMoreHighlights ? 'rotate(-90deg)' : 'none' }}
          />
        </button>
      </div>
    </section>
  );
}
