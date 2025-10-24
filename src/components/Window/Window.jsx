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
    isMinimized = false,
    zIndex = 1
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
        if (e.button !== 0) return; // Only left mouse button
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

    // Handle window movement
    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e) => {
            if (!isDragging) return;

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const winEl = windowRef.current;
            const currentWidth = winEl ? winEl.offsetWidth : width;
            const currentHeight = winEl ? winEl.offsetHeight : height;

            let nextX = e.clientX - dragOffset.x;
            let nextY = e.clientY - dragOffset.y;

            // Clamp horizontally and vertically so the window stays on-screen
            const clampedX = Math.max(0, Math.min(nextX, Math.max(0, viewportWidth - currentWidth)));
            const clampedY = Math.max(0, Math.min(nextY, Math.max(0, viewportHeight - currentHeight)));

            setPosition({ x: clampedX, y: clampedY });
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
    }, [isDragging, dragOffset, width, height]);

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
        zIndex: zIndex,
        ...(isMinimized ? { display: 'none' } : {})
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