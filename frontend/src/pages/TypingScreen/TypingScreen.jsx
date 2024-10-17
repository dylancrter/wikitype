import React, { useEffect, useRef, useState } from 'react';
import Metrics from '../../components/Metrics/Metrics';
import WordDisplay from '../../components/WordDisplay/WordDisplay';
import './TypingScreen.scss';

const TypingScreen = () => {
  // Configuration
  const TOTAL_WORDS = 50;

  // State Variables
  const [words, setWords] = useState(generateWords(TOTAL_WORDS));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);

  const inputRef = useRef(null);

  // Focus the input on component mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Generate Words Function
  function generateWords(num) {
    const sampleWords = 'example words for typing test to generate random words'.split(' ');
    let generatedWords = [];
    for (let i = 0; i < num; i++) {
      generatedWords.push(sampleWords[Math.floor(Math.random() * sampleWords.length)]);
    }
    return generatedWords;
  }

  // Calculate WPM and Accuracy
  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        const elapsedMinutes = (Date.now() - startTime) / 1000 / 60;
        const calculatedWpm = Math.round((correctChars / 5) / elapsedMinutes) || 0;
        setWpm(calculatedWpm);

        const calculatedAccuracy = Math.round((correctChars / totalChars) * 100) || 0;
        setAccuracy(calculatedAccuracy);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, correctChars, totalChars]);

  // Handle User Input
  const handleInput = (event) => {
    const value = event.target.value;
    if (!startTime) setStartTime(Date.now());

    if (value.endsWith(' ')) {
      checkWord(value.trim());
      setInput('');
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentCharIndex(0);
    } else {
      setInput(value);
      setCurrentCharIndex(value.length);
    }
  };

  // Check Typed Word
  const checkWord = (typedWord) => {
    const currentWord = words[currentWordIndex];
    const isCorrect = typedWord === currentWord;
    setCorrectChars(correctChars + (isCorrect ? currentWord.length : 0));
    setTotalChars(totalChars + currentWord.length);
  };

  return (
    <div className="typing-test-container" onClick={() => inputRef.current.focus()}>
      <h1>Typing Test</h1>
      <WordDisplay
        words={words}
        currentWordIndex={currentWordIndex}
        currentCharIndex={currentCharIndex}
        input={input}
      />
      <input
        type="text"
        ref={inputRef}
        value={input}
        onChange={handleInput}
        className="hidden-input"
      />
      <Metrics wpm={wpm} accuracy={accuracy} />
    </div>
  );
};

export default TypingScreen;
