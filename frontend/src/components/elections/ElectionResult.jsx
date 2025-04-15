import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ElectionContext from '../context/election/ElectionContext';
import io from 'socket.io-client';

const ElectionResults = () => {
  const { id } = useParams();
  const electionContext = useContext(ElectionContext);
  const { getElection, currentElection } = electionContext;
  const [localElection, setLocalElection] = useState(null);

  useEffect(() => {
    getElection(id);
    
    // Socket.io for real-time updates
    const socket = io();
    
    socket.on('voteUpdate', data => {
      if (data.electionId === id) {
        // Update the local state when a new vote comes in
        setLocalElection(prevElection => {
          if (!prevElection) return prevElection;
          
          const updatedCandidates = [...prevElection.candidates];
          updatedCandidates[data.candidateIndex].votes += 1;
          
          return {
            ...prevElection,
            candidates: updatedCandidates
          };
        });
      }
    });
    
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (currentElection) {
      setLocalElection(currentElection);
    }
  }, [currentElection]);

  if (!localElection) {
    return <div className="loader">Loading...</div>;
  }

  // Calculate total votes
  const totalVotes = localElection.candidates.reduce((acc, candidate) => acc + candidate.votes, 0);

  // Sort candidates by votes (highest first)
  const sortedCandidates = [...localElection.candidates].sort((a, b) => b.votes - a.votes);

  return (
    <div className="results-container">
      <h1>{localElection.title} - Results</h1>
      <p className="lead">{localElection.description}</p>
      
      <div className="total-votes">
        Total Votes: <strong>{totalVotes}</strong>
      </div>
      
      <div className="results-chart">
        {sortedCandidates.map((candidate, index) => {
          const percentage = totalVotes > 0 ? Math.round((candidate.votes / totalVotes) * 100) : 0;
          
          return (
            <div key={index} className="result-item">
              <div className="result-label">
                <span><strong>{candidate.name}</strong> {candidate.party && `(${candidate.party})`}</span>
                <span>{candidate.votes} votes ({percentage}%)</span>
              </div>
              <div className="result-bar-container">
                <div 
                  className="result-bar" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="election-status">
        <p>
          Status: <strong>{localElection.isActive ? 'Active' : 'Closed'}</strong>
        </p>
        {localElection.endDate && (
          <p>
            End Date: <strong>{new Date(localElection.endDate).toLocaleDateString()}</strong>
          </p>
        )}
      </div>
      
      <div className="election-actions">
        <Link to="/elections" className="btn btn-light">
          Back to Elections
        </Link>
        {localElection.isActive && (
          <Link to={`/elections/${localElection._id}`} className="btn btn-primary">
            Vote Now
          </Link>
        )}
      </div>
    </div>
  );
};

export default ElectionResults;
