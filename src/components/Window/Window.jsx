import React, { useState, useRef, useEffect } from 'react';
import './Window.scss';

const Window = ({
    children,
    title = 'Untitled',
    isActive = false,
    onClose,
    onFocus,
    onMinimize,
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
    };

    // Handle window dragging
    const handleMouseDown = (e) => {
        if (e.button !== 0) return; // Only left mouse button counts
        if (e.target !== titleBarRef.current && !titleBarRef.current.contains(e.target)) return;

        const rect = windowRef.current.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setIsDragging(true);
        if (onFocus) onFocus();
        e.stopPropagation();
    };

    // Handle window movement while dragging
    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e) => {
            if (!isDragging) return;

            setPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]);

    // Handle double click on title bar to maximize/restore
    const handleTitleBarDoubleClick = () => {
        setIsMaximized(!isMaximized);
    };

    const windowStyle = {
        position: 'absolute',
        left: isMaximized ? 0 : `${position.x}px`,
        top: isMaximized ? 0 : `${position.y}px`,
        width: isMaximized ? '100%' : `${width}px`,
        height: isMaximized ? 'calc(100% - 30px)' : `${height}px`,
        zIndex: isActive ? 100 : 1,
        display: isMinimized ? 'none' : 'block'
    };

    return (
        <div
            className={`window ${isActive ? 'active' : ''}`}
            style={windowStyle}
            ref={windowRef}
            onClick={handleFocus}
        >
            <div
                className="title-bar"
                onMouseDown={handleMouseDown}
                onDoubleClick={handleTitleBarDoubleClick}
                ref={titleBarRef}
            >
                <div className="title-bar-text">{title}</div>
                <div className="title-bar-controls">
                    <button
                        aria-label="Minimize"
                        className="title-bar-button minimize-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onMinimize) onMinimize();
                        }}
                    />
                    <button
                        aria-label={isMaximized ? 'Restore' : 'Maximize'}
                        className={`title-bar-button ${isMaximized ? 'restore-button' : 'maximize-button'}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            const newMaximized = !isMaximized;
                            setIsMaximized(newMaximized);

                            // If maximizing, store the previous position and size
                            if (newMaximized) {
                                setPosition({
                                    x: windowRef.current.offsetLeft,
                                    y: windowRef.current.offsetTop,
                                    width: windowRef.current.offsetWidth,
                                    height: windowRef.current.offsetHeight
                                });
                            }
                        }}
                    />
                    <button
                        aria-label="Close"
                        className="title-bar-button close-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onClose) onClose();
                        }}
                    />
                </div>
            </div>
            <div className="window-content">
                {children}
            </div>
        </div>
    );
};

export default Window;