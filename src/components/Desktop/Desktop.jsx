import React from 'react';
import './Desktop.scss';
import DesktopIcon from './components/DesktopIcon/DesktopIcon';
import AboutMe from '../portfolio_sections/AboutMe';
import Projects from '../portfolio_sections/Projects';
import Contact from '../portfolio_sections/Contact';

const initialDesktopIcons = [
    { id: 'my-computer', label: 'My Computer', windowId: 'myComputerWindow', contentType: 'text', content: 'Contents of My Computer' },
    { id: 'recycle-bin', label: 'Recycle Bin', windowId: 'recycleBinWindow', contentType: 'text', content: 'Contents of Recycle Bin' },
    { id: 'documents', label: 'My Documents', windowId: 'myDocumentsWindow', contentType: 'text', content: 'Contents of My Documents' },
    { id: 'about-me', label: 'About Me', windowId: 'aboutMeWindow', contentType: 'component', contentComponent: AboutMe },
    { id: 'projects', label: 'Projects', windowId: 'projectsWindow', contentType: 'component', contentComponent: Projects },
    { id: 'contact', label: 'Contact', windowId: 'contactWindow', contentType: 'component', contentComponent: Contact }
];

const Desktop = () => {
    const handleIconDoubleClick = (label) => {
        const icon = initialDesktopIcons.find(icon => icon.label === label);
    
        if (icon) {
            console.log(`Opening window for ${label}`);
            // Here you would typically trigger the opening of a window
            // For example, you might call a function passed down from App.jsx
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
                        onDoubleClick={handleIconDoubleClick}
                    />    
                ))}
            </div>
        </div>
    );
};

export default Desktop;