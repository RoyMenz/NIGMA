import React, { useEffect } from 'react';
import './EventDetailModal.css';
import ModalConstellationBackground from './ModalConstellationBackground';

interface HackathonComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HackathonComingSoonModal: React.FC<HackathonComingSoonModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.classList.remove('modal-open');
        document.body.style.overflow = 'unset';
      };
    }
    document.body.style.overflow = 'unset';
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay hackathon-coming-soon-overlay" onClick={onClose}>
      {/* Constellation / galaxy background - mobile-optimized */}
      <div className="hackathon-modal-constellation">
        <ModalConstellationBackground />
      </div>
      {/* Blueish-gold gradient overlay (from hero) */}
      <div
        className="hackathon-modal-gradient"
        style={{
          background:
            'linear-gradient(180deg, rgba(11, 28, 45, 0.92) 0%, rgba(79, 163, 209, 0.12) 35%, rgba(201, 162, 77, 0.08) 65%, rgba(11, 28, 45, 0.92) 100%)',
        }}
      />
      <div className="modal-container hackathon-coming-soon-container" onClick={(e) => e.stopPropagation()}>
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

          <div className="golden-scroll hackathon-coming-soon-scroll">
            <div className="scroll-content hackathon-coming-soon-content">
              <div className="hackathon-modal-watermark" aria-hidden="true">Coming Soon</div>
              <div className="scroll-header">
                <div className="scroll-icon-wrapper">
                  <span className="material-symbols-outlined scroll-icon">military_tech</span>
                </div>
                <h1 className="scroll-title">Ragnocode</h1>
                <div className="scroll-divider"></div>
              </div>

              <div className="scroll-quote hackathon-coming-soon-quote">
                <p>The gates of the Hackathon shall soon be unsealed.</p>
                <p>Stay watchful, lest the call of glory pass you by.</p>
                <p>Secure your place among the chosen.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonComingSoonModal;
