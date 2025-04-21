import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import ElectionContext from '../context/election/ElectionContext';
import ElectionForm from './ElectionForm';
import './Dashboard.css';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const electionContext = useContext(ElectionContext);
  const { user, loadUser } = authContext;
  const { elections, getElections, deleteElection, updateElection } = electionContext;

  const [showForm, setShowForm] = useState(false);
  const [currentElectionId, setCurrentElectionId] = useState(null);

  useEffect(() => {
    loadUser();
    getElections();
    // eslint-disable-next-line
  }, []);

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this election?')) {
      deleteElection(id);
    }
  };

  const toggleElectionStatus = (election) => {
    updateElection({ ...election, isActive: !election.isActive });
  };

  const editElection = (id) => {
    setCurrentElectionId(id);
    setShowForm(true);
  };

  if (!user || !user.isAdmin) {
    return (
      <div className="not-authorized">
        <div className="not-authorized-content">
          <div className="not-authorized-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h2>Access Restricted</h2>
          <p>You must have administrator privileges to view this page.</p>
          <Link to="/" className="btn-back-home">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtitle">Welcome, <span className="user-name">{user.username}</span></p>
        </div>
        <button
          className="btn-create"
          onClick={() => {
            setCurrentElectionId(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Hide Form
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Create Election
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <ElectionForm
            electionId={currentElectionId}
            onClose={() => {
              setShowForm(false);
              setCurrentElectionId(null);
            }}
          />
        </div>
      )}

      <div className="elections-section">
        <div className="section-header">
          <h2 className="section-title">Manage Elections</h2>
          <div className="section-stats">
            <div className="stat-item">
              <span className="stat-value">{elections ? elections.length : 0}</span>
              <span className="stat-label">Total Elections</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{elections ? elections.filter(e => e.isActive).length : 0}</span>
              <span className="stat-label">Active</span>
            </div>
          </div>
        </div>

        {elections && elections.length > 0 ? (
          <div className="table-container">
            <table className="elections-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Candidates</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {elections.map((election) => (
                  <tr key={election._id}>
                    <td className="election-title">{election.title}</td>
                    <td>
                      <span className={`status-badge ${election.isActive ? 'active' : 'inactive'}`}>
                        {election.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>{new Date(election.startDate).toLocaleDateString()}</td>
                    <td>{election.endDate ? new Date(election.endDate).toLocaleDateString() : '—'}</td>
                    <td className="candidates-count">{election.candidates.length}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-action edit" 
                          onClick={() => editElection(election._id)}
                          aria-label="Edit election"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                          <span>Edit</span>
                        </button>
                        
                        <button 
                          className="btn-action toggle" 
                          onClick={() => toggleElectionStatus(election)}
                          aria-label={election.isActive ? 'Deactivate election' : 'Activate election'}
                        >
                          {election.isActive ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18"></path>
                                <path d="M6 6l12 12"></path>
                              </svg>
                              <span>Deactivate</span>
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              <span>Activate</span>
                            </>
                          )}
                        </button>
                        
                        <Link 
                          to={`/results/${election._id}`} 
                          className="btn-action view"
                          aria-label="View results"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          <span>Results</span>
                        </Link>
                        
                        <button 
                          className="btn-action delete" 
                          onClick={() => onDelete(election._id)}
                          aria-label="Delete election"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-data-container">
            <div className="no-data-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 12h8"></path>
              </svg>
            </div>
            <p className="no-data-text">No elections have been created yet</p>
            <button 
              className="btn-create-first"
              onClick={() => {
                setCurrentElectionId(null);
                setShowForm(true);
              }}
            >
              Create Your First Election
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;