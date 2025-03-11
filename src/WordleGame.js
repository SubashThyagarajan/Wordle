import React, { useState, useEffect } from 'react';
import './WordleGame.css';

const WordleGame = () => {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState(Array(6).fill(''));
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);

  // List of 4-letter words
  const wordList = [
    'love', 'hope', 'well', 'like', 'time', 'good', 'play', 'keep',
    'area', 'able', 'atom', 'both', 'best', 'back', 'busy', 'cool',
    'come', 'cave', 'city', 'dear', 'down', 'dusk', 'doom', 'easy',
    'ever', 'edit', 'echo', 'fast', 'fine', 'fear', 'fact', 'gold',
    'give', 'gaze', 'hail', 'harm', 'idea', 'into', 'iron', 'icon',
    'just', 'join', 'jury', 'jail', 'kind', 'knot', 'king', 'luck',
    'loud', 'more', 'much', 'many', 'mind', 'name', 'near', 'need',
    'note', 'open', 'only', 'once', 'over', 'part', 'plan', 'poor',
    'quiz', 'quit', 'quiet', 'quad', 'bird', 'jump', 'baby', 'book',
    'duck', 'frog', 'ball', 'duck', 'bank', 'bear', 'beat', 'blow',
    'burn', 'call', 'care', 'cast', 'come', 'cook', 'cope', 'cost',
    'dare', 'deal', 'deny', 'draw', 'drop', 'earn', 'face', 'fail',
    'fall', 'fear', 'feel', 'fill', 'find', 'form', 'gain', 'give',
    'grow', 'hang', 'hate', 'have', 'head', 'hear', 'help', 'hide',
    'hold', 'hope', 'hurt', 'join', 'jump', 'keep', 'kill', 'know',
    'land', 'last', 'lead', 'lend', 'lift', 'like', 'link', 'live',
    'look', 'lose', 'love', 'make', 'mark', 'meet', 'mind', 'miss',
    'move', 'must', 'name', 'need', 'note', 'open', 'pass', 'pick',
    'plan', 'play', 'pray', 'pull', 'push', 'read', 'rely', 'rest',
    'ride', 'ring', 'rise', 'risk', 'roll', 'rule', 'save', 'seek',
    'seem', 'sell', 'send', 'shed', 'show', 'shut', 'sign', 'sing',
    'slip', 'sort', 'stay', 'step', 'stop', 'suit', 'take', 'talk',
    'tell', 'tend', 'test', 'turn', 'vary', 'view', 'vote', 'wait',
    'wake', 'walk', 'want', 'warn', 'wash', 'zest', 'quip', 'yolk',
    'ploy', 'myth', 'joey', 'zany', 'yurt', 'ease', 'else', 'even',
    'ever', 'earn', 'exit', 'east', 'edgy', 'ends', 'emit'
  ];

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