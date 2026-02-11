import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventDetailModal from '../components/EventDetailModal';
import { useHackathon } from '../contexts/HackathonContext';
import { eventDetails, getTeamSizeDisplay } from '../data/eventDetails';
import type { EventDetail } from '../data/eventDetails';
import ConstellationBackground from '../../../shared/components/ConstellationBackground';
import HackathonBanner from '../components/sections/HackathonBanner';
import TechnicalTeam from '../components/sections/TechnicalTeam';
import './EventsArena.css';
import headerLogo from '../../../assets/images/Header Logo.png';
import coding from '../../../assets/images/coding.jpeg';
import facepainting from '../../../assets/images/face painting.jpeg';
import variety from '../../../assets/images/variety.jpeg';
import bestoutofwaste from '../../../assets/images/bestoutofwaste.jpeg';
import reelmaking from '../../../assets/images/reelmaking.jpeg';
import bestmanager from '../../../assets/images/bestmanager.jpeg';
import hr from '../../../assets/images/hr.jpeg';
import finance from '../../../assets/images/finance.jpeg';
import marketing from '../../../assets/images/marketing.jpeg';
import eventmanagement from '../../../assets/images/eventmgmt.jpeg';
import ittreasurehunt from '../../../assets/images/ittreasurehunt.jpeg';
import mockpress from '../../../assets/images/mockpress.jpg';
import esports from '../../../assets/images/esports.jpeg';
import maths from '../../../assets/images/math.jpeg';
import hackathon from '../../../assets/images/hackathon.jpeg';
interface EventCardData {
  id: number;
  title: string;
  description: string;
  venue: string;
  category: string;
  image: string;
  imageAlt: string;
}

const eventsData: EventCardData[] = [
  // Commerce & Management (5)
  { id: 1, title: 'Best Manager', description: 'Inter-college management challenge.', venue: 'Main Hall', category: 'Commerce', image: bestmanager, imageAlt: 'Best Manager' },
  { id: 2, title: 'Finance', description: 'Finance case challenge and trading simulations.', venue: 'Finance Lab', category: 'Commerce', image: finance, imageAlt: 'Finance' },
  { id: 3, title: 'Marketing', description: 'Marketing strategy and campaign creation.', venue: 'Auditorium', category: 'Commerce', image: marketing, imageAlt: 'Marketing' },
  { id: 4, title: 'Human Resource', description: 'HR challenges and role plays.', venue: 'HR Room', category: 'Commerce', image: hr, imageAlt: 'Human Resource' },
  { id: 5, title: 'Event Management', description: 'Plan and execute a mock event.', venue: 'Event Grounds', category: 'Commerce', image: eventmanagement, imageAlt: 'Event Management' },

  // IT & Technical (5)
  { id: 6, title: 'Coding Challenge', description: 'Problem-solving contest.', venue: 'Computer Lab', category: 'IT', image: coding, imageAlt: 'Coding Challenge' },
  { id: 7, title: 'E-Sports', description: 'Competitive gaming tournament.', venue: 'Gaming Arena', category: 'IT', image: esports, imageAlt: 'E-Sports' },
  { id: 8, title: 'IT Treasure Hunt', description: 'Tech-themed treasure hunt.', venue: 'Campus', category: 'IT', image: ittreasurehunt, imageAlt: 'IT Treasure Hunt' },
  { id: 9, title: 'Maths Heptathlon', description: 'Seven mathematical challenges.', venue: 'Maths Hall', category: 'IT', image: maths, imageAlt: 'Maths Heptathlon' },
  { id: 10, title: 'Ragnocode Hackathon', description: 'Build solutions in a sprint.', venue: 'Hack Lab', category: 'IT', image: hackathon, imageAlt: 'Hackathon' },

  // Variety (5)
  { id: 11, title: 'Variety Event', description: 'Open cultural performances.', venue: 'Stage', category: 'Variety', image: variety, imageAlt: 'Variety Event' },
  { id: 12, title: 'Mock Press', description: 'Press and media event simulation.', venue: 'Media Room', category: 'Variety', image: mockpress, imageAlt: 'Mock Press' },
  { id: 13, title: 'Best out of Waste', description: 'Creative reuse competition.', venue: 'Workshop', category: 'Variety', image: bestoutofwaste, imageAlt: 'Best out of Waste' },
  { id: 14, title: 'Reel Making', description: 'Short-form video challenge.', venue: 'Studio', category: 'Variety', image: reelmaking, imageAlt: 'Reel Making' },
  { id: 15, title: 'Face Painting', description: 'Art and creativity on canvas — your face.', venue: 'Art Zone', category: 'Variety', image: facepainting, imageAlt: 'Face Painting' }
];

