import React, { useEffect, useState } from 'react';
import WordDisplay from '../../components/WordDisplay/WordDisplay';
import './Home.scss';

function Home() {
  const [currentText, setCurrentText] = useState('');
  const [words, setWords] = useState(['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog']);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const handleWordSetChange = (newWords) => {
    setWords(newWords);
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setCurrentText('');
  };

  useEffect(() => {
    if (!started) {
      document.addEventListener('keydown', handleStart);
      return () => document.removeEventListener('keydown', handleStart);
    }
  }, [started]);

  const handleStart = () => {
    setStarted(true);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCurrentText(value);

    // Update character index
    setCurrentCharIndex(value.length);

    // Check for word completion
    if (value.endsWith(' ')) {
      if (value.trim() === words[currentWordIndex]) {
        setCurrentWordIndex(prev => prev + 1);
        setCurrentCharIndex(0);
        setCurrentText('');
      }
    }
  };

  return (
    <div className="monkeytype-container">
      <div className="header">
        <div className="logo">monkeytype</div>
      </div>
      <div className="typing-area">
        <WordDisplay
          words={words}
          currentWordIndex={currentWordIndex}
          currentCharIndex={currentCharIndex}
          input={currentText}
          onWordSetChange={handleWordSetChange}
        />
        <input
          className="typing-input"
          value={currentText}
          onChange={handleInputChange}
          autoFocus
          placeholder={started ? '' : 'Type to start...'}
        />
      </div>
    </div>
  );
}

export default Home;