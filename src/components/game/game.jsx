import React, {useState} from 'react';

import Board from '../Board/board'

function Game(props) {

    const [choosenPiece, setChoosenPiece] = useState('X');

        return (
            <div className="game">
                <div className = "game-board">
                    <Board />
                </div>
                <div className = "game-info" />
            </div>
        );
    
}

export default Game;