import React, { useState } from "react";
import "./Taskbar.scss";
import StartButton from "./components/StartButton/StartButton";
import StartMenu from "./components/StartMenu/StartMenu";
import SystemTray from "./components/SystemTray/SystemTray";
import wmvIcon from '../../assets/icons/windows_media_viewer.ico';
import ieIcon from '../../assets/icons/internet_explorer.ico';
import windowsExplorerIcon from '../../assets/icons/windows_explorer.ico';
import InternetExplorer from '../apps/InternetExplorer/InternetExplorer';
import WindowsExplorer from '../apps/WindowsExplorer/WindowsExplorer';

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

    const openPinnedIE = () => {
        onOpenWindow({
            id: 'internetExplorerWindow',
            title: 'Internet Explorer',
            icon: ieIcon,
            contentType: 'component',
            contentComponent: InternetExplorer,
            defaultPosition: { x: 80, y: 80 },
            width: 800,
            height: 600
        });
    };

    const openPinnedExplorer = () => {
        onOpenWindow({
            id: 'windowsExplorerWindow',
            title: 'Windows Explorer',
            icon: windowsExplorerIcon,
            contentType: 'component',
            contentComponent: WindowsExplorer,
            defaultPosition: { x: 120, y: 120 },
            width: 680,
            height: 480
        });
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

                <div className="taskbar-pins">
                    <button className="taskbar-pin-button" title="Internet Explorer" onClick={openPinnedIE}>
                        <img src={ieIcon} alt="IE" />
                    </button>
                    <button className="taskbar-pin-button" title="Windows Explorer" onClick={openPinnedExplorer}>
                        <img src={windowsExplorerIcon} alt="Explorer" />
                    </button>
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