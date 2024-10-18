import React from 'react';
import './Metrics.scss';

const Metrics = ({ wpm, accuracy }) => {
  return (
    <div className="metrics">
      <div className="metric">
        <h3>WPM</h3>
        <p>{wpm}</p>
      </div>
      <div className="metric">
        <h3>Accuracy</h3>
        <p>{accuracy}%</p>
      </div>
    </div>
  );
};

export default Metrics;
