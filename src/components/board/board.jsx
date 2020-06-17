import React, { useState } from "react";

import Square from "../Square/square";
import Piece from "../Piece/piece";

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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board(props) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [displayBoard, setDisplayBoard] = useState(false);
  const [xChoosenPiece, setXChoosenPiece] = useState("X");
  const [oChoosenPiece, setOChoosenPiece] = useState("O");
  const [status, setStatus] = useState("");

  const resetState = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setDisplayBoard(false);
    setXChoosenPiece("X");
    setXChoosenPiece("O");
  };

  const newGame = () => {
    resetState();
  };

  const handleClick = (i) => {
    const currentSquares = squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    currentSquares[i] = xIsNext ? xChoosenPiece : oChoosenPiece;
    setSquares(currentSquares);
    setXIsNext(false);

    const winner = calculateWinner(squares);

    if (winner) {
      setStatus("Winnner: " + winner);
    } else {
      setStatus("Next player: O");
    }

    if (xIsNext) {
      setTimeout(() => {
        if (!winner) {
          computerMove(currentSquares);
        }
      }, 500);
    }
  };

  const handleEmojiClick = (emoji) => {
    return setXChoosenPiece(emoji), setDisplayBoard(true);
  };

  const computerMove = (latestSquares) => {
    let hasComputerPlayed = false;

    const nextSquares = latestSquares.map((square) => {
      if (square === null && hasComputerPlayed === false) {
        hasComputerPlayed = true;
        return "O";
      }
      return square;
    });

    return (
      setSquares(nextSquares),
      setXIsNext(true),
      setStatus("Next player: " + xChoosenPiece)
    );
  };

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const renderBoard = () => {
    return (
      <div>
        <div className="newGame">
          <button className="newGameButton" onClick={() => newGame()}>
            New Game
          </button>
        </div>
        <div className="status">{status} </div>
        <div className="board">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
        <div></div>
      </div>
    );
  };

  const renderPiece = (emoji) => {
    return <Piece label={emoji} onClick={() => handleEmojiClick(emoji)} />;
  };

  return (
    <div>
      <div>
        <div> Player 1: Choose your Game Piece </div>
        <div className="availablePieces">
          {renderPiece("🎃")}
          {renderPiece("😃")}
          {renderPiece("😇")}
          {renderPiece("😍")}
          {renderPiece("👿")}
        </div>
      </div>
      <div></div>
      {displayBoard && renderBoard()}
    </div>
  );
}

export default Board;
