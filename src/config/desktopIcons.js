// This file, `src/config/desktopIcons.js` defines all apps available for use on the Desktop. 
// In other words, it's the central config file for defining what apps are available on the Desktop.

// Import all of the app components && their icons
import AboutMe from '../components/portfolio_sections/AboutMe'
import Contact from '../components/portfolio_sections/Contact'
import Projects from '../components/portfolio_sections/Projects'
import InternetExplorer from '../components/apps/InternetExplorer/InternetExplorer'
import Notepad from '../components/apps/Notepad/Notepad'
import Calculator from '../components/apps/Calculator/Calculator'
import WindowsExplorer from '../components/apps/WindowsExplorer/WindowsExplorer'
import myComputerIcon from '../assets/icons/my_computer.ico';
import recycleBinIcon from '../assets/icons/recycle_bin_with_paper.ico';
import aboutMeIcon from '../assets/icons/about_me_icon.ico';
import contactIcon from '../assets/icons/mailbox_with_phone.ico';
import projectsIcon from '../assets/icons/user_with_computer.ico';
import ieIcon from '../assets/icons/internet_explorer.ico';
import notepadIcon from '../assets/icons/notepad.ico';
import calculatorIcon from '../assets/icons/calculator.ico';
import windowsExplorerIcon from '../assets/icons/windows_explorer.ico';

// Set the icon images from the import statements above:
const ICON_IMAGES = {
    computer: myComputerIcon,
    recycleBin: recycleBinIcon,
    aboutMe: aboutMeIcon,
    contact: contactIcon,
    projects: projectsIcon,
    internetExplorer: ieIcon,
    notepad: notepadIcon,
    calculator: calculatorIcon,
    windowsExplorer: windowsExplorerIcon
};

// Configure each desktop icon with metadata:
export const initialDesktopIcons = [
    { 
        id: 'recycle-bin', 
        label: 'Recycle Bin',
        image: ICON_IMAGES.recycleBin, 
        windowId: 'recycleBinWindow', 
        contentType: 'text', 
        content: 'Recycle Bin is empty',
        defaultPosition: { x: 100, y: 260 }
    },
    { 
        id: 'windows-explorer', 
        label: 'Windows Explorer',
        image: ICON_IMAGES.windowsExplorer,
        windowId: 'windowsExplorerWindow', 
        contentType: 'component', 
        contentComponent: WindowsExplorer,
        defaultPosition: { x: 200, y: 120 },
        width: 680,
        height: 480
    },
    { 
        id: 'calculator', 
        label: 'Calculator',
        image: ICON_IMAGES.calculator,
        windowId: 'calculatorWindow', 
        contentType: 'component', 
        contentComponent: Calculator,
        defaultPosition: { x: 80, y: 120 },
        width: 320,
        height: 380
    },
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
        id: 'internet-explorer', 
        label: 'Internet Explorer',
        image: ICON_IMAGES.internetExplorer,
        windowId: 'internetExplorerWindow', 
        contentType: 'component', 
        contentComponent: InternetExplorer,
        defaultPosition: { x: 50, y: 50 },
        width: 800,
        height: 600
    },
    { 
        id: 'notepad', 
        label: 'Notepad',
        image: ICON_IMAGES.notepad,
        windowId: 'notepadWindow', 
        contentType: 'component', 
        contentComponent: Notepad,
        defaultPosition: { x: 100, y: 180 },
        width: 600,
        height: 450
    },
    { 
        id: 'about-me', 
        label: 'About Me',
        image: ICON_IMAGES.aboutMe, 
        windowId: 'aboutMeWindow', 
        contentType: 'component', 
        contentComponent: AboutMe,
        defaultPosition: { x: 100, y: 340 },
        width: 500,
        height: 400
    },
    { 
        id: 'projects', 
        label: 'Projects',
        image: ICON_IMAGES.projects, 
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
        image: ICON_IMAGES.contact, 
        windowId: 'contactWindow', 
        contentType: 'component', 
        contentComponent: Contact,
        defaultPosition: { x: 200, y: 200 },
        width: 500,
        height: 400
    }
];