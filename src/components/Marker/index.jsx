import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.css';

const Marker = ({ type, content, link }) => {
    const isImage = type === 'image';
    const isUrl = type === 'ad' && link;

    const cNames = classNames('marker-wrapper', { image: isImage });

    return (
        <div className={cNames}>
            {!isImage && !isUrl && <p>{content}</p>}
            {isUrl && <b><a className="ad-link" href={link} target="_blank" rel="nofollow noopener">{content}</a></b>}
            {isImage && <img className="ad-image" src={`http://localhost:1337${content}`} alt="Acast super ad" />}
        </div>
    );
};

Marker.propTypes = {
    type: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    link: PropTypes.string,
};

Marker.defaultProps = {
    link: null,
};

export default Marker;