import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ElectionContext from '../context/election/ElectionContext';
import AuthContext from '../context/auth/AuthContext';
import './ElectionList.css';

const ElectionList = () => {
  const electionContext = useContext(ElectionContext);
  const authContext = useContext(AuthContext);
  const { elections, getElections, loading } = electionContext;
  const { isAuthenticated, user } = authContext;

  useEffect(() => {
    getElections();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <div className="loader"></div>;
  }

  // Separate active and past elections
  const activeElections = elections?.filter(election => election.isActive) || [];
  const pastElections = elections?.filter(election => !election.isActive) || [];

  return (
    <div className="elections-container">
      <div className="elections-header">
        <div>
          <h1 className="page-title">Elections</h1>
          <p className="page-subtitle">Browse and participate in democratic elections</p>
        </div>
        
        {isAuthenticated && user && user.isAdmin && (
          <Link to="/admin/dashboard" className="btn-admin">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            Manage Elections
          </Link>
        )}
      </div>

      <section className="active-elections">
        <h2 className="section-title">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Active Elections
        </h2>

        {activeElections.length > 0 ? (
          <div className="elections-grid">
            {activeElections.map(election => (
              <div key={election._id} className="election-card">
                <div className="card-header">
                  <span className="status-badge active">Active</span>
                  <span className="candidates-count">
                    {election.candidates.length} Candidates
                  </span>
                </div>
                <div className="card-body">
                  <h3 className="election-title">{election.title}</h3>
                  <p className="election-description">
                    {election.description ? (
                      election.description.length > 100 ? 
                        `${election.description.substring(0, 100)}...` : 
                        election.description
                    ) : (
                      <span className="no-description">No description provided</span>
                    )}
                  </p>
                </div>
                <div className="card-footer">
                  <div className="election-meta">
                    <div className="meta-item">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>Started: {new Date(election.startDate).toLocaleDateString()}</span>
                    </div>
                    {election.endDate && (
                      <div className="meta-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>Ends: {new Date(election.endDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  <div className="card-actions">
                    <Link to={`/elections/${election._id}`} className="btn-primary">
                      Vote Now
                    </Link>
                    <Link to={`/results/${election._id}`} className="btn-secondary">
                      Results
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-elections">
            <div className="no-elections-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <p>There are no active elections at the moment</p>
          </div>
        )}
      </section>

      {pastElections.length > 0 && (
        <section className="past-elections">
          <h2 className="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="4 7 4 4 20 4 20 7"></polyline>
              <line x1="9" y1="20" x2="15" y2="20"></line>
              <line x1="12" y1="4" x2="12" y2="20"></line>
            </svg>
            Past Elections
          </h2>
          <div className="elections-grid">
            {pastElections.map(election => (
              <div key={election._id} className="election-card past">
                <div className="card-header">
                  <span className="status-badge inactive">Closed</span>
                  <span className="candidates-count">
                    {election.candidates.length} Candidates
                  </span>
                </div>
                <div className="card-body">
                  <h3 className="election-title">{election.title}</h3>
                  <p className="election-description">
                    {election.description ? (
                      election.description.length > 100 ? 
                        `${election.description.substring(0, 100)}...` : 
                        election.description
                    ) : (
                      <span className="no-description">No description provided</span>
                    )}
                  </p>
                </div>
                <div className="card-footer">
                  <div className="election-meta">
                    <div className="meta-item">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>{new Date(election.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Link to={`/results/${election._id}`} className="btn-view-results">
                    View Results
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ElectionList;