const categories = [
  { id: 'all', icon: 'all_inclusive', label: 'All Trials' },
  { id: 'Commerce', icon: 'store', label: 'Commerce & Management' },
  { id: 'it', icon: 'memory', label: 'IT & Technical' },
  { id: 'variety', icon: 'theaters', label: 'Cultural Events' }
];

const EventsArena: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTechTeamOpen, setIsTechTeamOpen] = useState(false);
  const navigate = useNavigate();
  const { open: openHackathon } = useHackathon();

  const handleViewScroll = (eventId: number) => {
    if (eventId === 10) {
      openHackathon();
      return;
    }
    const event = eventDetails.find(e => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  const filteredEvents = activeCategory === 'all'
    ? eventsData
    : eventsData.filter(event => {
        const cat = event.category.toLowerCase();
        const active = activeCategory.toLowerCase();
        return cat === active;
      });

  return (
    <div className="events-arena-page">
      {/* Constellation Background - uniform across all pages */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <ConstellationBackground />
      </div>
      
      {/* Background overlay */}
      <div className="bifrost-bg"></div>

      {/* Header / Nav */}
      <header className="arena-header">
        <div className="arena-header-content">
          <div className="arena-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img 
              src={headerLogo} 
              alt="NITTE Logo" 
              className="w-auto object-contain"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="arena-main">
        {/* Hero Section */}
        <div className="arena-hero">
          <div className="arena-glow-effect"></div>
          <h2 className="arena-title">
            Events <span className="arena-title-highlight">Arena</span>
          </h2>
          <p className="arena-subtitle">
            Step into the proving grounds of the gods. Challenge your intellect in the Code of Odin or test your mechanical might in the Forge of Hephaestus.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="arena-categories">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`arena-category-btn ${activeCategory === category.id ? 'arena-category-btn-active' : ''}`}
            >
              <span className="material-symbols-outlined">{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Hackathon Banner - Only show in All Trials and IT & Technical */}
        {(activeCategory === 'all' || activeCategory === 'it') && (
          <div className="arena-hackathon-banner">
            <HackathonBanner />
          </div>
        )}

        {/* Events Grid */}
        <div className="arena-events-grid">
          {filteredEvents.map((event) => (
            <div key={event.id} className="arena-event-card">
              <div className="arena-card-image-wrapper">
                <div 
                  className="arena-card-image"
                  style={{ backgroundImage: `url('${event.image}')` }}
                  role="img"
                  aria-label={event.imageAlt}
                ></div>
                <div className="arena-card-overlay"></div>
                <div className="arena-card-group-badge">
                  <span className="material-symbols-outlined">groups</span>
                  <span>{getTeamSizeDisplay(eventDetails.find((ed) => ed.id === event.id) ?? null)}</span>
                </div>
                <div className="arena-card-badge">{event.category}</div>
              </div>
              <div className="arena-card-content">
                <h3 className="arena-card-title">{event.title}</h3>
                <p className="arena-card-description">{event.description}</p>
                <div className="arena-card-details">
                  <div className="arena-card-detail">
                    <span className="material-symbols-outlined">groups</span>
                    <span>
                      {(() => {
                        const d = eventDetails.find(ed => ed.id === event.id);
                        if (!d || !d.heads || d.heads.length === 0) return 'Heads: TBA';
                        return `Heads: ${d.heads.join(' & ')}`;
                      })()
                      }
                    </span>
                  </div>
                </div>
              </div>
              <button 
                className="arena-card-btn"
                onClick={() => handleViewScroll(event.id)}
                title={event.id === 10 ? 'View hackathon details and register' : 'View details'}
              >
                <span>{event.id === 10 ? 'View Scroll' : 'View Scroll'}</span>
                <span className="material-symbols-outlined">auto_stories</span>
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="arena-footer">
          <div className="arena-footer-content" style={{ justifyContent: 'center', padding: '1rem' }}>
            <button
              type="button"
              onClick={() => setIsTechTeamOpen(true)}
              className="arena-tech-team-btn"
            >
              Technical Team
            </button>
          </div>
          <p className="arena-footer-text">N-IGMA © 2026 • Powered by the Forge of Young Minds</p>
        </footer>
      </main>

      {/* Event Detail Modal */}
      <EventDetailModal 
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Technical Team Modal */}
      {isTechTeamOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background-dark/70 backdrop-blur-sm px-4"
          onClick={() => setIsTechTeamOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[2rem] border border-foreground/10 bg-[#0B1C2D]/95 p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsTechTeamOpen(false)}
              className="tech-team-close-btn absolute right-4 top-4 z-[50] inline-flex items-center justify-center rounded-full border border-white/20 bg-background-dark/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground hover:bg-foreground/10 touch-action-manipulation min-h-[44px] min-w-[44px]"
            >
              Close
            </button>
            <TechnicalTeam />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsArena;
