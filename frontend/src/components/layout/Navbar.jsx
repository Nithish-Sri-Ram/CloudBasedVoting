import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const onLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="logo-icon">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <span>Vote<span className="logo-accent">Cloud</span></span>
        </Link>
        
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </div>
        
        <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="nav-items">
            <Link to="/" className={`nav-link ${isActive('/')}`} onClick={closeMobileMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Home</span>
            </Link>
            
            <Link to="/elections" className={`nav-link ${isActive('/elections')}`} onClick={closeMobileMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="8" x2="8" y2="8"></line>
                <line x1="16" y1="12" x2="8" y2="12"></line>
                <line x1="16" y1="16" x2="8" y2="16"></line>
              </svg>
              <span>Elections</span>
            </Link>
          </div>
          
          <div className="auth-links">
            {isAuthenticated ? (
              <>
                <div className="user-info">
                  <div className="user-avatar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <span className="user-name">{user && user.username}</span>
                </div>
                
                {user && user.isAdmin && (
                  <Link 
                    to="/admin/dashboard" 
                    className={`nav-link admin-link ${isActive('/admin/dashboard')}`}
                    onClick={closeMobileMenu}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>Admin</span>
                  </Link>
                )}
                
                <button onClick={onLogout} className="logout-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`auth-btn login-btn ${isActive('/login')}`} onClick={closeMobileMenu}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                  <span>Login</span>
                </Link>
                
                <Link to="/register" className={`auth-btn register-btn ${isActive('/register')}`} onClick={closeMobileMenu}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;