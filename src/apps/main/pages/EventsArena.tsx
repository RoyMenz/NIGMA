import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventDetailModal from '../components/EventDetailModal';
import { useHackathonComingSoon } from '../contexts/HackathonComingSoonContext';
import { eventDetails, getTeamSizeDisplay } from '../data/eventDetails';
import type { EventDetail } from '../data/eventDetails';
import ConstellationBackground from '../../../shared/components/ConstellationBackground';
import './EventsArena.css';
import headerLogo from '../../../assets/images/Header Logo.png';
 import bestmanager from '../../../assets/images/nigma.jpeg';
 import finance from '../../../assets/images/nigma2.jpeg';
import coding from '../../../assets/images/coding.jpeg';
import treasurehunt from '../../../assets/images/treasure.jpeg';
import variety from '../../../assets/images/variety.jpeg';
import mockpress from '../../../assets/images/mockpress.jpg';
import bestoutofwaste from '../../../assets/images/bestwaste.jpg';
import reelmaking from '../../../assets/images/reelmaking.png';
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
  { id: 2, title: 'Finance', description: 'Finance case challenge and trading simulations.', venue: 'Finance Lab', category: 'Commerce', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAomt3vUjw5_OtEYxF5V8nKTeIFKaZ6Bb_mvrcrHxic5jLj9l3k_YO_wJmy3-iwcdNwpTo2t5afJPs8PiaheDagAyZw-j_XFCIhixZahN02bRAM2kTsOqo_-5G0VKV7UgriyDiRzRtsTNxWB3lWyQE4wDo4CoUKC8mbV2bFhl1xfzE_WyQNUjTsSUld5ijl4xGqhV0dksbrnyy8Lhkne9GchDMaRXaIVo5iHL_USS6zTr_wYOe22QXWyx_egBDcj39gwwdFUHLbUrQw', imageAlt: 'Finance' },
  { id: 3, title: 'Marketing', description: 'Marketing strategy and campaign creation.', venue: 'Auditorium', category: 'Commerce', image: finance, imageAlt: 'Marketing' },
  { id: 4, title: 'Human Resource', description: 'HR challenges and role plays.', venue: 'HR Room', category: 'Commerce', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm3R-_pcS85tICJR-BxsxMAq4f8bYcRxYi9IM54JJ3ZoMZOE94ZALhcL85X3-AgF-UIzH6bEKza9TOZTdbsMDFhoofY0B3pAMOQmESQZtxlIbfHplSFIUQ6l4eJZwxAF_UapM7P1veq2VQMGGYwr2A--xVmQoyIOQp_ELlsmT-T1mEeEfiYLJUnIRax1yc29ezNFo58-qXyUPWkgtDWMeYltXfAM9BRwfjyfQqJxJnma11mxby-AD7xSYocTRQoUNv2vGgMWq41G5Q', imageAlt: 'Human Resource' },
  { id: 5, title: 'Event Management', description: 'Plan and execute a mock event.', venue: 'Event Grounds', category: 'Commerce', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv-UzRPvgrZLlVpWkv2mWwQQzVlZbHCQoWv5PC51Te6XHHDosmvp-ucUrytmon3pFE05AaZQD4AcSoVDC5we1K4R138opMym2ygIK4MhUIT11wBkdyevA6A_VnA7g_MCqj1IXo7KzLwUxlpKKDIv1_X7vlevct3b0sUKOVUM-GLX7qq5stTrhb4FiBcxGDNcZzltIupfeJTeF4BWdWsk_8HUIHcifPdVrjzncaBohB9nsAL0Q6qbWxEq143ZRq77eRULmDWLTJ29NB', imageAlt: 'Event Management' },

  // IT & Technical (5)
  { id: 6, title: 'Coding Challenge', description: 'Problem-solving contest.', venue: 'Computer Lab', category: 'IT', image: coding, imageAlt: 'Coding Challenge' },
  { id: 7, title: 'E-Sports', description: 'Competitive gaming tournament.', venue: 'Gaming Arena', category: 'IT', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAomt3vUjw5_OtEYxF5V8nKTeIFKaZ6Bb_mvrcrHxic5jLj9l3k_YO_wJmy3-iwcdNwpTo2t5afJPs8PiaheDagAyZw-j_XFCIhixZahN02bRAM2kTsOqo_-5G0VKV7UgriyDiRzRtsTNxWB3lWyQE4wDo4CoUKC8mbV2bFhl1xfzE_WyQNUjTsSUld5ijl4xGqhV0dksbrnyy8Lhkne9GchDMaRXaIVo5iHL_USS6zTr_wYOe22QXWyx_egBDcj39gwwdFUHLbUrQw', imageAlt: 'E-Sports' },
  { id: 8, title: 'IT Treasure Hunt', description: 'Tech-themed treasure hunt.', venue: 'Campus', category: 'IT', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMzCFszPEnObGGwpkYAgqUi4ieq6psoe-VAzW9gghBHc-SLeiyRzvllcmgBUzsmRIKCFHldNfNzzc8t9S-Ly1inUqQlW9OOk3BIXPQd21f31BdNrgBsd0Oj8roKOf6v5QDy_nKnpqYup-W_RaCcszhGJDWCh_azQaCU65zz9IkEuHeXW8xeHlj9IlT2gkqE1IuOjQU4ksgqj22L-7InjH-5v54syFTaMIOEMt7gkJJRVSMPTQBEfs8sLJ8itMJElXthjrDKM_4kNFh', imageAlt: 'IT Treasure Hunt' },
  { id: 9, title: 'Maths Heptathlon', description: 'Seven mathematical challenges.', venue: 'Maths Hall', category: 'IT', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv-UzRPvgrZLlVpWkv2mWwQQzVlZbHCQoWv5PC51Te6XHHDosmvp-ucUrytmon3pFE05AaZQD4AcSoVDC5we1K4R138opMym2ygIK4MhUIT11wBkdyevA6A_VnA7g_MCqj1IXo7KzLwUxlpKKDIv1_X7vlevct3b0sUKOVUM-GLX7qq5stTrhb4FiBcxGDNcZzltIupfeJTeF4BWdWsk_8HUIHcifPdVrjzncaBohB9nsAL0Q6qbWxEq143ZRq77eRULmDWLTJ29NB', imageAlt: 'Maths Heptathlon' },
  { id: 10, title: 'Hackathon', description: 'Build solutions in a sprint.', venue: 'Hack Lab', category: 'IT', image: treasurehunt, imageAlt: 'Hackathon' },

  // Variety (5)
  { id: 11, title: 'Variety Event', description: 'Open cultural performances.', venue: 'Stage', category: 'Variety', image: variety, imageAlt: 'Variety Event' },
  { id: 12, title: 'Mock Press', description: 'Press and media event simulation.', venue: 'Media Room', category: 'Variety', image: mockpress, imageAlt: 'Mock Press' },
  { id: 13, title: 'Best out of Waste', description: 'Creative reuse competition.', venue: 'Workshop', category: 'Variety', image: bestoutofwaste, imageAlt: 'Best out of Waste' },
  { id: 14, title: 'Reel Making', description: 'Short-form video challenge.', venue: 'Studio', category: 'Variety', image: reelmaking, imageAlt: 'Reel Making' },
  { id: 15, title: 'Face Painting', description: 'Art and creativity on canvas — your face.', venue: 'Art Zone', category: 'Variety', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMzCFszPEnObGGwpkYAgqUi4ieq6psoe-VAzW9gghBHc-SLeiyRzvllcmgBUzsmRIKCFHldNfNzzc8t9S-Ly1inUqQlW9OOk3BIXPQd21f31BdNrgBsd0Oj8roKOf6v5QDy_nKnpqYup-W_RaCcszhGJDWCh_azQaCU65zz9IkEuHeXW8xeHlj9IlT2gkqE1IuOjQU4ksgqj22L-7InjH-5v54syFTaMIOEMt7gkJJRVSMPTQBEfs8sLJ8itMJElXthjrDKM_4kNFh', imageAlt: 'Face Painting' }
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
  const navigate = useNavigate();
  const { open: openHackathonComingSoon } = useHackathonComingSoon();

  const handleViewScroll = (eventId: number) => {
    if (eventId === 10) {
      openHackathonComingSoon();
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
          <div className="arena-nav-right">
            <button className="arena-register-btn" onClick={openHackathonComingSoon}>Hackathon</button>
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
                title={event.id === 10 ? 'Registration disabled — Hackathon page coming soon' : 'View details'}
              >
                <span>{event.id === 10 ? 'Coming soon' : 'View Scroll'}</span>
                <span className="material-symbols-outlined">auto_stories</span>
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="arena-footer">
          {/* <div className="arena-footer-content">
            <div className="arena-footer-links">
              <a href="#rules">Book of Rules</a>
              <span className="arena-footer-divider">•</span>
              <a href="#conduct">Code of Conduct</a>
              <span className="arena-footer-divider">•</span>
              <a href="#privacy">Privacy Rune</a>
            </div>
            <div className="arena-footer-social">
              <div className="arena-social-icon">
                <span className="material-symbols-outlined">alternate_email</span>
              </div>
              <div className="arena-social-icon">
                <span className="material-symbols-outlined">public</span>
              </div>
            </div>
          </div> */}
          <p className="arena-footer-text">N-IGMA © 2026 • Powered by the Forge of Young Minds</p>
        </footer>
      </main>

      {/* Event Detail Modal */}
      <EventDetailModal 
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default EventsArena;
