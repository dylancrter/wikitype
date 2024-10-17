import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.scss';
import TopBar from './components/TopBar/TopBar';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import TypingScreen from './pages/TypingScreen/TypingScreen';

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
            <Route path="/typing" element={<TypingScreen />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
