import React from "react";
import './Taskbar.scss';
import StartButton from './Components/StartButton/StartButton';
import SystemTray from './components/SystemTray/SystemTray';

const Taskbar = () => {
    return (
        <div className="taskbar">
            <StartButton />
            <div className="taskabr_tasks">
                {/* Open apps will pop-up here on the Taskbar */}
            </div>
            <SystemTray />
        </div>
    );
};

export default Taskbar;