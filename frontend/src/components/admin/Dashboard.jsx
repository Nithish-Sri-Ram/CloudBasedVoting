import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import ElectionContext from '../context/election/ElectionContext';
import ElectionForm from './ElectionForm';
import './Dashboard.css'; // <- Add this import for styles

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
        <h2>Not Authorized</h2>
        <p>You must be an admin to view this page.</p>
        <Link to="/" className="btn-back-home">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-subtitle">Welcome, {user.username}</p>
        <button
          className="btn-primary"
          onClick={() => {
            setCurrentElectionId(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Hide Form' : 'Create New Election'}
        </button>
      </div>

      {showForm && (
        <div className="form-wrapper">
          <ElectionForm
            electionId={currentElectionId}
            onClose={() => {
              setShowForm(false);
              setCurrentElectionId(null);
            }}
          />
        </div>
      )}

      <div className="election-section">
        <h2 className="section-title">Manage Elections</h2>
        {elections && elections.length > 0 ? (
          <div className="table-wrapper">
            <table className="election-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {elections.map((election) => (
                  <tr key={election._id}>
                    <td>{election.title}</td>
                    <td>
                      <span className={`status-badge ${election.isActive ? 'active' : 'inactive'}`}>
                        {election.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>{new Date(election.startDate).toLocaleDateString()}</td>
                    <td>{election.endDate ? new Date(election.endDate).toLocaleDateString() : 'N/A'}</td>
                    <td className="action-buttons">
                      <button className="btn-sm dark" onClick={() => editElection(election._id)}>Edit</button>
                      <button className="btn-sm light" onClick={() => toggleElectionStatus(election)}>
                        {election.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <Link to={`/results/${election._id}`} className="btn-sm info">View Results</Link>
                      <button className="btn-sm danger" onClick={() => onDelete(election._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-data">No elections available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
