import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { username, email, password, password2 } = formData;

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/');
    }

    // Set alert if there's an error
    if (error) {
      setAlert({ show: true, message: error, type: 'error' });
      setIsSubmitting(false);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [isAuthenticated, error, navigate]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    
    if (username === '' || email === '' || password === '') {
      setAlert({ show: true, message: 'Please fill in all required fields', type: 'error' });
      return;
    }
    
    if (password !== password2) {
      setAlert({ show: true, message: 'Passwords do not match', type: 'error' });
      return;
    }
    
    if (password.length < 6) {
      setAlert({ show: true, message: 'Password must be at least 6 characters', type: 'error' });
      return;
    }
    
    setIsSubmitting(true);
    register({ username, email, password });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join VoteCloud and start participating in elections</p>
        </div>

        <form onSubmit={onSubmit} className="auth-form">
          {alert.show && (
            <div className={`alert alert-${alert.type}`}>
              {alert.type === 'error' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              )}
              {alert.message}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={onChange}
              className="form-input"
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              className="form-input"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              className="form-input"
              placeholder="••••••••"
              required
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password2" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              className="form-input"
              placeholder="••••••••"
              required
              minLength="6"
            />
          </div>

          <button 
            type="submit" 
            className="btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="loader-small"></span>
            ) : (
              'Create Account'
            )}
          </button>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;