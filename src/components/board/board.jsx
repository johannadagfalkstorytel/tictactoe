import React, { useState, useEffect } from 'react';

import Square from '../Square/square';
import Piece from '../Piece/piece';

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [displayBoard, setDisplayBoard] = useState(false);
  const [xChoosenPiece, setXChoosenPiece] = useState('X');
  const [status, setStatus] = useState('');
  const [winner, setWinner] = useState('');

  const resetState = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setDisplayBoard(false);
    setXChoosenPiece('X');
    setXChoosenPiece('O');
    setWinner('');
  };

  const newGame = () => {
    resetState();
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const computerMove = (latestSquares) => {
      let hasComputerPlayed = false;

      const nextSquares = latestSquares.map((square) => {
        if (square === null && hasComputerPlayed === false) {
          hasComputerPlayed = true;
          return 'O';
        }
        return square;
      });

      return (
        setSquares(nextSquares),
        setXIsNext(true),
        setStatus(`Next player: ${xChoosenPiece}`)
      );
    };

    if (!xIsNext) {
      const timeout = setTimeout(() => {
        if (!winner) {
          computerMove(squares);
        }
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [xIsNext, winner, squares, xChoosenPiece]);

  const handleClick = (i) => {
    const currentSquares = squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    currentSquares[i] = xIsNext ? xChoosenPiece : 'O';
    setSquares(currentSquares);
    setXIsNext(false);

    setWinner(calculateWinner(squares));

    if (winner) {
      setStatus(`Winnner: ${winner}`);
    } else {
      setStatus('Next player: O');
    }
  };

  const handleEmojiClick = (emoji) => (
    // eslint-disable-next-line no-sequences
    setXChoosenPiece(emoji), setDisplayBoard(true)
  );

  const renderSquare = (i) => (
    <Square value={squares[i]} onClick={() => handleClick(i)} />
  );

  const renderBoard = () => (
    <div>
      <div className='newGame'>
        <button
          type='button'
          className='newGameButton'
          onClick={() => newGame()}
        >
          New Game
        </button>
      </div>
      <div className='status'>{status}</div>
      <div className='board'>
        <div className='board-row'>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className='board-row'>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className='board-row'>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div />
    </div>
  );

  const renderPiece = (emoji) => (
    <Piece label={emoji} onClick={() => handleEmojiClick(emoji)} />
  );

  return (
    <div>
      <div>
        <div> Player 1: Choose your Game Piece </div>
        <div className='availablePieces'>
          {renderPiece('🎃')}
          {renderPiece('😃')}
          {renderPiece('😇')}
          {renderPiece('😍')}
          {renderPiece('👿')}
        </div>
      </div>
      <div />
      {displayBoard && renderBoard()}
    </div>
  );
}
export default Board;
