import React, { useState, useRef, useEffect } from "react";
import "./Window.scss";

const Window = ({ 
    children,
    title = 'Untitled',
    isActive = false,
    onClose,
    onFocus,
    noMinimize,
    defaultPosition = { x: 100, y: 100 },
    width = 400,
    height = 300,
    isMinimized = false
}) => {
    const [position, setPosition] = useState(defaultPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isMaximized, setIsMaximized] = useState(false);
    const windowRef = useRef(null);
    const titleBarRef = useRef(null);

    // Handle window focus when clicked
    const handleFocus = (e) => {
        if (onFocus) onFocus();
        e.stopPropagation();

    }

    // Window dragging logic
    const handleMouseDown = (e) => {
        // Set up the left mouse to be the only btn to be used to drag a window:
        if (e.button !== 0) return;
        if (e.target !== titleBarRef.current && !titleBarRef.current.contains(e.target)) return;

        const rect = windowRef.current.getBoundingClientRect();
        setDragOffset( {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
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