import React from 'react';

import './App.css';

import Game from './components/game/game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <p>
         Tic Tac Toe
        </p>
        <Game />
      </header>
    </div>
  );
}

export default App;
