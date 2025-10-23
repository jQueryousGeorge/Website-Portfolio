import React, { useState } from "react";
import "./Taskbar.scss";
import StartButton from "./components/StartButton/StartButton";
import StartMenu from "./components/StartMenu/StartMenu";
import SystemTray from "./components/SystemTray/SystemTray";
import wmvIcon from '../../assets/icons/windows_media_viewer.ico';

const Taskbar = ({ openWindows = {}, onOpenWindow, onWindowFocus, onMinimizeWindow, activeWindowId }) => {
    const [startMenuOpen, setStartMenuOpen] = useState(false);
    
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

    const handleStartButtonClick = () => {
        setStartMenuOpen(!startMenuOpen);
    };

    return (
        <>
            <StartMenu 
                isOpen={startMenuOpen}
                onClose={() => setStartMenuOpen(false)}
                onOpenWindow={(windowData) => {
                    onOpenWindow(windowData);
                    setStartMenuOpen(false);
                }}
            />
            
            <div className="taskbar-bottom">
                <div className="taskbar-startbutton">
                    <StartButton onClick={handleStartButtonClick} isActive={startMenuOpen} />
                </div>

                <div className="taskbar-windows">
                    {Object.entries(openWindows).map(([id, window]) => (
                        <button
                            key={id}
                            className={`taskbar-window-button ${activeWindowId === id ? 'active' : ''} ${window.isMinimized ? 'minimized' : ''}`}
                            onClick={() => handleTaskbarButtonClick(id)}
                            title={window.title}
                        >
                            <span className="window-icon">
                                {window.icon ? <img src={window.icon} alt="icon" /> : window.title?.startsWith('WMV') ? <img src={wmvIcon} alt="WMV" /> : '📄'}
                            </span>
                            <span className="window-title">{window.title}</span>
                        </button>
                    ))}
                </div>

                <div className="taskbar-systemtray">
                    <SystemTray />
                </div>
            </div>
        </>
    );
};

export default Taskbar;