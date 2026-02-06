import React, { useEffect } from 'react';
import './EventDetailModal.css';

interface GeneralGuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GENERAL_GUIDELINES = [
  'N-IGMA 2026 is an intercollegiate fest open to students of all UG streams.',
  'Colleges registering for all events (Excluding Hackathon) will be eligible for a discounted registration fee of ₹2,000/- instead of ₹2,600/-.',
  'Registration fees will be accepted on the day of the fest at the on-site registration desk.',
  'Only one team per college is permitted to participate in each event, except Hackathon, where multiple teams from the same college are allowed.',
  'A team may consist of a maximum of 44 participants competing across 14 events, excluding Hackathon.',
  'Participants of management events are expected to be in formal attire on the day of the fest.',
  'Participants must carry their laptops (with required software), USB/pen drives, and internet dongles or active internet connections, as required.',
  'Participants must carry a bonafide certificate and their respective college ID cards and must produce them when required.',
  'Any form of indecent or inappropriate behavior during the course of the fest will not be entertained.',
  'All participating teams are requested to report at the venue by 8:30 AM on 25th February 2026 for registration.',
  'The decision of the judges shall be final and binding in all matters.',
  'Any kind of delay in reporting or participation will not be entertained.',
  'The Overall Championship will be decided based on the total points scored by the team.',
  'Only teams that have participated in a minimum of 10 events are eligible for the Overall Championship.',
  'Accommodation will be provided only on prior request and subject to availability.',
  'Any damage caused to college property will be the responsibility of the respective team.',
  'The organizing committee reserves the right to modify the rules, if necessary.',
];

const GeneralGuidelinesModal: React.FC<GeneralGuidelinesModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
      };
    }
    document.body.style.overflow = 'unset';
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="torch-left">
          <div className="torch-pole"></div>
          <span className="material-symbols-outlined torch-flame">local_fire_department</span>
          <div className="torch-text">VALHALLA</div>
        </div>
        <div className="torch-right">
          <div className="torch-pole"></div>
          <span className="material-symbols-outlined torch-flame">local_fire_department</span>
          <div className="torch-text">RAGNAROK</div>
        </div>

        <div className="modal-content-wrapper">
          <div className="modal-back-btn-wrapper">
            <button className="modal-back-btn" onClick={onClose}>
              <span className="material-symbols-outlined">arrow_back</span>
              <span>Back</span>
            </button>
          </div>

          <div className="golden-scroll">
            <div className="scroll-content">
              <div className="scroll-header">
                <div className="scroll-icon-wrapper">
                  <span className="material-symbols-outlined scroll-icon">menu_book</span>
                </div>
                <h1 className="scroll-title">General Guidelines</h1>
                <div className="scroll-divider"></div>
              </div>

              <div className="scroll-quote">
                <p>N-IGMA 2026 — The Code of Conduct</p>
              </div>

              <div className="scroll-section">
                <div className="scroll-section-header">
                  <span className="material-symbols-outlined">gavel</span>
                  <h2>Rules & Regulations</h2>
                </div>
                <ul className="scroll-rules-list">
                  {GENERAL_GUIDELINES.map((rule, index) => (
                    <li key={index}>
                      <span className="rule-number">{String(index + 1).padStart(2, '0')}.</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralGuidelinesModal;
