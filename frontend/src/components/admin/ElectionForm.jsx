import React, { useState, useContext, useEffect } from 'react';
import ElectionContext from '../context/election/ElectionContext';
import './ElectionForm.css';

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
    <div className="election-form">
      <div className="form-header">
        <h2 className="form-title">{electionId ? 'Edit Election' : 'Create New Election'}</h2>
        <button className="btn-close" onClick={onClose} aria-label="Close form">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <div className="form-section">
            <h3 className="section-label">Election Details</h3>

            <div className="form-group">
              <label htmlFor="title">
                <span className="required">*</span> Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={onChange}
                required
                placeholder="Enter election title"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={onChange}
                rows="3"
                placeholder="Provide a short description"
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={endDate}
                  onChange={onChange}
                />
              </div>
              
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={isActive}
                    onChange={e => setElection({ ...election, isActive: e.target.checked })}
                  />
                  <span className="checkbox-text">Active</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="candidates-header">
              <h3 className="section-label">Candidates</h3>
              <button 
                type="button" 
                className="btn-add-candidate"
                onClick={addCandidate}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Candidate
              </button>
            </div>

            <div className="candidates-list">
              {candidates.map((candidate, index) => (
                <div key={index} className="candidate-item">
                  <div className="candidate-number">{index + 1}</div>
                  <div className="candidate-fields">
                    <div className="form-group">
                      <label htmlFor={`candidate-name-${index}`}>
                        <span className="required">*</span> Name
                      </label>
                      <input
                        type="text"
                        id={`candidate-name-${index}`}
                        placeholder="Candidate name"
                        value={candidate.name}
                        onChange={e => onCandidateChange(e, index, 'name')}
                        required
                      />
                    </div>
                    <div className="form-group">
                                              <label htmlFor={`candidate-party-${index}`}>Party</label>
                      <input
                        type="text"
                        id={`candidate-party-${index}`}
                        placeholder="Political party (optional)"
                        value={candidate.party}
                        onChange={e => onCandidateChange(e, index, 'party')}
                      />
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="btn-remove-candidate"
                    onClick={() => removeCandidate(index)}
                    aria-label="Remove candidate"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            {electionId ? 'Update Election' : 'Create Election'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ElectionForm;