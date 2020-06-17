import React, {useState} from 'react';

import Board from '../board/board'
import ChooseGamePiece from '../Choose Game Piece/Choosegamepiece';

function Game(props) {


    const [choosenPiece, setChoosenPiece] = useState('X');

        return (
            <div className="game">
                <div className = "game-board">
                   {/*  <ChooseGamePiece choosenPiece={this.state.choosenPiece} /> */}
                    <Board />
                </div>
                <div className = "game-info">
                
                </div>
            </div>
        );
    
}

export default Game;