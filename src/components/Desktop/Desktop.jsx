import React from 'react';
import './Desktop.scss';
import DesktopIcon from './components/DesktopIcon/DesktopIcon';
import Window from '../Window/Window';
import { initialDesktopIcons } from '../../config/desktopIcons.js';


const Desktop = ({ openWindows, onOpenWindow, onCloseWindow, onWindowFocus, onMinimizeWindow, activeWindowId }) => {
    const handleIconDoubleClick = (icon) => {
        onOpenWindow({
            id: icon.windowId,
            title: icon.label,
            icon: icon.image,
            contentType: icon.contentType,
            content: icon.content,
            contentComponent: icon.contentComponent,
            defaultPosition: icon.defaultPosition,
            width: icon.width || 400,
            height: icon.height || 300
        });
    };

    return (
        <div className='desktop'>
            <div className='desktop-icons-container'>
                {initialDesktopIcons.map(icon => (
                    <DesktopIcon
                        key={icon.id}
                        label={icon.label}
                        imgSrc={icon.image}
                        onDoubleClick={() => handleIconDoubleClick(icon)}
                        className={icon.id === 'apps-folder' ? 'desktop-icon--large' : ''}
                    />    
                ))}
            </div>
            
            {Object.entries(openWindows).map(([id, window]) => {
                return (
                    <Window
                        key={id}
                        isActive={activeWindowId === id}
                        isMinimized={window.isMinimized}
                        title={window.title}
                        onClose={() => onCloseWindow(id)}
                        onFocus={() => onWindowFocus(id)}
                        onMinimize={() => onMinimizeWindow(id, !window.isMinimized)}
                        defaultPosition={window.position}
                        width={window.width}
                        height={window.height}
                        zIndex={window.zIndex}
                    >
                        {window.contentType === 'component' ? 
                            window.contentComponent ? 
                                <window.contentComponent onOpenWindow={onOpenWindow} /> : 
                                <div>Component not found</div> :
                            <div className="window-text-content">{window.content}</div>
                        }
                    </Window>
                );
            })}
        </div>
    );
};

export default Desktop;