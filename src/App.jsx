import React, { useContext } from "react";
import "./App.css";

import Episodes from "./components/Episodes";
import Player from "./components/Player";

import { PlayerStore } from "./contexts/PlayerContext";

const App = () => {
    const { state } = useContext(PlayerStore);
    const { currentEpisode } = state;
    const { name } = currentEpisode || {};

    return (
        <div className='App'>
            <header className='Header'>
                <h1>{name || 'Acast player'}</h1>
            </header>
            <Episodes />
            <Player />
        </div>
    );
};

export default App;
