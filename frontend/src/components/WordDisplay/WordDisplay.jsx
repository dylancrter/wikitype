import React from 'react';
import './WordDisplay.scss';

const WordDisplay = ({ words, currentWordIndex, currentCharIndex, input }) => {
  return (
    <div className="word-display typing-area">
      {words.map((word, index) => {
        let className = '';
        if (index < currentWordIndex) {
          className = 'completed-word';
        } else if (index === currentWordIndex) {
          className = 'current-word';
        }

        return (
          <span key={index} className={className}>
            {index === currentWordIndex ? (
              <>
                {word.split('').map((char, i) => {
                  let charClass = '';
                  if (i < currentCharIndex) {
                    charClass = char === input[i] ? 'correct' : 'incorrect';
                  }
                  return (
                    <span key={i} className={charClass}>
                      {char}
                    </span>
                  );
                })}
                <span className="cursor">|</span>
              </>
            ) : (
              word
            )}{' '}
          </span>
        );
      })}
    </div>
  );
};

export default WordDisplay;
