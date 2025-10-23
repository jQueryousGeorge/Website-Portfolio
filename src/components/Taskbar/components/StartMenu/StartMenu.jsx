import React, { useState, useEffect, useRef } from 'react';
import './StartMenu.scss';
import AboutMe from '../../../portfolio_sections/AboutMe';
import Projects from '../../../portfolio_sections/Projects';
import Contact from '../../../portfolio_sections/Contact';
import InternetExplorer from '../../../apps/InternetExplorer/InternetExplorer';
import windowsExplorerIcon from '../../../../assets/icons/windows_explorer.ico';
import ieIcon from '../../../../assets/icons/internet_explorer.ico';
import Notepad from '../../../apps/Notepad/Notepad';
import notepadIcon from '../../../../assets/icons/notepad.ico';
import Calculator from '../../../apps/Calculator/Calculator';
import calculatorIcon from '../../../../assets/icons/calculator.ico';
import SolitaireInfo from '../../../apps/SolitaireInfo/SolitaireInfo';
import solitaireIcon from '../../../../assets/icons/solitaire.ico';
import MinesweeperInfo from '../../../apps/MinesweeperInfo/MinesweeperInfo';
import minesweeperIcon from '../../../../assets/icons/minesweeper.ico';
import gamesIcon from '../../../../assets/icons/games.ico';
import textDocumentIcon from '../../../../assets/icons/text_document.ico';
import documentsFolderIcon from '../../../../assets/icons/documents_folder.ico';
import runIcon from '../../../../assets/icons/run.ico';
import Run from '../../../apps/Run/Run';

