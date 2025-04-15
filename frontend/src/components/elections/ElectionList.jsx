// components/elections/ElectionList.jsx
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ElectionContext from '../context/election/ElectionContext';
import AuthContext from '../context/auth/AuthContext';

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
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="election-list-container">
      <h1>Available Elections</h1>
      {isAuthenticated && user && user.isAdmin && (
        <Link to="/admin/dashboard" className="btn btn-primary">
          Create New Election
        </Link>
      )}
      <div className="elections">
        {Array.isArray(elections) && elections.length > 0 ? (
          elections.map(election => (
            <div key={election._id} className="election-card">
              <h3>{election.title}</h3>
              <p>{election.description}</p>
              <div className="election-meta">
                <span>Candidates: {election.candidates.length}</span>
                <span>Status: {election.isActive ? 'Active' : 'Closed'}</span>
              </div>
              <Link to={`/elections/${election._id}`} className="btn btn-dark btn-sm">
                View Election
              </Link>
              <Link to={`/results/${election._id}`} className="btn btn-light btn-sm">
                View Results
              </Link>
            </div>
          ))
        ) : (
          <p>No elections available. Please check back later.</p>
        )}
      </div>
    </div>
  );
};

export default ElectionList;
