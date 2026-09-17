import React, { useState, useEffect } from 'react';
import { listingData } from './data/listingData';
import Navbar from './components/Navbar';
import SubNavbar from './components/SubNavbar';
import TitleSection from './components/TitleSection';
import PhotoGallery from './components/PhotoGallery';
import Overview from './components/Overview';
import HostPreview from './components/HostPreview';
import Highlights from './components/Highlights';
import Description from './components/Description';
import SleepingArrangements from './components/SleepingArrangements';
import Amenities from './components/Amenities';
import CalendarSection from './components/CalendarSection';
import ReserveCard from './components/ReserveCard';
import ReviewsSection from './components/ReviewsSection';
import LocationMap from './components/LocationMap';
import MeetYourHost from './components/MeetYourHost';
import ThingsToKnow from './components/ThingsToKnow';
import MoreStays from './components/MoreStays';

// Modals
import PhotoTourModal from './components/Modals/PhotoTourModal';
import AmenitiesModal from './components/Modals/AmenitiesModal';
import ReviewsModal from './components/Modals/ReviewsModal';
import ShareModal from './components/Modals/ShareModal';

import './App.css';

export default function App() {
  const [showSubNav, setShowSubNav] = useState(false);
  const [checkInDate, setCheckInDate] = useState('10/18/2026');
  const [checkOutDate, setCheckOutDate] = useState('10/23/2026');

  // Modals state
  const [allPhotosOpen, setAllPhotosOpen] = useState(false);
  const [selectedPhotoSection, setSelectedPhotoSection] = useState('living1');
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);
  const [howReviewsModalOpen, setHowReviewsModalOpen] = useState(false);
  const [messageHostModalOpen, setMessageHostModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // Monitor scroll for sticky sub navbar
  useEffect(() => {
    const handleScroll = () => {
      setShowSubNav(window.scrollY > 480);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check if URL opens with photo tour modal
    if (window.location.search.includes('modal=PHOTO_TOUR_SCROLLABLE')) {
      setAllPhotosOpen(true);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 140;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const scrollToCalendar = () => {
    scrollToSection('calendar');
  };

  const scrollToHost = () => {
    scrollToSection('host-section');
  };

  const handleOpenAllPhotos = (section = 'living1') => {
    let sectionId = section;
    if (typeof section === 'number') {
      if (section === 0) sectionId = 'living1';
      else if (section === 1 || section === 3) sectionId = 'living2';
      else if (section === 2) sectionId = 'bedroom';
      else if (section === 4) sectionId = 'exterior';
      else sectionId = 'living1';
    }
    setSelectedPhotoSection(sectionId);
    setAllPhotosOpen(true);
  };

  return (
    <div className="airbnb-app-root">
      {/* Top Main Navbar */}
      <Navbar onOpenSearch={scrollToCalendar} />

      {/* Sticky Sub-Navbar */}
      <SubNavbar
        visible={showSubNav}
        rating={listingData.rating}
        reviewsCount={listingData.reviewsCount}
        onScrollToSection={scrollToSection}
        onCheckAvailability={scrollToCalendar}
      />

      {/* Title & Share/Save */}
      <TitleSection
        title={listingData.title}
        onShare={() => setShareOpen(true)}
      />

      {/* 5-Photo Hero Gallery */}
      <PhotoGallery
        images={listingData.images}
        onOpenAllPhotos={handleOpenAllPhotos}
      />

      {/* Main 2-Column Content */}
      <main className="listing-main-content page-container">
        {/* Left Column */}
        <div className="listing-left-col">
          <Overview
            type={listingData.type}
            specs={listingData.specs}
            rating={listingData.rating}
            reviewsCount={listingData.reviewsCount}
            onScrollToReviews={() => scrollToSection('reviews')}
          />

          <HostPreview
            host={listingData.host}
            onScrollToHost={scrollToHost}
          />

          <hr className="divider" />

          <Highlights highlights={listingData.highlights} />

          <hr className="divider" />

          <Description description={listingData.description} />

          <hr className="divider" />

          <SleepingArrangements
            sleepingArrangements={listingData.sleepingArrangements}
            onOpenPhotos={handleOpenAllPhotos}
          />

          <hr className="divider" />

          <Amenities
            amenities={listingData.amenities}
            onShowAllAmenities={() => setAmenitiesOpen(true)}
          />

          <hr className="divider" />

          <CalendarSection
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            onSelectDates={(inDate, outDate) => {
              setCheckInDate(inDate);
              setCheckOutDate(outDate);
            }}
            onClearDates={() => {
              setCheckInDate(null);
              setCheckOutDate(null);
            }}
          />
        </div>

        {/* Right Sticky Sidebar Column */}
        <div className="listing-right-col">
          <ReserveCard
            nightlyPrice={listingData.nightlyPrice}
            currency={listingData.currency}
            rating={listingData.rating}
            reviewsCount={listingData.reviewsCount}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            onOpenCalendar={scrollToCalendar}
            onOpenReport={() => setReportModalOpen(true)}
          />
        </div>
      </main>

      {/* Full-width sections below main content */}
      <div className="full-width-section-container page-container">
        <hr className="divider" />

        {/* Reviews Section */}
        <ReviewsSection
          rating={listingData.rating}
          reviewsCount={listingData.reviewsCount}
          ratingCategories={listingData.ratingCategories}
          reviewsMentions={listingData.reviewsMentions}
          reviews={listingData.reviews}
          onShowAllReviews={() => setReviewsOpen(true)}
          onHowReviewsWork={() => setHowReviewsModalOpen(true)}
        />

        <hr className="divider" />

        {/* Location Section */}
        <LocationMap location={listingData.location} />

        <hr className="divider" />

        {/* Meet your host Section */}
        <MeetYourHost
          host={listingData.host}
          onMessageHost={() => setMessageHostModalOpen(true)}
        />

        <hr className="divider" />

        {/* Things to know */}
        <ThingsToKnow
          thingsToKnow={listingData.thingsToKnow}
          onOpenCalendar={scrollToCalendar}
          onOpenRules={() => setRulesModalOpen(true)}
          onOpenSafety={() => setSafetyModalOpen(true)}
        />
      </div>

      {/* More stays nearby section replacing previous footer */}
      <hr className="divider page-container" />
      <MoreStays />

      {/* --- Modals --- */}
      {allPhotosOpen && (
        <PhotoTourModal
          initialSectionId={selectedPhotoSection}
          onClose={() => setAllPhotosOpen(false)}
          onShare={() => setShareOpen(true)}
        />
      )}

      {amenitiesOpen && (
        <AmenitiesModal
          allAmenitiesList={listingData.allAmenitiesList}
          onClose={() => setAmenitiesOpen(false)}
        />
      )}

      {reviewsOpen && (
        <ReviewsModal
          rating={listingData.rating}
          reviewsCount={listingData.reviewsCount}
          reviews={listingData.reviews}
          onClose={() => setReviewsOpen(false)}
        />
      )}

      {shareOpen && (
        <ShareModal
          title={listingData.title}
          image={listingData.images.heroMain}
          onClose={() => setShareOpen(false)}
        />
      )}

      {/* House rules modal */}
      {rulesModalOpen && (
        <div className="modal-backdrop" onClick={() => setRulesModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <div className="modal-header">
              <h3>House rules</h3>
              <button className="modal-close-btn" onClick={() => setRulesModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body">
              <h4 style={{ marginBottom: 12 }}>Checking in and out</h4>
              <p style={{ marginBottom: 8 }}>• Check-in: After 2:00 pm</p>
              <p style={{ marginBottom: 8 }}>• Checkout: Before 11:00 am</p>
              <p style={{ marginBottom: 16 }}>• Self check-in with building staff</p>

              <h4 style={{ marginBottom: 12 }}>During your stay</h4>
              <p style={{ marginBottom: 8 }}>• 3 guests maximum</p>
              <p style={{ marginBottom: 8 }}>• Pets allowed</p>
              <p style={{ marginBottom: 8 }}>• Quiet hours: 10:00 pm - 8:00 am</p>
              <p style={{ marginBottom: 8 }}>• Commercial photography not allowed without prior consent</p>
            </div>
          </div>
        </div>
      )}

      {/* Safety modal */}
      {safetyModalOpen && (
        <div className="modal-backdrop" onClick={() => setSafetyModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <div className="modal-header">
              <h3>Safety & property</h3>
              <button className="modal-close-btn" onClick={() => setSafetyModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body">
              <h4 style={{ marginBottom: 12 }}>Safety devices</h4>
              <p style={{ marginBottom: 8 }}>• Exterior security cameras on property (common areas & gates)</p>
              <p style={{ marginBottom: 8 }}>• Carbon monoxide alarm not reported</p>
              <p style={{ marginBottom: 16 }}>• Smoke alarm not reported</p>

              <h4 style={{ marginBottom: 12 }}>Property info</h4>
              <p style={{ marginBottom: 8 }}>• Private Jacuzzi on ground floor verandah deck</p>
              <p style={{ marginBottom: 8 }}>• Shared outdoor swimming pool on premises</p>
            </div>
          </div>
        </div>
      )}

      {/* How reviews work modal */}
      {howReviewsModalOpen && (
        <div className="modal-backdrop" onClick={() => setHowReviewsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <div className="modal-header">
              <h3>How reviews work</h3>
              <button className="modal-close-btn" onClick={() => setHowReviewsModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: 16 }}>
                Reviews are written by verified guests who booked this stay on Airbnb. Ratings are calculated based on guest feedback across cleanliness, accuracy, communication, location, check-in, and value.
              </p>
              <p>
                Homes marked with <strong>Guest favourite</strong> are in the top 5% of eligible listings based on ratings, reviews, and reliability.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Message host modal */}
      {messageHostModalOpen && (
        <div className="modal-backdrop" onClick={() => setMessageHostModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <div className="modal-header">
              <h3>Message Mirashya Homes</h3>
              <button className="modal-close-btn" onClick={() => setMessageHostModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: 16, color: '#717171' }}>
                Usually responds within an hour. Feel free to ask about the jacuzzi, pool, check-in or local recommendations in Candolim.
              </p>
              <textarea
                placeholder="Write your message here..."
                rows={4}
                style={{
                  width: '100%',
                  padding: 12,
                  borderRadius: 8,
                  border: '1px solid #ddd',
                  fontFamily: 'inherit',
                  fontSize: 14,
                  resize: 'none',
                  outline: 'none',
                  marginBottom: 16
                }}
              />
              <button
                className="btn-primary"
                style={{ width: '100%' }}
                onClick={() => {
                  alert('Message sent to host (frontend demo)!');
                  setMessageHostModalOpen(false);
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report listing modal */}
      {reportModalOpen && (
        <div className="modal-backdrop" onClick={() => setReportModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <div className="modal-header">
              <h3>Why are you reporting this listing?</h3>
              <button className="modal-close-btn" onClick={() => setReportModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['It’s inaccurate or incorrect', 'It’s not a real place to stay', 'It’s a scam', 'Other'].map((reason, i) => (
                  <button
                    key={i}
                    style={{
                      textAlign: 'left',
                      padding: 12,
                      border: '1px solid #ddd',
                      borderRadius: 8,
                      fontSize: 14
                    }}
                    onClick={() => {
                      alert('Thank you for your feedback (frontend demo).');
                      setReportModalOpen(false);
                    }}
                  >
                    {reason}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
