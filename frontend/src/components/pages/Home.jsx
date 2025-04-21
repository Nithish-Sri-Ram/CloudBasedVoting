import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import ElectionContext from '../context/election/ElectionContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated, user, loadUser } = useContext(AuthContext);
  const { elections, getElections } = useContext(ElectionContext);

  useEffect(() => {
    loadUser();
    getElections();
    // eslint-disable-next-line
  }, []);

  const activeElections = Array.isArray(elections)
    ? elections.filter(election => election.isActive).slice(0, 3)
    : [];

  const features = [
    {
      title: 'Secure Voting',
      description: 'Your vote is confidential and protected with advanced encryption technology.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      )
    },
    {
      title: 'Accessible Anywhere',
      description: 'Vote from any device with internet access, no matter where you are.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      )
    },
    {
      title: 'Real-Time Results',
      description: 'View election results as they happen with automatic updates.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
          <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
        </svg>
      )
    },
    {
      title: 'Verified Identity',
      description: 'User authentication ensures each person votes only once per election.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <polyline points="17 11 19 13 23 9"></polyline>
        </svg>
      )
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Create an Account',
      description: 'Register with your email to get started.'
    },
    {
      number: '02',
      title: 'Browse Elections',
      description: 'Explore active and upcoming democratic polls.'
    },
    {
      number: '03',
      title: 'Cast Your Vote',
      description: 'Select your preferred candidate securely.'
    },
    {
      number: '04',
      title: 'View Results',
      description: 'See the outcome in real-time after voting.'
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Democracy in the <span className="text-accent">Digital Age</span>
          </h1>
          <p className="hero-subtitle">
            A secure, transparent, and accessible online voting platform
          </p>
          
          {isAuthenticated ? (
            <div className="hero-authenticated">
              <p className="welcome-message">Welcome back, <span className="user-name">{user?.username}</span></p>
              <div className="hero-buttons">
                <Link to="/elections" className="btn-primary">View Active Elections</Link>
                {user && user.isAdmin && (
                  <Link to="/admin/dashboard" className="btn-secondary">Admin Dashboard</Link>
                )}
              </div>
            </div>
          ) : (
            <div className="hero-buttons">
              <Link to="/register" className="btn-primary">Get Started</Link>
              <Link to="/login" className="btn-secondary">Login</Link>
            </div>
          )}
        </div>
        <div className="hero-image">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="hero-illustration">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="8 12 10 14 14 10"></polyline>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose VoteCloud?</h2>
          <p className="section-subtitle">Our platform provides a secure and convenient way to participate in elections.</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Active Elections Section */}
      <section className="elections-section">
        <div className="section-header">
          <h2 className="section-title">Active Elections</h2>
          <p className="section-subtitle">Participate in these ongoing democratic processes.</p>
        </div>
        
        {activeElections.length > 0 ? (
          <div className="elections-preview">
            {activeElections.map(election => (
              <div key={election._id} className="election-preview-card">
                <div className="preview-header">
                  <span className="status-badge active">Active</span>
                  <span className="candidates-count">{election.candidates.length} Candidates</span>
                </div>
                <div className="preview-body">
                  <h3 className="preview-title">{election.title}</h3>
                  <p className="preview-description">
                    {election.description 
                      ? election.description.length > 100 
                        ? `${election.description.substring(0, 100)}...` 
                        : election.description
                      : "No description provided."}
                  </p>
                </div>
                <div className="preview-footer">
                  <div className="date-info">
                    {election.endDate && (
                      <div className="end-date">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>Ends: {new Date(election.endDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  <Link to={`/elections/${election._id}`} className="btn-view">View & Vote</Link>
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
            <p>There are no active elections at the moment.</p>
            <p>Please check back later or contact the administrator.</p>
          </div>
        )}
        
        <div className="view-all-container">
          <Link to="/elections" className="btn-view-all">
            <span>View All Elections</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="steps-section">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Getting started with VoteCloud is easy.</p>
        </div>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Make Your Voice Heard?</h2>
            <p className="cta-description">
              Join thousands of citizens participating in democratic elections through our secure platform.
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-cta">Create Your Account</Link>
              <Link to="/elections" className="btn-cta-secondary">Browse Elections</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;