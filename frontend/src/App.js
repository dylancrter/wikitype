import React, { Suspense } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.scss';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/theme.scss';

// Components
import TopBar from './components/TopBar/TopBar';

// Pages
import Info from './pages/Info/Info';
import Settings from './pages/Settings/Settings';
import TypingScreen from './pages/TypingScreen/TypingScreen';

// Loading fallback
const LoadingFallback = () => <div className="loading">Loading...</div>;

function App() {
  return (
    <>
      <ThemeProvider>
        <Router>
          <div className="App">
            <TopBar />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Navigate to="/typing" replace />} />
                <Route path="/typing" element={<TypingScreen />} />
                <Route path="/info" element={<Info />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/typing" replace />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;