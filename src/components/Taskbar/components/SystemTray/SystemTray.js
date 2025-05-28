import React, { useState, useEffect } from 'react';
import './SystemTray.scss';

const SystemTray = () => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // The hour '0' should be '12' am.
            const minuteStr = minutes < 10 ? '0' + minutes : minutes;
            setCurrentTime(`${hours}: ${minuteStr} ${ampm}`);
        };

        updateTime();
        const timerId = setInterval(updateTime, 1000);

        return () => {
            clearInterval(timerId); // Cleanup interval on component unmounting
        }
    }, []);


    return (
        <div className="systemtray-right">
            <div className="tray-clock">
                {currentTime}
            </div>
        </div>
    );
};

export default SystemTray;