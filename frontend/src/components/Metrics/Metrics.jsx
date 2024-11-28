import React, { useCallback, useEffect, useState } from 'react';
import './Metrics.scss';

const Metrics = ({ wpm, accuracy, progress, onPause, onSave }) => {
  const [isPaused, setIsPaused] = useState(false);

  const handlePause = useCallback(() => {
    setIsPaused(prev => !prev);
    if (onPause) {
      onPause(!isPaused);
    }
  }, [isPaused, onPause]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        handlePause();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handlePause]);

  return (
    <div className={`metrics ${isPaused ? 'paused' : ''}`}>
      <div className="metric">
        <span className="label">wpm</span>
        <span className="value">{wpm}</span>
      </div>
      <div className="separator" />
      <div className="metric">
        <span className="label">acc</span>
        <span className="value">{accuracy}%</span>
      </div>
      <div className="separator" />
      <div className="metric">
        <span className="label">progress</span>
        <span className="value">{Math.round(progress)}%</span>
      </div>
      <button 
        className="pause-button" 
        onClick={handlePause}
        title="Press ESC to pause"
      >
        {isPaused ? '▶' : '⏸'}
      </button>
      <button
        className="save-button"
        onClick={onSave}
        title="Save progress"
      >
          <i className="fas fa-save"></i>
      </button>
    </div>
  );
};

export default Metrics;