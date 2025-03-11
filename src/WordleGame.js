import React, { useState, useEffect } from 'react';
import './WordleGame.css';

const WordleGame = () => {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState(Array(6).fill(''));
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);

  // List of 4-letter words - you can expand this list
  const wordList = ['cake', 'take', 'make', 'lake', 'fake', 'wake', 'bake', 'sake'];

  useEffect(() => {
    // Pick a random word when game starts
    setSolution(wordList[Math.floor(Math.random() * wordList.length)]);
  }, []);

  const handleKeyup = (e) => {
    if (gameOver) return;

    if (e.key === 'Enter') {
      if (currentGuess.length !== 4) return;
      
      const newGuesses = [...guesses];
      newGuesses[currentRow] = currentGuess;
      setGuesses(newGuesses);
      
      if (currentGuess === solution) {
        setGameOver(true);
        alert('You won!');
        return;
      }

      if (currentRow === 5) {
        setGameOver(true);
        alert(`Game Over! The word was ${solution}`);
        return;
      }

      setCurrentRow(currentRow + 1);
      setCurrentGuess('');
    }

    if (e.key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1));
      return;
    }

    if (currentGuess.length >= 4) return;

    if (e.key.match(/^[a-zA-Z]$/)) {
      setCurrentGuess(currentGuess + e.key.toLowerCase());
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);
    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup]);

  return (
    <div className="game-container">
      <h1>4-Letter Wordle</h1>
      <div className="grid">
        {guesses.map((guess, i) => (
          <div key={i} className="row">
            {Array(4).fill(0).map((_, j) => {
              const letter = i === currentRow ? currentGuess[j] : guess[j];
              let className = 'cell';
              
              if (i < currentRow) {
                if (letter === solution[j]) {
                  className += ' correct';
                } else if (solution.includes(letter)) {
                  className += ' present';
                } else {
                  className += ' absent';
                }
              }

              return (
                <div key={j} className={className}>
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordleGame;