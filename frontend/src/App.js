import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './About';
import './App.css';
import LoginRegister from './LoginRegister';
import TopBar from './TopBar';
import logo from './logo.jpeg';

function Home({ inputValue, handleInputChange }) {
  return (
    <div style={{ height: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 50px)' }}>
        <img src={logo} alt="Logo" />
        <label>
          <input
            name="myInput"
            value={inputValue}
            onChange={handleInputChange}
            style={{ width: '300px', height: '40px', fontSize: '20px' }}
          />
        </label>
      </div>
    </div>
  );
}
  
function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Router>
      <div style={{ height: '100vh' }}>
        <TopBar />
        <Routes>
          <Route path="/" element={<Home inputValue={inputValue} handleInputChange={handleInputChange} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login-register" element={<LoginRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;