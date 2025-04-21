import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ElectionList from './components/elections/ElectionList';
import ElectionItem from './components/elections/ElectionItem';
import ElectionResults from './components/elections/ElectionResult';
import Dashboard from './components/admin/Dashboard';
import PrivateRoute from './components/utils/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary';
import AuthState from './components/context/auth/AuthState';
import ElectionState from './components/context/election/ElectionState';
import setAuthToken from './components/utils/SetAuthToken';
import './App.css';

// Check for token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ElectionState>
        <Router>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/elections" element={<ElectionList />} />
                  <Route path="/elections/:id" element={<ElectionItem />} />
                  <Route path="/results/:id" element={<ElectionResults />} />
                  <Route 
                    path="/admin/dashboard" 
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    } 
                  />
                </Routes>
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        </Router>
      </ElectionState>
    </AuthState>
  );
};

export default App;