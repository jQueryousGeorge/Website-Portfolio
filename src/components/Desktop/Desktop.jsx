import React from 'react';
import './Desktop.scss';
import DesktopIcon from './components/DesktopIcon/DesktopIcon';
import Window from '../Window/Window';
import AboutMe from '../portfolio_sections/AboutMe';
import Projects from '../portfolio_sections/Projects';
import Contact from '../portfolio_sections/Contact';

const initialDesktopIcons = [
    { 
        id: 'my-computer', 
        label: 'My Computer', 
        windowId: 'myComputerWindow', 
        contentType: 'text', 
        content: 'My Computer Contents',
        defaultPosition: { x: 100, y: 100 }
    },
    { 
        id: 'recycle-bin', 
        label: 'Recycle Bin', 
        windowId: 'recycleBinWindow', 
        contentType: 'text', 
        content: 'Recycle Bin is empty',
        defaultPosition: { x: 100, y: 200 }
    },
    { 
        id: 'about-me', 
        label: 'About Me', 
        windowId: 'aboutMeWindow', 
        contentType: 'component', 
        contentComponent: AboutMe,
        defaultPosition: { x: 100, y: 300 },
        width: 500,
        height: 400
    },
    { 
        id: 'projects', 
        label: 'Projects', 
        windowId: 'projectsWindow', 
        contentType: 'component', 
        contentComponent: Projects,
        defaultPosition: { x: 150, y: 150 },
        width: 600,
        height: 500
    },
    { 
        id: 'contact', 
        label: 'Contact', 
        windowId: 'contactWindow', 
        contentType: 'component', 
        contentComponent: Contact,
        defaultPosition: { x: 200, y: 200 },
        width: 500,
        height: 400
    }
];

const Desktop = ({ openWindows, onOpenWindow, onCloseWindow, onWindowFocus, activeWindowId }) => {
    const handleDoubleClick = (label) => {
        const icon = initialDesktopIcons.find(icon => icon.label === label);
    
        if (icon) {
            console.log(`Opening window for ${label}`);
            // Here we would typically trigger the opening of a window
            // For example,  calling a function passed down from App.jsx
            // to open the corresponding window with its content.
        } else {
            console.warn(`No icon found for label: ${label}`);
        }
    };

    return (
        <div className='desktop'>
            <div className='desktop-icons-container'>
                {initialDesktopIcons.map(icon => (
                    <DesktopIcon
                        key={icon.id}
                        label={icon.label}
                        onDoubleClick={() => handleDoubleClick(icon.label)}
                    />    
                ))}
            </div>
        </div>
    );
};

export default Desktop;