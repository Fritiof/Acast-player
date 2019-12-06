import React from 'react';
import PropTypes from 'prop-types';
import Marker from '../Marker';

const Markers = ({ markers, currentTime, duration }) => {
    const flooredCurrent = Math.floor(currentTime);
    const [markerToShow] =  markers.filter(ith => flooredCurrent >= ith.start && flooredCurrent < ith.start + ith.duration);

    return markerToShow && currentTime !== duration ? (
        <Marker {...markerToShow} />
    ) : null;
};

Markers.propTypes = {
    markers: PropTypes.array.isRequired,
};

export default Markers;