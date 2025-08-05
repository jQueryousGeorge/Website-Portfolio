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
    const handleDoubleClick = (icon) => {
        onOpenWindow({
            id: icon.windowId,
            title: icon.label,
            contentType: icon.contentType,
            content: icon.content,
            contentComponent: icon.contentComponent,
            defaultPosition: icon.defaultPosition,
            width: icon.width || 400,
            height: icon.height || 300
        });
    }
    

    return (
        <div className='desktop'>
            <div className='desktop-icons-container'>
                {initialDesktopIcons.map(icon => (
                    <DesktopIcon
                        key={icon.id}
                        label={icon.label}
                        onDoubleClick={() => handleDoubleClick(icon)}
                    />    
                ))}
            </div>

            {Object.entries(openWindows).map(([id, windowData]) => {
                const window = windowData.windowData || {};
                const state = windowData.state || {};

                return (
                    <Window
                        key={id}
                        isActive={activeWindowId === id}
                        isMinimized={state.isMinimized}
                        title={window.title}

                        onClose={() => {
                            onCloseWindow(id)
                        }}

                        onFocus={() => {
                            onWindowFocus(id)
                        }}

                        onMinimize={() => {
                            onMinimizeWindow(id, !state.isMinimized)
                        }}

                        defaultPosition={state.position || window.defaultPosition}
                        width={window.width}
                        height={window.height}
                    >
                        {window.contentType === 'component' ? window.contentComponent ? <window.contentComponent /> : <div>Component not found</div> : <div className='window-content'>{window.content}</div>
                        }
                    </Window>

                );
            })}
        </div>
    );
};

export default Desktop;