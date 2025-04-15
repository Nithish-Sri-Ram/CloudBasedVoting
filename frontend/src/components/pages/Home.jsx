import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import ElectionContext from '../context/election/ElectionContext';
import './Home.css'; // Assuming you have a CSS file for styles

const Home = () => {
  const { isAuthenticated, user, loadUser } = useContext(AuthContext);
  const { elections, getElections } = useContext(ElectionContext);

  useEffect(() => {
    loadUser();
    getElections();
  }, []);

  const activeElections = Array.isArray(elections)
    ? elections.filter(election => election.isActive).slice(0, 3)
    : [];

    const features = [
      {
        title: 'Secure Voting',
        description: 'Your vote is confidential and protected with advanced encryption.',
        svg: (
          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        ),
      },
      {
        title: 'Cloud-Based',
        description: 'Vote from anywhere, anytime using any device with internet access.',
        svg: (
          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        ),
      },
      {
        title: 'Real-Time Results',
        description: 'Watch results update in real-time as votes are cast.',
        svg: (
          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
      },
      {
        title: 'User Authentication',
        description: 'Ensures one vote per registered user for fair results.',
        svg: (
          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
      },
    ];
    

  return (
    <>
      {/* Header is assumed to be in a layout component */}
      
      {/* Hero Section */}
      <section className="hero-section">
  <div className="hero-container" style={{width:'70vw', margin:'0 auto'}}>
    <h1 className="hero-title">
      Welcome to <span className="hero-highlight">VoteCloud</span>
    </h1>
    <p className="hero-subtitle">
      A secure cloud-based voting system for political elections.
    </p>

    {!isAuthenticated ? (
      <div className="hero-buttons">
        <Link to="/register" className="hero-btn register-btn">Register</Link>
        <Link to="/login" className="hero-btn login-btn">Login</Link>
      </div>
    ) : (
      <div className="hero-auth">
        <p className="hero-welcome">Welcome back, {user?.username}!</p>
        <Link to="/elections" className="register-btn">View Active Elections</Link>
      </div>
    )}
  </div>
</section>

      <div className="home-container bg-white">
        {/* Recent Elections Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-3xl font-bold text-center mb-12 text-gray-800">Recent Active Elections</h2>
            
            {activeElections.length > 0 ? (
              <div className="election-preview-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeElections.map(election => (
                  <div key={election._id} className="election-card bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition duration-300 hover:shadow-xl">
                    <div className="h-40 bg-blue-100 flex items-center justify-center">
                      <img src="/api/placeholder/400/320" alt="Election" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{election.title}</h3>
                      <p className="text-gray-600 mb-4">{election.description?.substring(0, 100)}...</p>
                      <div className="election-meta flex justify-between text-sm text-gray-500 mb-4">
                        <span>{election.candidates.length} Candidates</span>
                        {election.endDate && (
                          <span>Ends: {new Date(election.endDate).toLocaleDateString()}</span>
                        )}
                      </div>
                      <Link to={`/elections/${election._id}`} className="btn btn-primary block w-full text-center py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">View Election</Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center bg-blue-50 rounded-lg p-8 max-w-2xl mx-auto">
                <svg className="custom-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                 <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M12 9v2m0 4h.01M5.062 20h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 17c-.77 1.333.192 3 1.732 3z"
                     />
                 </svg>

                 <p className="no-elections-message">There are currently no active elections. Please check back later.</p>

              </div>
            )}
            
          
                <div className="view-elections-wrapper">
                   <Link to="/elections" className="view-elections-btn">View All Elections</Link>
               </div>
          </div>


        </section>

        {/* Features Section */}
        <section className="features-section">
      <div className="features-container">
        <h2 className="section-title">Why Choose VoteCloud?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.svg}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
            
            <div className="steps-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: 1, title: "Register to Vote", description: "Create an account with your verified credentials." },
                { number: 2, title: "Browse Active Elections", description: "View current and upcoming elections." },
                { number: 3, title: "Cast Your Vote", description: "Select your preferred candidate securely." },
                { number: 4, title: "View Results", description: "See real-time election results as they come in." }
              ].map((step, index) => (
                <div key={index} className="step-card bg-white p-6 border border-gray-200 rounded-lg text-center relative">
                  <div className="step-number w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold absolute -top-6 left-1/2 transform -translate-x-1/2">{step.number}</div>
                  <div className="pt-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!isAuthenticated && (
          <section className="cta-section py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Ready to Make Your Voice Heard?</h2>
                <p className="text-xl mb-8">Join thousands of citizens participating in democratic elections through our secure platform.</p>
                <Link to="/register" className="btn btn-primary px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition duration-300 inline-block">Get Started Now</Link>
              </div>
            </div>
          </section>
        )}
        
        {/* Footer */}
        <footer className="bg-gray-100 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zm5 2a2 2 0 11-4 0 2 2 0 014 0zm-8 8a2 2 0 100-4 2 2 0 000 4zm0 1a3 3 0 100-6 3 3 0 000 6z" />
                  </svg>
                  <span className="ml-2 text-lg font-medium text-gray-800">VoteCloud</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">© 2025 VoteCloud. All rights reserved.</p>
              </div>
              <div className="flex space-x-6">
                <a href="/about" className="text-gray-600 hover:text-blue-600">About</a>
                <a href="/contact" className="text-gray-600 hover:text-blue-600">Contact</a>
                <a href="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</a>
                <a href="/terms" className="text-gray-600 hover:text-blue-600">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;