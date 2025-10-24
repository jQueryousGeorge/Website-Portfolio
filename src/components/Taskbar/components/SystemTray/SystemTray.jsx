import React, { useState, useEffect } from 'react';
import './SystemTray.scss';
import internetGif from '../../../../assets/icons/internet_dialup.gif';
import soundIcon from '../../../../assets/icons/sound_icon.ico';
import batteryIcon from '../../../../assets/icons/battery_icon.ico';

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
            setCurrentTime(`${hours}:${minuteStr} ${ampm}`);
        };

        updateTime();
        const timerId = setInterval(updateTime, 1000);

        return () => {
            clearInterval(timerId); // Cleanup interval on component unmounting
        }
    }, []);


    return (
        <div className="system-tray-right">
            <img className="tray-icon" src={soundIcon} alt="Sound Activity Icon" />
            <img className="tray-gif" src={internetGif} alt="Internet Activity" />
            <img className="tray-icon" src={batteryIcon} alt="Battery Indicator Icon" />
            <div className="tray-clock">
                {currentTime}
            </div>
        </div>
    );
};

export default SystemTray;