import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString();

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <h2>MyLogo</h2>
      </div>

      {/* Search Bar */}
      <div className="navbar-search">
        <input type="text" placeholder="Search..." />
      </div>

      <div className="navbar-right">
        <div className="navbar-time-date">
          <span>{formattedTime}</span>
          <span>{formattedDate}</span>
        </div>

        <div className="navbar-icon">
          {/* <FaBell /> */}
        </div>

        <div className="navbar-icon">
          {/* <FaEnvelope /> */}
        </div>

        <div className="navbar-profile">
          <img src="https://via.placeholder.com/40" alt="User Profile" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;