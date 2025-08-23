import React from "react";
import "./StartButton.scss";

// If the logo doesn't exist, we'll use text as fallback
const StartButton = ({ onClick, isActive }) => {
    return (
        <button
            className={`start-button ${isActive ? "active" : ""}`}
            onClick={onClick}
        >
            {/* Use public path for the logo, provide fallback */}
            <img
                src="/assets/images/Windows-logo.ico"
                alt="Windows"
                className="windows-logo"
                onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.marginLeft = "0";
                }}
            />
            <span className="start-text">Start</span>
        </button>
    );
};

export default StartButton;