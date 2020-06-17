import React from 'react';

import Board from '../board/board'
import ChooseGamePiece from '../Choose Game Piece/Choosegamepiece';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choosenPiece: 'X'
        }; 
    }

    render() {
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
}

export default Game;