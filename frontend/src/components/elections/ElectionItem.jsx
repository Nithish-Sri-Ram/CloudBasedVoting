import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ElectionContext from '../context/election/ElectionContext';
import AuthContext from '../context/auth/AuthContext';

const ElectionItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const electionContext = useContext(ElectionContext);
  const authContext = useContext(AuthContext);
  const { getElection, currentElection, castVote, error, clearErrors } = electionContext;
  const { isAuthenticated } = authContext;

  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    getElection(id);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (error) {
      setMessage(error);
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
    } else {
      castVote({
        electionId: currentElection._id,
        candidateIndex: parseInt(selectedCandidate)
      });
      setMessage('Your vote has been recorded!');
      setTimeout(() => {
        navigate(`/results/${currentElection._id}`);
      }, 2000);
    }
  };

  if (!currentElection) {
    return <div className="loader">Loading...</div>;
  }

  // Check if election is active
  const isElectionActive = currentElection.isActive && 
    (!currentElection.endDate || new Date(currentElection.endDate) > new Date());

  return (
    <div className="election-container">
      <h1>{currentElection.title}</h1>
      <p className="lead">{currentElection.description}</p>
      
      {message && <div className="alert">{message}</div>}
      
      {isElectionActive ? (
        isAuthenticated ? (
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <h3>Select a Candidate</h3>
              {currentElection.candidates.map((candidate, index) => (
                <div key={index} className="radio">
                  <label>
                    <input
                      type="radio"
                      name="candidate"
                      value={index}
                      onChange={onChange}
                      checked={selectedCandidate === index.toString()}
                    />
                    <strong>{candidate.name}</strong> {candidate.party && `(${candidate.party})`}
                  </label>
                </div>
              ))}
            </div>
            <input type="submit" value="Cast Vote" className="btn btn-primary" />
          </form>
        ) : (
          <div className="alert">
            Please <Link to="/login">login</Link> to vote
          </div>
        )
      ) : (
        <div className="alert alert-info">
          This election is no longer active. View the <Link to={`/results/${currentElection._id}`}>results</Link>.
        </div>
      )}
      
      <div className="election-actions">
        <Link to="/elections" className="btn btn-light">
          Back to Elections
        </Link>
        <Link to={`/results/${currentElection._id}`} className="btn btn-dark">
          View Results
        </Link>
      </div>
    </div>
  );
};

export default ElectionItem;
