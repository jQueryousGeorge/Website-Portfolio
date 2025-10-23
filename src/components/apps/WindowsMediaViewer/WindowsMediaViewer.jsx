import React from 'react';
import './WindowsMediaViewer.scss';

const WindowsMediaViewer = ({ src, alt = 'media' }) => {
    return (
        <div className="wmv-container">
            <img className="wmv-image" src={src} alt={alt} />
        </div>
    );
};

export default WindowsMediaViewer;