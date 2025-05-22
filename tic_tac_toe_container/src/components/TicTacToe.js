import React, { useState } from 'react';
import Board from './Board';
import './TicTacToe.css';

// Helper function to calculate winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i]
      };
    }
  }
  return null;
};

// PUBLIC_INTERFACE
/**
 * TicTacToe component - Main container for the Tic-Tac-Toe game
 * Manages game state, player turns, and determines winners
 * @returns {JSX.Element} - Complete Tic-Tac-Toe game interface
 */
function TicTacToe() {
  // Game state
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  
  // Current board state
  const current = history[stepNumber];
  
  // Check for winner
  const winInfo = calculateWinner(current);
  const winner = winInfo ? winInfo.winner : null;
  
  // Determine game status message
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (stepNumber === 9) {
    status = 'Draw: Game ended in a tie';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  // Handle square click
  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[historyPoint.length - 1];
    const squares = [...current];

    // Return if the game is won or square is already filled
    if (winner || squares[i]) return;

    // Mark the square with the current player's mark
    squares[i] = xIsNext ? 'X' : 'O';
    
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXIsNext(!xIsNext);
  };

  // Reset the game
  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  };

  return (
    <div className="tictactoe-container">
      <h2>Tic Tac Toe Classic</h2>
      
      <div className="game-info">
        <div className={`status ${winner ? 'winner' : ''}`}>{status}</div>
        <button className="btn reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
      
      <div className="game-board">
        <Board squares={current} onClick={handleClick} />
      </div>
    </div>
  );
}

export default TicTacToe;
