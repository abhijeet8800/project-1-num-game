import React, { useState } from 'react';

const NumberGuessingGame = () => {
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleGuess = () => {
    if (isNaN(guess) || guess === '') {
      setFeedback('Please enter a valid number.');
      return;
    }

    const userGuess = parseInt(guess);
    setAttempts(attempts + 1);

    if (userGuess < 1 || userGuess > 100) {
      setFeedback('Please enter a number between 1 and 100.');
    } else if (userGuess < targetNumber) {
      setFeedback('Too low!');
    } else if (userGuess > targetNumber) {
      setFeedback('Too high!');
    } else {
      setFeedback(`Correct! The number was ${targetNumber}. You guessed it in ${attempts + 1} attempts.`);
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setTargetNumber(generateRandomNumber());
    setGuess('');
    setFeedback('');
    setAttempts(0);
    setGameOver(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Number Guessing Game</h1>
      <p className="text-center mb-4">Guess the number between 1 and 100</p>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="border rounded px-3 py-2 mr-2 w-full"
          placeholder="Enter your guess"
          disabled={gameOver}
        />
        <button
          onClick={handleGuess}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={gameOver}
        >
          Submit
        </button>
      </div>
      {feedback && (
        <p className={`text-center mb-4 ${gameOver ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>
      )}
      {gameOver && (
        <div className="text-center">
          <button
            onClick={handleRestart}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Restart Game
          </button>
        </div>
      )}
      <p className="text-center mt-4">Attempts: {attempts}</p>
    </div>
  );
};

export default NumberGuessingGame;
