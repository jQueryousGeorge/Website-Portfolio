import myComputerIcon from '../assets/icons/my_computer.ico';
import recycleBin from '../assets/icons/recycle_bin_with_paper.ico';

const ICON_IMAGES = {
    computer: myComputerIcon,
    recycleBin: recycleBin,
};

// export const initialDesktopIcons = [
//     {
//         id: 'computer',
//         title: 'My Computer',
//         image: ICON_IMAGES.computer,
//         position: { x: 50, y: 50 }
//     }
// ];

export const initialDesktopIcons = [
    { 
        id: 'my-computer', 
        label: 'My Computer',
        image: ICON_IMAGES.computer, 
        windowId: 'myComputerWindow', 
        contentType: 'text', 
        content: 'My Computer Contents',
        defaultPosition: { x: 100, y: 100 }
    },
    { 
        id: 'recycle-bin', 
        label: 'Recycle Bin',
        image: ICON_IMAGES.recycleBin, 
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