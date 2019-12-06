import React, { useState, useEffect, useRef, useContext } from 'react';
import classNames from 'classnames';
import './style.css';
import Markers from '../Markers';

import { PlayerStore } from '../../contexts/PlayerContext';


const getTime = (time) => {
    if (isNaN(time)) return;
    const seconds = Math.floor(time / 60);
    const minutes = Math.floor(time % 60)
    return `${seconds}:${('0' + minutes).slice(-2)}`;
}

const createSrc = (src) => 'http://localhost:1337' + src;

const Player = () => {
    const { state } = useContext(PlayerStore);
    const { currentEpisode, networkError } = state;
    const {
        audio,
        markers,
    } = currentEpisode || {};

    const player = useRef();
    const setSrc = (src) => player.current.src = src;

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState('--');

    const play = () => {
        player.current.play()
    };
    const pause = () => {
        player.current.pause()
    };
    const scrub = (e) => {
        player.current.currentTime = e.target.value;
    }
    const seekForward = () => {
        if (currentTime + 5 < duration) {
            return player.current.currentTime += 5;
        }

        player.current.currentTime = duration;
    }
    const seekBackward = () => {
        if (currentTime - 5 >= 0) {
            return player.current.currentTime -= 5;
        }

        player.current.currentTime = 0;
    }

    useEffect(() => {
        const src = createSrc(audio);
        setSrc(src);
    }, [audio])

    const classes = classNames('player-wrapper', {
        'no-episode': !currentEpisode,
    });

    return (
        <div className={classes}>
            {currentEpisode && <Markers markers={markers} currentTime={currentTime} duration={duration} />}
            <div className="player-navigation">
                {!currentEpisode && !networkError && <p>Choose episode</p>}
                {networkError && <p><b>Error fetching episodes</b></p>}
                {currentEpisode &&
                <>
                    <div className="controls">
                        <button className="control" onClick={play}>Play</button>
                        <button className="control" onClick={pause}>Pause</button>
                    </div>
                    <div className="time-controls">
                        <div className="current-time">
                            <span>{getTime(currentTime)}</span><span>{getTime(duration)}</span>
                        </div>
                        <input
                            className="episode-swiper"
                            type="range"
                            min={0}
                            max={player.current.duration || 0}
                            value={currentTime}
                            onClick={e => e.stopPropagation()}
                            onChange={scrub}
                        />
                    </div>
                    <div className="controls">
                        <button className="control" onClick={seekBackward}>-5s</button>
                        <button className="control" onClick={seekForward}>+5s</button>
                    </div>
                </>
                }
            </div>
            <audio
                ref={player}
                onLoadedData={play}
                onTimeUpdate={() => setCurrentTime(player.current.currentTime)}
                onCanPlay={() => setDuration(player.current.duration)}
            />
        </div>
    );
};

export default Player;