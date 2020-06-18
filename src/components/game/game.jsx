import React from 'react';

import Board from '../Board/board';

function Game() {
  return (
    <div className='game'>
      <div className='game-board'>
        <Board />
      </div>
      <div className='game-info' />
    </div>
  );
}

export default Game;
