import React, { useState, useRef, useEffect } from "react";
import "./Window.scss";

const Window = ({ title, isOpen }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="window">
            <div className="title-bar">
                <div className="title-bar-text">Title</div>
                <div className="title-bar-controls">
                    <button
                        aria-label="Minimize"
                        className="title-bar-button minimize-button"
                    ></button>
                    <button
                        aria-label="Maximize"
                        className="title-bar-button maximize-button"
                    ></button>
                    <button
                        aria-label="Close"
                        className="title-bar-button close-button"
                    ></button>
                </div>
            </div>
            <div className="window-body">Children here...</div>
        </div>
    );
};

export default Window;