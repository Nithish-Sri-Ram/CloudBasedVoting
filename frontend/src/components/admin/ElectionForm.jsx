import React, { useState, useContext, useEffect } from 'react';
import ElectionContext from '../context/election/ElectionContext';

const ElectionForm = ({ electionId, onClose }) => {
  const electionContext = useContext(ElectionContext);
  const { addElection, updateElection, elections, clearCurrent } = electionContext;

  const [election, setElection] = useState({
    title: '',
    description: '',
    candidates: [{ name: '', party: '' }, { name: '', party: '' }],
    isActive: true,
    endDate: ''
  });

  useEffect(() => {
    if (electionId) {
      const currentElection = elections.find(e => e._id === electionId);
      if (currentElection) {
        setElection({
          ...currentElection,
          endDate: currentElection.endDate ? new Date(currentElection.endDate).toISOString().split('T')[0] : ''
        });
      }
    }
    return () => {
      clearCurrent();
    };
  }, [electionId, elections, clearCurrent]);

  const { title, description, candidates, isActive, endDate } = election;

  const onChange = e => {
    setElection({ ...election, [e.target.name]: e.target.value });
  };

  const onCandidateChange = (e, index, field) => {
    const newCandidates = [...candidates];
    newCandidates[index][field] = e.target.value;
    setElection({ ...election, candidates: newCandidates });
  };

  const addCandidate = () => {
    setElection({ ...election, candidates: [...candidates, { name: '', party: '' }] });
  };

  const removeCandidate = index => {
    if (candidates.length <= 2) {
      alert('An election must have at least 2 candidates');
      return;
    }
    const newCandidates = candidates.filter((_, i) => i !== index);
    setElection({ ...election, candidates: newCandidates });
  };

  const onSubmit = e => {
    e.preventDefault();
    
    if (title.trim() === '') {
      alert('Please add a title');
      return;
    }
    
    if (candidates.some(candidate => candidate.name.trim() === '')) {
      alert('Please fill in all candidate names');
      return;
    }
    
    const formData = {
      ...election,
      candidates: candidates.map(candidate => ({
        name: candidate.name,
        party: candidate.party,
        votes: candidate.votes || 0
      }))
    };
    
    if (electionId) {
      updateElection(formData);
    } else {
      addElection(formData);
    }
    
    onClose();
  };

  return (
    <div className="election-form-container">
      <h2>{electionId ? 'Edit Election' : 'Create New Election'}</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={onChange}
            rows="3"
          ></textarea>
        </div>
        
        <div className="form-group">
          <label>Candidates</label>
          {candidates.map((candidate, index) => (
            <div key={index} className="candidate-input">
              <input
                type="text"
                placeholder="Candidate Name"
                value={candidate.name}
                onChange={e => onCandidateChange(e, index, 'name')}
                required
              />
              <input
                type="text"
                placeholder="Party"
                value={candidate.party}
                onChange={e => onCandidateChange(e, index, 'party')}
              />
              <button 
                type="button" 
                className="btn btn-sm btn-danger"
                onClick={() => removeCandidate(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button 
            type="button" 
            className="btn btn-sm btn-light"
            onClick={addCandidate}
          >
            Add Candidate
          </button>
        </div>
        
        <div className="form-group">
          <label htmlFor="endDate">End Date (Optional)</label>
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={onChange}
          />
        </div>
        
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="isActive"
              checked={isActive}
              onChange={e => setElection({ ...election, isActive: e.target.checked })}
            />
            Active
          </label>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {electionId ? 'Update Election' : 'Create Election'}
          </button>
          <button 
            type="button" 
            className="btn btn-light"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ElectionForm;