const StartMenu = ({ isOpen, onClose, onOpenWindow }) => {
    const [activeSubmenuByLevel, setActiveSubmenuByLevel] = useState({});
    const menuRef = useRef(null);

    // Menu items configuration
    const menuItems = [
        {
            id: 'programs',
            label: 'Programs',
            icon: '📁',
            hasSubmenu: true,
            submenu: [
                { id: 'notepad', label: 'Notepad', icon: <img src={notepadIcon} alt="Notepad" /> },
                { id: 'internet-explorer', label: 'Internet Explorer', icon: <img src={ieIcon} alt="Internet Explorer" /> },
                { id: 'calculator', label: 'Calculator', icon: <img src={calculatorIcon} alt="Calculator" /> },
                { id: 'explorer-shortcut', label: 'Windows Explorer', icon: <img src={windowsExplorerIcon} alt="Windows Explorer" /> },
                {
                    id: 'games', label: 'Games', icon: <img src={gamesIcon} alt="Games" className="menu-icon--large" />, hasSubmenu: true,
                    submenu: [
                        { id: 'solitaire', label: "Solitaire '95 (Microsoft Store)", icon: <img src={solitaireIcon} alt="Solitaire '95" /> },
                        { id: 'minesweeper', label: 'Minesweeper (Microsoft Store)', icon: <img src={minesweeperIcon} alt="Minesweeper" /> }
                    ]
                },
                
            ]
        },
        {
            id: 'documents',
            label: 'Documents',
            icon: <img src={documentsFolderIcon} alt="Documents" />,
            hasSubmenu: true,
            submenu: [
                { id: 'resume', label: 'Resume.doc', icon: <img src={textDocumentIcon} alt="Documents" /> },
                { id: 'cover-letter', label: 'Cover Letter.doc', icon: <img src={textDocumentIcon} alt="Documents" /> }
            ]
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: '⚙️',
            hasSubmenu: true,
            submenu: [
                { id: 'control-panel', label: 'Control Panel', icon: '🎛️' },
                { id: 'printers', label: 'Printers', icon: '🖨️' }
            ]
        },
        {
            id: 'find',
            label: 'Find',
            icon: '🔍',
            hasSubmenu: true,
            submenu: [
                { id: 'find-files', label: 'Files or Folders...', icon: '📁' },
                { id: 'find-computer', label: 'Computer...', icon: '💻' }
            ]
        },
        { id: 'help', label: 'Help', icon: '❓' },
        { id: 'run', label: 'Run...', icon: <img src={runIcon} alt="Run" /> },
        { type: 'separator' },
        { id: 'shutdown', label: 'Shut Down...', icon: '⏻' }
    ];

    // Portfolio-specific items to add to Programs
    const portfolioItems = [
        { type: 'separator' },
        { id: 'about-me', label: 'About Me', icon: '👤' },
        { id: 'projects', label: 'My Projects', icon: '💼' },
        { id: 'contact', label: 'Contact', icon: '📧' },
        { id: 'skills', label: 'Skills', icon: '🛠️' }
    ];

    // Add portfolio items to Programs submenu
    if (menuItems[0].submenu) {
        menuItems[0].submenu.push(...portfolioItems);
    }

    // Click-away handled via overlay element
    useEffect(() => {
        return undefined;
    }, []);

    const handleItemClick = (item, event) => {
        // If item has submenu, don't close menu, just show submenu
        if (item.hasSubmenu) {
            event.stopPropagation();
            return;
        }

        // Handle special cases
        if (item.id === 'shutdown') {
            if (window.confirm('Are you sure you want to shut down Windows 95?')) {
                alert('It is now safe to turn off your computer.');
                // Could add a fun shutdown animation here
            }
            onClose();
            return;
        }

        // Handle I.E. item
        if (item.id === 'internet-explorer') {
            onOpenWindow({
                id: 'internetExplorerWindow',
                title: 'Internet Explorer',
                icon: ieIcon,
                contentType: 'component',
                contentComponent: InternetExplorer,
                defaultPosition: { x: 100, y: 100 },
                width: 800,
                height: 600
            });
            onClose();
            return;
        }

        // Handle Notepad item
        if (item.id === 'notepad') {
            onOpenWindow({
                id: 'notepadWindow',
                title: 'Notepad',
                icon: notepadIcon,
                contentType: 'component',
                contentComponent: Notepad,
                defaultPosition: { x: 100, y: 180 },
                width: 600,
                height: 450
            });
            onClose();
            return;
        }

        // Handle Calculator item
        if (item.id === 'calculator') {
            onOpenWindow({
                id: 'calculatorWindow',
                title: 'Calculator',
                icon: calculatorIcon,
                contentType: 'component',
                contentComponent: Calculator,
                defaultPosition: { x: 120, y: 120 },
                width: 320,
                height: 380
            });
            onClose();
            return;
        }

        // Handle Windows Explorer
        if (item.id === 'explorer-shortcut') {
            onOpenWindow({
                id: 'windowsExplorerWindow',
                title: 'Windows Explorer',
                icon: windowsExplorerIcon,
                contentType: 'component',
                contentComponent: require('../../../apps/WindowsExplorer/WindowsExplorer').default,
                defaultPosition: { x: 200, y: 120 },
                width: 680,
                height: 480
            });
            onClose();
            return;
        }

        // Handle Run dialog
        if (item.id === 'run') {
            onOpenWindow({
                id: 'runDialogWindow',
                title: 'Run',
                icon: runIcon,
                contentType: 'component',
                contentComponent: Run,
                width: 420,
                height: 160
            });
            onClose();
            return;
        }

        // Handle portfolio items
        if (item.id === 'about-me') {
            onOpenWindow({
                id: 'aboutMeWindow',
                title: 'About Me',
                contentType: 'component',
                contentComponent: AboutMe,
                defaultPosition: { x: 150, y: 100 },
                width: 500,
                height: 400
            });
            onClose();
            return;
        }

        // Games → Solitaire: open info window with link to store
        if (item.id === 'solitaire') {
            onOpenWindow({
                id: 'solitaireInfoWindow',
                title: "Solitaire '95",
                icon: solitaireIcon,
                contentType: 'component',
                contentComponent: SolitaireInfo,
                defaultPosition: { x: 160, y: 140 },
                width: 420,
                height: 260
            });
            onClose();
            return;
        }

        // Games → Minesweeper: open info window with link to store
        if (item.id === 'minesweeper') {
            onOpenWindow({
                id: 'minesweeperInfoWindow',
                title: 'Minesweeper',
                icon: minesweeperIcon,
                contentType: 'component',
                contentComponent: MinesweeperInfo,
                defaultPosition: { x: 180, y: 160 },
                width: 420,
                height: 260
            });
            onClose();
            return;
        }

        if (item.id === 'projects') {
            onOpenWindow({
                id: 'projectsWindow',
                title: 'My Projects',
                contentType: 'component',
                contentComponent: Projects,
                defaultPosition: { x: 200, y: 150 },
                width: 600,
                height: 500
            });
            onClose();
            return;
        }

        if (item.id === 'contact') {
            onOpenWindow({
                id: 'contactWindow',
                title: 'Contact',
                contentType: 'component',
                contentComponent: Contact,
                defaultPosition: { x: 250, y: 200 },
                width: 500,
                height: 400
            });
            onClose();
            return;
        }

        if (item.id === 'skills') {
            onOpenWindow({
                id: 'skillsWindow',
                title: 'Skills',
                contentType: 'text',
                content: 'Skills and Technologies:\n\n• JavaScript / TypeScript\n• React / Redux\n• Node.js\n• HTML5 / CSS3 / SASS\n• Git / GitHub\n• And more...',
                defaultPosition: { x: 300, y: 250 },
                width: 400,
                height: 350
            });
            onClose();
            return;
        }

        // Handle other items
        if (!item.hasSubmenu) {
            // For now, just show a message
            alert(`Opening ${item.label}...`);
            onClose();
        }
    };

    const handleMouseEnter = (item, level) => {
        setActiveSubmenuByLevel((prev) => {
            const next = {};
            // keep levels up to current level (not including current)
            for (const key in prev) {
                const numericKey = Number(key);
                if (!Number.isNaN(numericKey) && numericKey < level) {
                    next[numericKey] = prev[numericKey];
                }
            }
            // only set current level if item has a submenu
            if (item && item.hasSubmenu) {
                next[level] = item.id;
            }
            return next;
        });
    };

    const renderMenuItem = (item, level = 0, index = 0) => {
        if (item.type === 'separator') {
            return <div key={`separator-${level}-${index}`} className="menu-separator" />;
        }

        const isActiveAtLevel = activeSubmenuByLevel[level] === item.id;

        return (
            <div
                key={item.id}
                className={`menu-item ${item.hasSubmenu ? 'has-submenu' : ''} ${isActiveAtLevel ? 'active' : ''}`}
                onClick={(e) => handleItemClick(item, e)}
                onMouseEnter={() => handleMouseEnter(item, level)}
            >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
                {item.hasSubmenu && <span className="submenu-arrow">▶</span>}

                {item.hasSubmenu && isActiveAtLevel && item.submenu && (
                    <div
                        className={`submenu level-${level + 1}`}
                        onMouseDown={(e) => {
                            e.stopPropagation();
                            if (e.nativeEvent && typeof e.nativeEvent.stopPropagation === 'function') {
                                e.nativeEvent.stopPropagation();
                            }
                        }}
                    >
                        {item.submenu.map((subItem, subIndex) => renderMenuItem(subItem, level + 1, subIndex))}
                    </div>
                )}
            </div>
        );
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="start-menu-overlay" onMouseDown={onClose} />
            <div
                className="start-menu"
                ref={menuRef}
                onMouseDown={(e) => {
                    e.stopPropagation();
                    if (e.nativeEvent && typeof e.nativeEvent.stopPropagation === 'function') {
                        e.nativeEvent.stopPropagation();
                    }
                }}
            >
                <div className="start-menu-sidebar">
                    <div className="sidebar-text">
                        <span>Windows</span>
                        <span className="version">95</span>
                    </div>
                </div>
                <div className="start-menu-content">
                    {menuItems.map((item, idx) => renderMenuItem(item, 0, idx))}
                </div>
            </div>
        </>
    );
};

export default StartMenu;