import React, { useContext, useEffect } from 'react';
import { getEpisodes } from '../../api';
import './style.css';

import { PlayerStore, CONSTANTS } from '../../contexts/PlayerContext';

const Episode = ({ episode, play }) => {
    const { name } = episode;
    return (
        <div className="episode">
            {name}
            <button className="play" onClick={() => play(episode)}>Play</button>
        </div>
    )
}

const Episodes = () => {
    const { state, dispatch } = useContext(PlayerStore);
    const { episodes, networkError } = state;

    useEffect(() => {
        const fetchEps = async () => {
            try {
                const res = await getEpisodes();
                const { data = []} = res || {};
                dispatch({ type: CONSTANTS.SET_EPISODES, payload: { episodes: data, networkError: false }})
            } catch (error) {
                dispatch({ type: CONSTANTS.SET_NET_ERROR, payload: true })
            }
        }
        fetchEps();
    }, [dispatch]);

    const playEpisode = (episode) => dispatch({ type: CONSTANTS.PLAY_EPISODE, payload: episode })
    
    return (
        <div className="episodes-wrapper">
            {episodes && episodes.map((ith, i) => <Episode key={i} episode={ith} play={playEpisode} />)}
            {networkError && <p>{networkError}</p>}
        </div>
    );
};

export default Episodes;