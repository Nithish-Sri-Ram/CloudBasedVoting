import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ElectionContext from '../context/election/ElectionContext';
import './ElectionResult.css';

const ElectionResults = () => {
  const { id } = useParams();
  const electionContext = useContext(ElectionContext);
  const { getElection, currentElection } = electionContext;
  const [localElection, setLocalElection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchElection = async () => {
      await getElection(id);
      setIsLoading(false);
    };
    
    fetchElection();
    
    // Optional: Set up socket.io for real-time updates
    // This would require socket.io setup on the backend
    // const socket = io();
    // socket.on('voteUpdate', data => {
    //   if (data.electionId === id) {
    //     setLocalElection(prevElection => {
    //       if (!prevElection) return prevElection;
    //       const updatedCandidates = [...prevElection.candidates];
    //       updatedCandidates[data.candidateIndex].votes += 1;
    //       return {
    //         ...prevElection,
    //         candidates: updatedCandidates
    //       };
    //     });
    //   }
    // });
    // return () => socket.disconnect();
    
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (currentElection) {
      setLocalElection(currentElection);
    }
  }, [currentElection]);

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (!localElection) {
    return (
      <div className="results-container">
        <div className="error-message">
          <h2>Election Not Found</h2>
          <p>The election you are looking for doesn't exist or has been removed.</p>
          <Link to="/elections" className="btn-back">Back to Elections</Link>
        </div>
      </div>
    );
  }

  // Calculate total votes
  const totalVotes = localElection.candidates.reduce((acc, candidate) => acc + candidate.votes, 0);
  
  // Sort candidates by votes (highest first)
  const sortedCandidates = [...localElection.candidates]
    .sort((a, b) => b.votes - a.votes)
    .map((candidate, index) => {
      const percentage = totalVotes > 0 ? Math.round((candidate.votes / totalVotes) * 100) : 0;
      return {
        ...candidate,
        position: index + 1,
        percentage
      };
    });
  
  // Find the winner (if any)
  const winner = totalVotes > 0 ? sortedCandidates[0] : null;
  const isWinner = winner && winner.votes > 0;
  const isTie = winner && sortedCandidates.length > 1 && winner.votes === sortedCandidates[1].votes;

  return (
    <div className="results-page">
      <div className="results-content">
        <div className="results-header">
          <h1 className="election-title">{localElection.title}</h1>
          
          <div className="election-meta">
            <div className="status">
              <span className={`status-badge ${localElection.isActive ? 'active' : 'inactive'}`}>
                {localElection.isActive ? 'Active' : 'Closed'}
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
                <span>Started: {new Date(localElection.startDate).toLocaleDateString()}</span>
              </div>
              
              {localElection.endDate && (
                <div className="date-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>Ends: {new Date(localElection.endDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
          
          {localElection.description && (
            <div className="election-description">
              <p>{localElection.description}</p>
            </div>
          )}
        </div>
        
        <div className="results-summary">
          <div className="votes-summary">
            <div className="summary-item">
              <span className="summary-label">Total Votes</span>
              <span className="summary-value">{totalVotes}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Candidates</span>
              <span className="summary-value">{localElection.candidates.length}</span>
            </div>
          </div>
          
          {isWinner && (
            <div className={`winner-section ${isTie ? 'tie' : ''}`}>
              {isTie ? (
                <h2 className="tie-heading">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                  </svg>
                  It's a Tie!
                </h2>
              ) : (
                <>
                  <div className="winner-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                    Winner
                  </div>
                  <h2 className="winner-name">{winner.name}</h2>
                  {winner.party && <div className="winner-party">{winner.party}</div>}
                  <div className="winner-stats">
                    <span className="winner-votes">{winner.votes} votes</span>
                    <span className="winner-percentage">{winner.percentage}% of total</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="results-details">
          <h2 className="section-title">Results Breakdown</h2>
          
          {totalVotes > 0 ? (
            <div className="candidates-results">
              {sortedCandidates.map((candidate, index) => (
                <div key={index} className="result-row">
                  <div className="candidate-position">#{candidate.position}</div>
                  <div className="candidate-info">
                    <div className="candidate-name-wrapper">
                      <h3 className="candidate-name">{candidate.name}</h3>
                      {candidate.party && <span className="candidate-party">{candidate.party}</span>}
                    </div>
                    <div className="votes-info">
                      <span className="votes-count">{candidate.votes} votes</span>
                      <span className="votes-percentage">{candidate.percentage}%</span>
                    </div>
                  </div>
                  <div className="result-bar-container">
                    <div 
                      className="result-bar" 
                      style={{ width: `${candidate.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-votes">
              <div className="no-votes-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
              <p>No votes have been cast yet</p>
              {localElection.isActive && (
                <Link to={`/elections/${localElection._id}`} className="btn-primary">
                  Be the first to vote
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="page-actions">
        <Link to="/elections" className="btn-back">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Elections
        </Link>
        
        {localElection.isActive && (
          <Link to={`/elections/${localElection._id}`} className="btn-vote">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Cast Your Vote
          </Link>
        )}
      </div>
    </div>
  );
};

export default ElectionResults;