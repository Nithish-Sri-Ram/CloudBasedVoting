import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;
  
  const onLogout = () => {
    logout();
  };
  
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="logo-dots"></span>
        VoteCloud
      </Link>
      
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <span className="user-greeting">Hello, {user && user.username}</span>
            <Link to="/elections">Elections</Link>
            {user && user.isAdmin && (
              <Link to="/admin" className="admin-link">Admin Dashboard</Link>
            )}
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/elections">Elections</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;