// TopBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './TopBar.css';

function TopBar() {
  return (
    <div className="top-bar">
      <div className="nav-left">
        <NavLink to="/" className="nav-link" end>
          Home
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About
        </NavLink>
      </div>
      <div className="nav-right">
        <NavLink to="/login-register" className="nav-link">
          Login/Register
        </NavLink>
      </div>
    </div>
  );
}

export default TopBar;
