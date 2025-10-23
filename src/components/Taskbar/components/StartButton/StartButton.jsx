import React from "react";
import "./StartButton.scss";

// Use a sprite-like background image that already contains logo + text
const StartButton = ({ onClick, isActive }) => {
    return (
        <button
            className={`start-button sprite ${isActive ? "active" : ""}`}
            onClick={onClick}
            aria-label="Start"
        />
    );
};

export default StartButton;