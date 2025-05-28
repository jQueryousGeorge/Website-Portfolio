import React from "react";
import './SystemTray.scss';

const SystemTray = () => {
    return (
        <div className="systemtray-right">
            <div className="tray-clock">
                <span className="clock-text">12:00</span>
            </div>
        </div>
    );
};

export default SystemTray;