import React from 'react';
import './Desktop.scss';
import Taskbar from '../Taskbar/Taskbar';

const initialDesktopIcons = [
    {id: "xxx", label: "xxx", windowId: "xxx", contentType: "xxx"},
    {id: "xxx", label: "xxx", windowId: "xxx", contentType: "xxx"},
    {id: "xxx", label: "xxx", windowId: "xxx", contentType: "xxx"},
    {id: "xxx", label: "xxx", windowId: "xxx", contentType: "xxx"},
    {id: "xxx", label: "xxx", windowId: "xxx", contentType: "xxx"},
    {id: "xxx", label: "xxx", windowId: "xxx", contentType: "xxx"}
];

const Desktop = () => {
    return (
        <div className='desktop'>
            <Taskbar />
        </div>
    );
};

export default Desktop;