// App.js
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './About';
import './App.css';
import Home from './Home'; // Updated import
import LoginRegister from './LoginRegister';
import TopBar from './TopBar';

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Router>
      <div className="app-container">
        <TopBar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home inputValue={inputValue} handleInputChange={handleInputChange} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login-register" element={<LoginRegister />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
