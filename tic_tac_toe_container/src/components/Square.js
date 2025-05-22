import React from 'react';

// PUBLIC_INTERFACE
/**
 * Square component represents a single cell in the Tic-Tac-Toe board
 * @param {Object} props - Component props
 * @param {string|null} props.value - The value to display in the square ('X', 'O', or null)
 * @param {Function} props.onClick - Function to call when the square is clicked
 * @returns {JSX.Element} - A button representing a square on the board
 */
function Square({ value, onClick }) {
  return (
    <button 
      className="square" 
      onClick={onClick}
      aria-label={value ? `Square with ${value}` : "Empty square"}
    >
      {value}
    </button>
  );
}

export default Square;
