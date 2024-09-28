// Home.js
import React from 'react';
import './Home.css'; // Create this CSS file
import logo from './logo.jpeg';

function Home({ inputValue, handleInputChange }) {
  return (
    <div className="home-container">
      <img src={logo} alt="Logo" className="home-logo" />
      <input
        name="myInput"
        value={inputValue}
        onChange={handleInputChange}
        className="home-input"
        placeholder="Enter text"
      />
    </div>
  );
}

export default Home;
