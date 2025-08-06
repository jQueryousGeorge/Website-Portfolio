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
            {/* Main taskbar div - entire taskbar, used to position it at bottom */}

            <div
                className="taskbar-startbutton">
                <StartButton />
            </div>

            <div className="taskbar-systemtray">
                <SystemTray />
            </div>
        </div>
    );
};

export default Taskbar;