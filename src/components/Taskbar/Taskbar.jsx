import React, { useState, useRef, useEffect } from "react";
import "./Taskbar.scss";
import StartButton from "./components/StartButton/StartButton";
import StartMenu from "./components/StartMenu/StartMenu";
import SystemTray from "./components/SystemTray/SystemTray";
import wmvIcon from '../../assets/icons/windows_media_viewer.ico';
import ieIcon from '../../assets/icons/internet_explorer.ico';
import windowsExplorerIcon from '../../assets/icons/windows_explorer.ico';
import InternetExplorer from '../apps/InternetExplorer/InternetExplorer';
import WindowsExplorer from '../apps/WindowsExplorer/WindowsExplorer';

const Taskbar = ({ openWindows = {}, onOpenWindow, onWindowFocus, onMinimizeWindow, onCloseWindow, activeWindowId }) => {
    const [startMenuOpen, setStartMenuOpen] = useState(false);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, windowId: null, anchor: null });
    const menuRef = useRef(null);
    
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

    const handleTaskbarContextMenu = (e, windowId) => {
        e.preventDefault();
        const r = e.currentTarget.getBoundingClientRect();
        setContextMenu({
            visible: true,
            x: 0,
            y: 0,
            windowId,
            anchor: { left: r.left, top: r.top, width: r.width, height: r.height }
        });
    };

    const closeContextMenu = () => {
        setContextMenu({ visible: false, x: 0, y: 0, windowId: null, anchor: null });
    };

    const handleContextMinimizeOrRestore = () => {
        const id = contextMenu.windowId;
        if (!id) return;
        const win = openWindows[id];
        if (!win) return;
        onMinimizeWindow(id, !win.isMinimized);
        closeContextMenu();
    };

    const handleContextClose = () => {
        const id = contextMenu.windowId;
        if (!id) return;
        if (onCloseWindow) onCloseWindow(id);
        closeContextMenu();
    };

    // Position the context menu above the clicked taskbar button, clamped horizontally
    useEffect(() => {
        if (!contextMenu.visible || !menuRef.current || !contextMenu.anchor) return;
        const menuRect = menuRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const margin = 4;

        // Center horizontally over the button; clamp within viewport
        let desiredLeft = contextMenu.anchor.left + (contextMenu.anchor.width - menuRect.width) / 2;
        desiredLeft = Math.max(margin, Math.min(desiredLeft, viewportWidth - menuRect.width - margin));

        // Always render above the taskbar button
        let desiredTop = contextMenu.anchor.top - menuRect.height - 6;
        desiredTop = Math.max(margin, desiredTop);

        if (desiredLeft !== contextMenu.x || desiredTop !== contextMenu.y) {
            setContextMenu(prev => ({ ...prev, x: desiredLeft, y: desiredTop }));
        }
    }, [contextMenu.visible, contextMenu.anchor]);

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
                            onContextMenu={(e) => handleTaskbarContextMenu(e, id)}
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
            {contextMenu.visible && (
                <>
                    <div className="taskbar-contextmenu-overlay" onMouseDown={closeContextMenu} />
                    <div
                        className="taskbar-contextmenu"
                        style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
                        ref={menuRef}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <button className="context-item" onClick={handleContextMinimizeOrRestore}>
                            {openWindows[contextMenu.windowId]?.isMinimized ? 'Restore' : 'Minimize'}
                        </button>
                        <div className="context-separator" />
                        <button className="context-item" onClick={handleContextClose}>Close</button>
                    </div>
                </>
            )}
        </>
    );
};

export default Taskbar;