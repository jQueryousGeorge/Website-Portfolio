import React from 'react';
import './Desktop.scss';
import Taskbar from '../Taskbar/Taskbar';

const initialDesktopIcons = [
    { id: 'my-computer', label: 'My Computer', windowId: 'myComputerWindow', contentType: 'text', content: 'Contents of My Computer' },
    { id: 'recycle-bin', label: 'Recycle Bin', windowId: 'recycleBinWindow', contentType: 'text', content: 'Contents of Recycle Bin' },
    { id: 'documents', label: 'My Documents', windowId: 'myDocumentsWindow', contentType: 'text', content: 'Contents of My Documents' },
    { id: 'about-me', label: 'About Me', windowId: 'aboutMeWindow', contentType: 'component', contentComponent: AboutMe },
    { id: 'projects', label: 'Projects', windowId: 'projectsWindow', contentType: 'component', contentComponent: Projects },
    { id: 'contact', label: 'Contact', windowId: 'contactWindow', contentType: 'component', contentComponent: Contact }
];

const Desktop = () => {
    return (
        <div className='desktop'>
            <Taskbar />
        </div>
    );
};

export default Desktop;