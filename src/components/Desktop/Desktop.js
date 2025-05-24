import React from 'react';
import './Desktop.scss';
import Taskbar from '../Taskbar/Taskbar';

const Desktop = () => {
    return (
        <div className='desktop'>
            <Taskbar />
        </div>
    );
};

export default Desktop;