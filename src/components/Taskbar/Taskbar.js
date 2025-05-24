import React from "react";
import "./Taskbar.scss";
import StartButton from "./Components/StartButton/StartButton";
import SystemTray from "./components/SystemTray/SystemTray";

const Taskbar = () => {
    return (
        <div className="taskbar-bottom">
            {/* Main taskbar div - entire taskbar, used to position it at bottom */}
            
            <div 
                className="taskbar-startbutton">
                <StartButton />
            </div>

            <div className="taskabr-systemtray">
                <SystemTray />
            </div>
        </div>
    );
};

export default Taskbar;
