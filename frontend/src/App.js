import React, { Suspense } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.scss';

// Components
import Metrics from './components/Metrics/Metrics';
import TopBar from './components/TopBar/TopBar';

// Pages
import About from './pages/About/About';
import Home from './pages/Home/Home';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import TypingScreen from './pages/TypingScreen/TypingScreen';

// Loading fallback
const LoadingFallback = () => <div className="loading">Loading...</div>;

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <TopBar />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Navigate to="/typing" replace />} />
              <Route path="/typing" element={<TypingScreen />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<LoginRegister />} />
              <Route path="*" element={<Navigate to="/typing" replace />} />
            </Routes>
          </Suspense>
          <Metrics />
        </div>
      </Router>
    </>
  );
}

export default App;