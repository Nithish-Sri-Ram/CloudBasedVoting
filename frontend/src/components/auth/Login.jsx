import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { email, password } = formData;

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      const { from } = location.state || { from: { pathname: '/' } };
      navigate(from.pathname);
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
    if (email === '' || password === '') {
      setAlert({ show: true, message: 'Please fill in all fields', type: 'error' });
      return;
    }
    
    setIsSubmitting(true);
    login({ email, password });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your VoteCloud account</p>
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
              'Sign In'
            )}
          </button>

          <p className="auth-footer">
            Don't have an account? <Link to="/register">Create Account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;