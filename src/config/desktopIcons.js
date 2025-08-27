import AboutMe from '../components/portfolio_sections/AboutMe'
import Contact from '../components/portfolio_sections/Contact'
import Projects from '../components/portfolio_sections/Projects'
import myComputerIcon from '../assets/icons/my_computer.ico';
import recycleBinIcon from '../assets/icons/recycle_bin_with_paper.ico';
import aboutMeIcon from '../assets/icons/about_me_icon.ico';

const ICON_IMAGES = {
    computer: myComputerIcon,
    recycleBin: recycleBinIcon,
    aboutMe: aboutMeIcon
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
        image: ICON_IMAGES.aboutMe, 
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