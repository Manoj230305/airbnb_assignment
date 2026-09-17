import React, { useState } from 'react';
import { Plus, Minus, Search } from 'lucide-react';
import './LocationMap.css';

export default function LocationMap({ location }) {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom(prev => Math.min(Number((prev + 0.2).toFixed(1)), 1.8));
  const handleZoomOut = () => setZoom(prev => Math.max(Number((prev - 0.2).toFixed(1)), 0.6));
  const handleReset = () => setZoom(1);

  return (
    <section id="location" className="location-section">
      <h2 className="section-title">Where you’ll be</h2>
      <p className="location-city-subtitle">{location?.city || "Candolim, Goa, India"}</p>

      {/* Styled Interactive Map Container */}
      <div className="map-wrapper">
        <div
          className="map-canvas"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: '49% 55%',
            transition: 'transform 0.3s cubic-bezier(0.2, 0, 0, 1)'
          }}
        >
          <svg
            viewBox="0 0 1000 480"
            preserveAspectRatio="xMidYMid slice"
            className="goa-map-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Drop shadow for house pin */}
              <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.35" />
              </filter>

              {/* Land clip path covering well beyond right edge */}
              <clipPath id="landClip">
                <polygon points="410,0 2500,0 2500,480 225,480" />
              </clipPath>

              {/* Subtle grid on land */}
              <pattern id="mapGrid" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#DFE9DA" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Ocean / Water (Extended background) */}
            <rect x="-500" y="0" width="3000" height="480" fill="#A0C9E3" />

            {/* Land Area */}
            <polygon points="410,0 2500,0 2500,480 225,480" fill="#EBF3E7" />

            {/* Subtle Grid Lines on Land */}
            <rect x="-500" y="0" width="3000" height="480" fill="url(#mapGrid)" clipPath="url(#landClip)" />

            {/* Circle Highlight 1 (Near Shoreline) */}
            <circle cx="305" cy="230" r="42" fill="#C8DEC2" opacity="0.85" />

            {/* Circle Highlight 2 (Right inland) */}
            <circle cx="680" cy="305" r="56" fill="#C8DEC2" opacity="0.85" />

            {/* Center Home Marker Pin */}
            <g transform="translate(490, 265)">
              <circle cx="0" cy="0" r="24" fill="#222222" filter="url(#pinShadow)" />
              {/* House Glyph */}
              <g stroke="#FFFFFF" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" fill="none">
                {/* Roof & Walls */}
                <path d="M -8.5 -1 L 0 -8.5 L 8.5 -1 V 7.5 H -8.5 Z" />
                {/* Inner Arch Door */}
                <path d="M -3.5 7.5 V 2 C -3.5 0.5 3.5 0.5 3.5 2 V 7.5" />
                {/* Baseline */}
                <line x1="-11" y1="9" x2="11" y2="9" strokeWidth="2" />
              </g>
            </g>
          </svg>
        </div>

        {/* Map UI Controls */}
        <div className="map-search-btn-wrap">
          <button
            className="map-circle-btn"
            onClick={handleReset}
            aria-label="Reset map position"
            title="Reset zoom"
          >
            <Search size={16} strokeWidth={1.8} color="#484848" />
          </button>
        </div>

        <div className="map-zoom-controls">
          <button
            className="map-zoom-btn"
            onClick={handleZoomIn}
            aria-label="Zoom in"
          >
            <Plus size={15} strokeWidth={2} color="#484848" />
          </button>
          <div className="zoom-btn-divider" />
          <button
            className="map-zoom-btn"
            onClick={handleZoomOut}
            aria-label="Zoom out"
          >
            <Minus size={15} strokeWidth={2} color="#484848" />
          </button>
        </div>
      </div>

      <p className="exact-location-note">Exact location will be provided after booking.</p>
    </section>
  );
}
