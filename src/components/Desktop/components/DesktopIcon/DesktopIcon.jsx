import React from 'react';
import './DesktopIcon.scss';

// Placeholder for a generic icon image if no specific one is provided
// For now, let's use a simple character or a div.
// I might use a library like react-icons later.
const DefaultIcon = () => <span className="icon-placeholder">📄</span>; // Simple document emoji

const DesktopIcon = ({ label, onDoubleClick }) => {
    const handleDoubleClick = () => {
        console.log(`Icon "${label}" double-clicked`);
        if (onDoubleClick) {
            onDoubleClick(label);
        }
    };

    return (
        <div className="desktop-icon" onDoubleClick={handleDoubleClick}>
            <div className="icon-image">
                {/* In future, this could be <img src={icon} alt={label} /> */}
                <DefaultIcon />
            </div>
            <span className="icon-label">{label}</span>
        </div>
    );
};

export default DesktopIcon;