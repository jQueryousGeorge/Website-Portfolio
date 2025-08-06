import React from "react";
import "./Taskbar.scss";
import StartButton from "./components/StartButton/StartButton";
import SystemTray from "./components/SystemTray/SystemTray";

const Taskbar = ({ openWindows = {}, onWindowFocus, onMinimizeWindow, activeWindowId }) => {
    const handleTaskbarButtonClick = (windowId) => {
        const window = openWindows[windowId];
        if (window.isMinimized) {
            // Restore window if minimized
            onMinimizeWindow(windowId, false);
        } else if (activeWindowId === windowId) {
            // Minimize window if it's the active one
            onMinimizeWindow(windowId, true);
        } else {
            // Focus the window
            onWindowFocus(windowId);
        }
    };

    return (
        <div className="taskbar-bottom">
            <div className="taskbar-startbutton">
                <StartButton />
            </div>

            <div className="taskbar-windows">
                {Object.entries(openWindows).map(([id, window]) => (
                    <button
                        key={id}
                        className={`taskbar-window-button ${activeWindowId === id ? 'active' : ''} ${window.isMinimized ? 'minimized' : ''}`}
                        onClick={() => handleTaskbarButtonClick(id)}
                        title={window.title}
                    >
                        <span className="window-icon">📄</span>
                        <span className="window-title">{window.title}</span>
                    </button>
                ))}
            </div>

            <div className="taskbar-systemtray">
                <SystemTray />
                <div className="taskbar-clock">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </div>
    );
};

export default Taskbar;