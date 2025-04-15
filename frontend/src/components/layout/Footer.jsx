import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          © {new Date().getFullYear()} <span className="highlight">VoteCloud</span> — Secure Cloud-Based Voting System
        </p>
        <p className="footer-subtext">
          Designed and Developed by <strong>SRM AP Students</strong>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
