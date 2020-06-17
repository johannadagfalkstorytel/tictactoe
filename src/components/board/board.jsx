import React from 'react';

import Square from '../Square/square';
import Piece from '../piece/piece';

function calculateWinner(squares) {
    console.log(squares)
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

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.restartState();
    }

    restartState () {
        return {
            squares: Array(9).fill(null),
            xIsNext: true,
            displayBoard: false,
            xChoosenPiece: 'X',
            oChoosenPiece: 'O'
        };
    }
    newGame() {
        this.setState(this.restartState())
    
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? this.state.xChoosenPiece : this.state.oChoosenPiece ;
        this.setState({
            squares: squares,
            xIsNext: false,

        });

        const winner = calculateWinner(squares);

        
      
        if (winner) {
            this.setState ({ status : 'Winnner: ' + winner })
        } else {
            this.setState ({ status : 'Next player: O' })
        }

        if (this.state.xIsNext) {
            setTimeout(() => {   
                if (!winner) {
                    this.computerMove();
                } 
              }, 500);  
        }
 
    }

    handleEmojiClick(emoji) {
        return (
        this.setState({
            xChoosenPiece : emoji,
           
            displayBoard : true,
        })

       
    )
    
    }
    computerMove() {
        let hasComputerPlayed = false;
        const nextSquares = this.state.squares.map((square) => {
            if (square === null && hasComputerPlayed === false) {
                hasComputerPlayed = true;
                return "O";
            }
            return square;
        });

        
        return this.setState({
            squares: nextSquares,
            xIsNext: true,
            status : 'Next player: ' + (this.state.xChoosenPiece)
        })

    }

    renderSquare(i) {
        return (
            <Square 
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    renderBoard() {
        return (
            <div >
                 <div className="newGame"> 
                    <button className="newGameButton"  onClick={() => this.newGame()}>
                       New Game
                    </button>
                </div>
                <div className="status">{this.state.status} </div>
                <div className= "board">
                <div className="board-row">
                    {this.renderSquare(0)} 
                    {this.renderSquare(1)} 
                    {this.renderSquare(2)} 
                </div>
                <div className="board-row">
                    {this.renderSquare(3)} 
                    {this.renderSquare(4)} 
                    {this.renderSquare(5)} 
                </div>
                <div className="board-row">
                    {this.renderSquare(6)} 
                    {this.renderSquare(7)} 
                    {this.renderSquare(8)} 
                </div>
                </div>
                <div>
            
                </div>
            </div>
        )
    }

    
    renderPiece(emoji) {
        return (
            <Piece 
                label= {emoji}
                onClick={() => this.handleEmojiClick(emoji)}
                
            />
        
        );
    }
    changeColor() {

    }

    render() {
        return (

            <div>
                <div>
                    <div> Player 1: Choose your Game Piece </div>
                    <div className="availablePieces">
                        {this.renderPiece('🎃')} 
                        {this.renderPiece('😃')} 
                        {this.renderPiece('😇')} 
                        {this.renderPiece('😍')} 
                        {this.renderPiece('👿')} 
                    </div>
                </div>
                <div> 
    
                </div>
                {this.state.displayBoard && this.renderBoard()}
                
                
            </div>
        );
    }
}

export default Board;