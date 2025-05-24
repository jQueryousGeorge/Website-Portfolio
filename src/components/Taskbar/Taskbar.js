import React from "react";
import "./Taskbar.scss";
import StartButton from "./components/StartButton/StartButton";
import SystemTray from "./components/SystemTray/SystemTray";

const Taskbar = () => {
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
