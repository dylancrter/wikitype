import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Metrics from '../../components/Metrics/Metrics';
import WordDisplay from '../../components/WordDisplay/WordDisplay';
import { createWikiProject, fetchWikiProject } from '../../services/wikiService';
import './TypingScreen.scss';

const CHUNK_SIZE = 50; // Words per chunk

const TypingScreen = () => {
  const { projectId } = useParams();
  const [allWords, setAllWords] = useState([]);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [typedHistory, setTypedHistory] = useState([]);
  const [progress, setProgress] = useState(0);

  const inputRef = useRef(null);

  const [wikiUrl, setWikiUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const project = await createWikiProject(wikiUrl);
      const content = project.content.split(/\s+/);
      setAllWords(content);
      setWords(content.slice(0, CHUNK_SIZE));
      setHasContent(true);
    } catch (error) {
      console.error('Failed to fetch wiki content:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const loadWikiContent = async () => {
      try {
        const project = await fetchWikiProject(projectId);
        const words = project.content.split(/\s+/);
        setAllWords(words);
        setWords(words.slice(0, CHUNK_SIZE));
      } catch (error) {
        console.error('Failed to load wiki content:', error);
      }
    };

    loadWikiContent();
  }, [projectId]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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

  const handleInput = (event) => {
    const value = event.target.value;
    if (!startTime) setStartTime(Date.now());

    if (value.endsWith(' ')) {
      const typedWord = value.trim();
      const currentWord = words[currentWordIndex];
      
      setTypedHistory([...typedHistory, typedWord]);
      
      let correct = 0;
      for (let i = 0; i < currentWord.length; i++) {
        if (i < typedWord.length && currentWord[i] === typedWord[i]) {
          correct++;
        }
      }
      
      setCorrectChars(prev => prev + correct);
      setTotalChars(prev => prev + currentWord.length);
      
      if (currentWordIndex === words.length - 1) {
        // Load next chunk
        const nextChunk = currentChunk + 1;
        const start = nextChunk * CHUNK_SIZE;
        const end = start + CHUNK_SIZE;
        
        if (start < allWords.length) {
          setCurrentChunk(nextChunk);
          setWords(allWords.slice(start, end));
          setCurrentWordIndex(0);
          setTypedHistory([]);
        }
      } else {
        setCurrentWordIndex(prev => prev + 1);
      }
      
      setInput('');
      setCurrentCharIndex(0);
      
      // Update progress
      const totalProgress = ((currentChunk * CHUNK_SIZE + currentWordIndex) / allWords.length) * 100;
      setProgress(Math.min(100, Math.round(totalProgress)));
    } else {
      setInput(value);
      setCurrentCharIndex(value.length);
    }
  };

  return (
    <div className="typing-test-container">
      {!hasContent ? (
        <div className="wiki-search">
          <h1>Enter Wikipedia URL</h1>
          <form onSubmit={handleUrlSubmit}>
            <input
              type="text"
              value={wikiUrl}
              onChange={(e) => setWikiUrl(e.target.value)}
              placeholder="https://en.wikipedia.org/wiki/..."
              className="wiki-input"
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Start Typing'}
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <WordDisplay
            words={words}
            currentWordIndex={currentWordIndex}
            currentCharIndex={currentCharIndex}
            input={input}
            typedHistory={typedHistory}
          />
          <input
            type="text"
            ref={inputRef}
            value={input}
            onChange={handleInput}
            className="hidden-input"
          />
          <Metrics wpm={wpm} accuracy={accuracy} progress={progress} />
        </>
      )}
    </div>
  );
};

export default TypingScreen;