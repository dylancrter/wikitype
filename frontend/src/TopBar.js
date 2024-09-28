import React from 'react';
import { Link } from 'react-router-dom';

function TopBar() {
  return (
    <div style={{ width: '100%', height: '50px', backgroundColor: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        <Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/login-register" style={{ color: '#fff', textDecoration: 'none' }}>Login/Register</Link>
      </div>
    </div>
  );
}

export default TopBar;