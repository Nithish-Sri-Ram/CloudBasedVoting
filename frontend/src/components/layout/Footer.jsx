import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-branding">
            <Link to="/" className="footer-logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="logo-icon">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>Vote<span className="logo-accent">Cloud</span></span>
            </Link>
            <p className="footer-tagline">Secure Cloud-Based Voting System</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h3 className="footer-links-title">Platform</h3>
              <ul className="footer-links-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/elections">Elections</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h3 className="footer-links-title">Resources</h3>
              <ul className="footer-links-list">
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/help">Help Center</a></li>
                <li><a href="/security">Security</a></li>
                <li><a href="/blog">Blog</a></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h3 className="footer-links-title">Company</h3>
              <ul className="footer-links-list">
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/press">Press</a></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h3 className="footer-links-title">Legal</h3>
              <ul className="footer-links-list">
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/cookies">Cookie Policy</a></li>
                <li><a href="/compliance">Compliance</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© {currentYear} VoteCloud. All rights reserved.</p>
          <div className="social-links">
            <a href="https://twitter.com" className="social-link" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="https://facebook.com" className="social-link" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://github.com" className="social-link" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;