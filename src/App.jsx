import React from 'react';
import './App.css';

import Episodes from './components/Episodes';
import Player from './components/Player';

const App = () => (
    <div className="App">
      <header className="Header">
        <h1>Acast player</h1>
      </header>
      <Episodes />
      <Player />
    </div>
);

export default App;
