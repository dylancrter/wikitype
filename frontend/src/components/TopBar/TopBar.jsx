import React from 'react';
import { NavLink } from 'react-router-dom';
import './TopBar.scss';

function TopBar() {
  return (
    <div className="top-bar">
      <div className="nav-left">
        <NavLink to="/" className="logo" end>
          wikitype
        </NavLink>
      </div>
      <div className="nav-right">
        <NavLink to="/info" className="nav-icon" title="Information">
          <i className="fas fa-info-circle"></i>
        </NavLink>
        <NavLink to="/settings" className="nav-icon" title="Settings">
          <i className="fas fa-cog"></i>
        </NavLink>
      </div>
    </div>
  );
}

export default TopBar;