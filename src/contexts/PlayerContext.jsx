import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { CONSTANTS } from './constants';
export * from './constants';


const {
    PLAYING,
    PLAYER_SHOWN,
    PLAY_EPISODE,
    SET_EPISODES,
    SET_NET_ERROR,
} = CONSTANTS;

const initialState = {
    isPlaying: true,
    playerShown: false,
    currentEpisode: null,
    episodes: [],
    networkError: null,
};

export const PlayerStore = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
    case PLAYING: return { ...state, isPlaying: !state.isPlaying };
    case PLAYER_SHOWN: return { ...state, playerShown: !state.playerShown };
    case PLAY_EPISODE: return { ...state, currentEpisode: action.payload };
    case SET_EPISODES: return { ...state, ...action.payload };
    case SET_NET_ERROR: return { ...state, networkError: action.payload };
    default:
        return state;
    }
};

export const PlayerProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return (
        <PlayerStore.Provider value={value}>
            {children}
        </PlayerStore.Provider>
    );
};

PlayerProvider.propTypes = {
    children: PropTypes.element.isRequired,
};
