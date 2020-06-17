import React from 'react';

import Piece from '../piece/piece';

class ChooseGamePiece extends React.Component {
    /* constructor(props) {
        super(props);
        this.state = {
            choosenPiece: 'X'
        }; 
    } */

 
    handleEmojiClick(emoji) {
       
        this.setState({
            choosenPiece : emoji
        }, () => {
            console.log('Callback value', this.state.choosenPiece
            )
        });
    }

    renderPiece(emoji) {
        return (
            <Piece 
                label= {emoji}
                onClick={() => this.handleEmojiClick(emoji)}
                
            />
        
        );
    }

    render() {

        console.log(this.props.choosenPiece)
        return (
            <div>
                {/* <div> Choose your Game Piece </div>
                <div className="availablePieces">
                    {this.renderPiece('🎃')} 
                    {this.renderPiece('😃')} 
                    {this.renderPiece('😇')} 
                    {this.renderPiece('😍')} 
                    {this.renderPiece('👿')} 
               
                </div> */}
            </div>
        );
    }
}

export default ChooseGamePiece;


