import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ElectionContext from '../context/election/ElectionContext';
import AuthContext from '../context/auth/AuthContext';
import './ElectionItem.css';

const ElectionItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const electionContext = useContext(ElectionContext);
  const authContext = useContext(AuthContext);
  const { getElection, currentElection, castVote, error, clearErrors } = electionContext;
  const { isAuthenticated, user } = authContext;

  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getElection(id);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (error) {
      setMessage(error);
      setMessageType('error');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error]);

  const onChange = e => {
    setSelectedCandidate(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (selectedCandidate === '') {
      setMessage('Please select a candidate');
      setMessageType('error');
      return;
    }
    
    setIsSubmitting(true);
    castVote({
      electionId: currentElection._id,
      candidateIndex: parseInt(selectedCandidate)
    });
    
    setMessage('Your vote has been recorded successfully!');
    setMessageType('success');
    
    setTimeout(() => {
      navigate(`/results/${currentElection._id}`);
    }, 2000);
  };

  if (!currentElection) {
    return <div className="loader"></div>;
  }

  // Check if election is active
  const isElectionActive = currentElection.isActive && 
    (!currentElection.endDate || new Date(currentElection.endDate) > new Date());

  return (
    <div className="election-page">
      <div className="election-content">
        <div className="election-header">
          <h1 className="election-title">{currentElection.title}</h1>
          
          <div className="election-meta">
            <div className="status">
              <span className={`status-badge ${isElectionActive ? 'active' : 'inactive'}`}>
                {isElectionActive ? 'Active' : 'Closed'}
              </span>
            </div>
            
            <div className="dates">
              <div className="date-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>Started: {new Date(currentElection.startDate).toLocaleDateString()}</span>
              </div>
              
              {currentElection.endDate && (
                <div className="date-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>Ends: {new Date(currentElection.endDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
          
          {currentElection.description && (
            <div className="election-description">
              <p>{currentElection.description}</p>
            </div>
          )}
        </div>
        
        {message && (
          <div className={`message ${messageType}`}>
            {messageType === 'success' && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            )}
            {messageType === 'error' && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            )}
            {message}
          </div>
        )}
        
        {isElectionActive ? (
          isAuthenticated ? (
            <div className="vote-section">
              <h2 className="section-title">Cast Your Vote</h2>
              <form onSubmit={onSubmit}>
                <div className="candidates-selection">
                  {currentElection.candidates.map((candidate, index) => (
                    <label key={index} className={`candidate-option ${selectedCandidate === index.toString() ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="candidate"
                        value={index}
                        onChange={onChange}
                        checked={selectedCandidate === index.toString()}
                      />
                      <div className="candidate-card">
                        <div className="candidate-info">
                          <h3 className="candidate-name">{candidate.name}</h3>
                          {candidate.party && <span className="candidate-party">{candidate.party}</span>}
                        </div>
                        <div className="check-indicator">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                
                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn-submit-vote"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Submit Vote
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="auth-required">
              <div className="auth-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h2>Authentication Required</h2>
              <p>You must be logged in to cast your vote in this election.</p>
              <div className="auth-actions">
                <Link to="/login" className="btn-login">Login</Link>
                <Link to="/register" className="btn-register">Register</Link>
              </div>
            </div>
          )
        ) : (
          <div className="election-closed">
            <div className="closed-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h2>This Election is Closed</h2>
            <p>Voting is no longer available for this election.</p>
            <Link to={`/results/${currentElection._id}`} className="btn-view-results">
              View Results
            </Link>
          </div>
        )}
      </div>
      
      <div className="page-actions">
        <Link to="/elections" className="btn-back">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Elections
        </Link>
        
        <Link to={`/results/${currentElection._id}`} className="btn-results">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            <line x1="9" y1="9" x2="9" y2="13"></line>
            <line x1="12" y1="8" x2="12" y2="13"></line>
            <line x1="15" y1="11" x2="15" y2="13"></line>
            <path d="M16 6l2 2 4-4"></path>
          </svg>
          View Results
        </Link>
      </div>
    </div>
  );
};

export default ElectionItem;