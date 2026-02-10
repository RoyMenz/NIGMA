import React, { useCallback, useEffect, useState } from 'react';
import './EventDetailModal.css';
import ModalConstellationBackground from './ModalConstellationBackground';
import { eventDetails } from '../data/eventDetails';

interface HackathonComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RegistrationMember {
  fullName: string;
  college: string;
  cityState: string;
  phone: string;
  email: string;
}

const HACKATHON_EVENT_ID = 10;

/** Simple email validation - requires @ and a domain with at least one dot */
function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(trimmed);
}
const HACKATHON_TEAM_OPTIONS = [2, 3, 4] as const;
const HACKATHON_TRACKS = ['Education', 'Healthcare', 'Fintech', 'Open Innovation'] as const;

const HackathonComingSoonModal: React.FC<HackathonComingSoonModalProps> = ({ isOpen, onClose }) => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [teamSizeDropdown, setTeamSizeDropdown] = useState<2 | 3 | 4 | ''>('');
  const [selectedTeamSize, setSelectedTeamSize] = useState<2 | 3 | 4 | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<string>('');
  const [teamName, setTeamName] = useState<string>('');
  const [members, setMembers] = useState<RegistrationMember[]>([
    { fullName: '', college: '', cityState: '', phone: '', email: '' },
  ]);
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [emailError, setEmailError] = useState<string | null>(null);

  const hackathonEvent = eventDetails.find((e) => e.id === HACKATHON_EVENT_ID);
  const rules = hackathonEvent?.rules ?? [];
  const quote = hackathonEvent?.quote ?? 'Create, prototype and present — build what matters.';
  const title = 'Ragnocode Hackathon';
  const icon = hackathonEvent?.icon ?? 'developer_mode';
  const effectiveTeamSize = selectedTeamSize ?? 0;

  const handleRegisterClick = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setShowRegistration(true);
      setIsFlipping(false);
    }, 300);
  };

  const handleBackToDetails = useCallback(() => {
    setSelectedTeamSize(null);
    setTeamSizeDropdown('');
    setSelectedTrack('');
    setTeamName('');
    setIsFlipping(true);
    setTimeout(() => {
      setShowRegistration(false);
      setIsFlipping(false);
    }, 300);
  }, []);

  const handleTeamSizeContinue = () => {
    if (teamSizeDropdown === '' || !HACKATHON_TEAM_OPTIONS.includes(teamSizeDropdown)) return;
    if (selectedTrack === '' || teamName.trim() === '') return;
    setSelectedTeamSize(teamSizeDropdown);
    setMembers(
      Array.from({ length: teamSizeDropdown }, () => ({
        fullName: '',
        college: '',
        cityState: '',
        phone: '',
        email: '',
      }))
    );
    setCurrentMemberIndex(0);
    setEmailError(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    const current = members[currentMemberIndex];
    const email = (current?.email ?? '').trim();
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    const isLastMember = currentMemberIndex >= effectiveTeamSize - 1;

    if (!isLastMember) {
      setCurrentMemberIndex((prev) => prev + 1);
      return;
    }

    // Frontend-only: no API call. Show success (coming soon) message.
    setIsFlipping(true);
    setTimeout(() => {
      setShowRegistration(false);
      setShowSuccess(true);
      setIsFlipping(false);
    }, 300);
  };

  const handlePreviousMember = () => {
    if (currentMemberIndex <= 0) return;
    setEmailError(null);
    setCurrentMemberIndex((prev) => prev - 1);
  };

  const handleMemberFieldChange = (field: keyof RegistrationMember, value: string) => {
    if (field === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    setMembers((prev) => {
      const next = [...prev];
      next[currentMemberIndex] = {
        ...next[currentMemberIndex],
        [field]: value,
      };
      return next;
    });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          if (showSuccess) onClose();
          else if (showRegistration) handleBackToDetails();
          else onClose();
        }
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.classList.remove('modal-open');
        document.body.style.overflow = 'unset';
      };
    }
    document.body.style.overflow = 'unset';
  }, [isOpen, onClose, showRegistration, showSuccess, handleBackToDetails]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowRegistration(false);
      setShowSuccess(false);
      setIsFlipping(false);
      setTeamSizeDropdown('');
      setSelectedTeamSize(null);
      setSelectedTrack('');
      setTeamName('');
      setMembers([{ fullName: '', college: '', cityState: '', phone: '', email: '' }]);
      setCurrentMemberIndex(0);
      setEmailError(null);
    }
  }, [isOpen]);

  // Clear email error when switching member or changing email
  useEffect(() => {
    setEmailError(null);
  }, [currentMemberIndex]);

  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay hackathon-coming-soon-overlay ${showSuccess ? 'hackathon-success-overlay' : ''}`}
      onClick={onClose}
    >
      <div className="hackathon-modal-constellation">
        <ModalConstellationBackground />
      </div>
      <div
        className={`hackathon-modal-gradient ${showSuccess ? 'hackathon-success-gradient' : ''}`}
        style={
          showSuccess
            ? undefined
            : {
                background:
                  'linear-gradient(180deg, rgba(11, 28, 45, 0.92) 0%, rgba(79, 163, 209, 0.12) 35%, rgba(201, 162, 77, 0.08) 65%, rgba(11, 28, 45, 0.92) 100%)',
              }
        }
      />
      <div
        className={`modal-container hackathon-coming-soon-container ${showSuccess ? 'hackathon-success-container' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
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
          {!showSuccess && (
            <div className="modal-back-btn-wrapper">
              <button
                className="modal-back-btn"
                onClick={showRegistration ? handleBackToDetails : onClose}
              >
                <span className="material-symbols-outlined">arrow_back</span>
                <span>{showRegistration ? 'Return to Rules' : 'Back to Arena'}</span>
              </button>
            </div>
          )}

          <div className={`golden-scroll hackathon-coming-soon-scroll ${isFlipping ? 'scroll-flipping' : ''}`}>
            {showSuccess ? (
              <div className="scroll-content hackathon-success-content hackathon-success-blue-gold">
                <div className="scroll-header">
                  <div className="scroll-icon-wrapper">
                    <span className="material-symbols-outlined scroll-icon">check_circle</span>
                  </div>
                  <h1 className="scroll-title">Registration Successful!</h1>
                  <div className="scroll-divider"></div>
                </div>
                <ul className="scroll-rules-list hackathon-success-list">
                  <li>
                    <span className="rule-number">•</span>
                    <span>To confirm your registration, submit your presentation in PDF format to <a href="mailto:prarthana.23bc062@student.nitte.edu.in" className="hackathon-success-link">prarthana.23bc062@student.nitte.edu.in</a> and <a href="mailto:prarthana.23bc062@student.nitte.edu.in" className="hackathon-success-link">royston.23bc078@student.nitte.edu.in</a></span>
                  </li>
                  <li>
                    <span className="rule-number">•</span>
                    <span><strong>Submission deadline:</strong> 21-02-2026</span>
                  </li>
                  <li>
                    <span className="rule-number">•</span>
                    <span>The presentation must include:</span>
                  </li>
                  <li className="hackathon-success-sublist">
                    <span className="rule-number">◦</span>
                    <span>Title slide (Project Title, Team Name, Team Leader&apos;s Name, Email ID, and Contact Number)</span>
                  </li>
                  <li className="hackathon-success-sublist">
                    <span className="rule-number">◦</span>
                    <span>Problem statement with the selected track</span>
                  </li>
                  <li className="hackathon-success-sublist">
                    <span className="rule-number">◦</span>
                    <span>Proposed solution</span>
                  </li>
                  <li className="hackathon-success-sublist">
                    <span className="rule-number">◦</span>
                    <span>Technology stack and approach</span>
                  </li>
                  <li className="hackathon-success-sublist">
                    <span className="rule-number">◦</span>
                    <span>(Maximum of 6 slides)</span>
                  </li>
                  <li>
                    <span className="rule-number">•</span>
                    <span>Results for shortlisted teams will be announced on 23-02-2026 via email or direct contact</span>
                  </li>
                  <li>
                    <span className="rule-number">•</span>
                    <span><strong>Note:</strong> Failure to submit the presentation within the deadline will result in the registration being considered invalid</span>
                  </li>
                  <li>
                    <span className="rule-number">•</span>
                    <span>Thank you for registering your team, best of luck!</span>
                  </li>
                </ul>
                <div className="modal-actions">
                  <button type="button" className="modal-register-btn" onClick={onClose}>
                    Close
                  </button>
                </div>
              </div>
            ) : !showRegistration ? (
              <div className="scroll-content hackathon-coming-soon-content">
                <div className="scroll-header">
                  <div className="scroll-icon-wrapper">
                    <span className="material-symbols-outlined scroll-icon">{icon}</span>
                  </div>
                  <h1 className="scroll-title">{title}</h1>
                  <div className="scroll-divider"></div>
                </div>

                <div className="scroll-quote hackathon-coming-soon-quote">
                  <p>&quot;{quote}&quot;</p>
                </div>

                <div className="scroll-section">
                  <div className="scroll-section-header">
                    <span className="material-symbols-outlined">gavel</span>
                    <h2>Rules of Engagement</h2>
                  </div>
                  <ul className="scroll-rules-list">
                    {rules.map((rule, index) => (
                      <li key={index}>
                        <span className="rule-number">{String(index + 1).padStart(2, '0')}.</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="scroll-section">
                  <div className="scroll-section-header">
                    <span className="material-symbols-outlined">rule</span>
                    <h2>Rules for Selection Round</h2>
                  </div>
                  <ul className="scroll-rules-list">
                    <li>
                      <span className="rule-number">01.</span>
                      <span>Teams must submit their idea presentation (PPT) based on one of the four provided tracks.</span>
                    </li>
                    <li>
                      <span className="rule-number">02.</span>
                      <span>The presentation should clearly outline the problem statement, proposed solution, and implementation plan.</span>
                    </li>
                    <li>
                      <span className="rule-number">03.</span>
                      <span>Submissions will be evaluated based on innovation, feasibility, and impact potential.</span>
                    </li>
                    <li>
                      <span className="rule-number">04.</span>
                      <span>Top 15 teams will be shortlisted for the onsite final round based on evaluation scores.</span>
                    </li>
                  </ul>
                </div>

                <div className="scroll-section">
                  <div className="scroll-section-header">
                    <span className="material-symbols-outlined">category</span>
                    <h2>Hackathon Tracks</h2>
                  </div>
                  <div className="hackathon-tracks-grid">
                    <div className="hackathon-track-card">
                      <div className="track-card-icon">
                        <span className="material-symbols-outlined">school</span>
                      </div>
                      <h3 className="track-card-title">Education</h3>
                    </div>
                    <div className="hackathon-track-card">
                      <div className="track-card-icon">
                        <span className="material-symbols-outlined">local_hospital</span>
                      </div>
                      <h3 className="track-card-title">Healthcare</h3>
                    </div>
                    <div className="hackathon-track-card">
                      <div className="track-card-icon">
                        <span className="material-symbols-outlined">account_balance</span>
                      </div>
                      <h3 className="track-card-title">Fintech</h3>
                    </div>
                    <div className="hackathon-track-card">
                      <div className="track-card-icon">
                        <span className="material-symbols-outlined">lightbulb</span>
                      </div>
                      <h3 className="track-card-title">Open Innovation</h3>
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedTeamSize === null ? (
              <div className="scroll-content registration-form">
                <div className="registration-header">
                  <div className="registration-icon-wrapper">
                    <span className="material-symbols-outlined registration-icon">groups</span>
                  </div>
                  <h1 className="registration-title">Hackathon — Team Size</h1>
                  <p className="registration-subtitle">
                    Select your team size (2 to 4 members). First member will be the Team Leader.
                  </p>
                  <div className="registration-divider"></div>
                </div>
                <div className="registration-form-fields">
                  <div className="form-field">
                    <label className="form-label">Team size</label>
                    <div className="form-select-wrapper">
                      <select
                        className="form-input form-select"
                        value={teamSizeDropdown}
                        onChange={(e) =>
                          setTeamSizeDropdown(
                            e.target.value === '' ? '' : (Number(e.target.value) as 2 | 3 | 4)
                          )
                        }
                      >
                        <option value="">Select team size</option>
                        {HACKATHON_TEAM_OPTIONS.map((n) => (
                          <option key={n} value={n}>
                            Team of {n}
                          </option>
                        ))}
                      </select>
                      <span className="form-select-icon material-symbols-outlined">expand_more</span>
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Track</label>
                    <div className="form-select-wrapper">
                      <select
                        className="form-input form-select"
                        value={selectedTrack}
                        onChange={(e) => setSelectedTrack(e.target.value)}
                      >
                        <option value="">Select track</option>
                        {HACKATHON_TRACKS.map((track) => (
                          <option key={track} value={track}>
                            {track}
                          </option>
                        ))}
                      </select>
                      <span className="form-select-icon material-symbols-outlined">expand_more</span>
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Team Name</label>
                    <input
                      className="form-input"
                      placeholder="Enter your team name"
                      required
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                    />
                  </div>
                  <div className="form-submit-wrapper">
                    <button
                      type="button"
                      className="form-submit-btn"
                      onClick={handleTeamSizeContinue}
                      disabled={teamSizeDropdown === '' || selectedTrack === '' || teamName.trim() === ''}
                    >
                      <span className="form-submit-overlay"></span>
                      <div className="form-submit-content">
                        <span className="hidden sm:inline">Continue — Enter participant details</span>
                        <span className="sm:hidden">Continue</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="registration-disclaimer">
                  <p>By joining, you agree to the rules of the Hackathon and the decisions of the organisers.</p>
                </div>
              </div>
            ) : (
              <div className="scroll-content registration-form">
                <div className="registration-header">
                  <div className="registration-icon-wrapper">
                    <span className="material-symbols-outlined registration-icon">history_edu</span>
                  </div>
                  <h1 className="registration-title">Enlist Your Team</h1>
                  <p className="registration-subtitle">
                    {currentMemberIndex === 0
                      ? 'Team Leader'
                      : `Participant ${currentMemberIndex + 1}`}{' '}
                    of {effectiveTeamSize}
                  </p>
                  <div className="registration-divider"></div>
                </div>

                <form className="registration-form-fields" onSubmit={handleFormSubmit}>
                  <div className="form-field">
                    <label className="form-label">Full Name</label>
                    <input
                      className="form-input"
                      placeholder="e.g. Ragnar Lothbrok"
                      required
                      type="text"
                      value={members[currentMemberIndex]?.fullName ?? ''}
                      onChange={(e) => handleMemberFieldChange('fullName', e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">College</label>
                    <input
                      className="form-input"
                      placeholder="Asgard Institute of Technology"
                      required
                      type="text"
                      value={members[currentMemberIndex]?.college ?? ''}
                      onChange={(e) => handleMemberFieldChange('college', e.target.value)}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label">City, State</label>
                      <input
                        className="form-input"
                        placeholder="Udupi, Karnataka"
                        required
                        type="text"
                        value={members[currentMemberIndex]?.cityState ?? ''}
                        onChange={(e) => handleMemberFieldChange('cityState', e.target.value)}
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Phone Number</label>
                      <input
                        className="form-input"
                        placeholder="10 digit mobile number"
                        required
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={members[currentMemberIndex]?.phone ?? ''}
                        onChange={(e) => handleMemberFieldChange('phone', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Email</label>
                    <input
                      className={`form-input ${emailError ? 'form-input-error' : ''}`}
                      placeholder="e.g. name@college.edu"
                      required
                      type="email"
                      value={members[currentMemberIndex]?.email ?? ''}
                      onChange={(e) => {
                        setEmailError(null);
                        handleMemberFieldChange('email', e.target.value);
                      }}
                    />
                    {emailError && (
                      <span className="form-field-error-text">{emailError}</span>
                    )}
                  </div>
                  <div className="hackathon-form-actions">
                    {currentMemberIndex > 0 ? (
                      <button
                        type="button"
                        className="form-submit-btn form-submit-btn-secondary"
                        onClick={handlePreviousMember}
                      >
                        <span className="form-submit-overlay"></span>
                        <div className="form-submit-content">
                          <span className="material-symbols-outlined">arrow_back</span>
                          Previous Member
                        </div>
                      </button>
                    ) : (
                      <div className="hackathon-form-actions-spacer" aria-hidden />
                    )}
                    <button className="form-submit-btn hackathon-form-actions-submit" type="submit">
                      <span className="form-submit-overlay"></span>
                      <div className="form-submit-content">
                        {currentMemberIndex >= effectiveTeamSize - 1
                          ? 'Submit'
                          : 'Next Member'}
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </div>
                    </button>
                  </div>
                </form>
                <div className="registration-disclaimer">
                  <p>By joining, you agree to the rules of the Hackathon and the decisions of the organisers.</p>
                </div>
              </div>
            )}
          </div>

          {!showRegistration && !showSuccess && (
            <div className="modal-actions">
              <button type="button" className="modal-register-btn" onClick={handleRegisterClick}>
                Register
              </button>
              <p className="modal-deadline">Hackathon registrations will open soon. Express your interest below.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HackathonComingSoonModal;
