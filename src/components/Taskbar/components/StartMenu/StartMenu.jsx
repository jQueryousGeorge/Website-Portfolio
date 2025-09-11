import React, { useState, useEffect, useRef } from 'react';
import './StartMenu.scss';
import AboutMe from '../../../portfolio_sections/AboutMe';
import Projects from '../../../portfolio_sections/Projects';
import Contact from '../../../portfolio_sections/Contact';
import InternetExplorer from '../../../apps/InternetExplorer/InternetExplorer';

const StartMenu = ({ isOpen, onClose, onOpenWindow }) => {
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const menuRef = useRef(null);

    // Menu items configuration
    const menuItems = [
        {
            id: 'programs',
            label: 'Programs',
            icon: '📁',
            hasSubmenu: true,
            submenu: [
                { id: 'notepad', label: 'Notepad', icon: '📝' },
                { id: 'internet-explorer', label: 'Internet Explorer', icon: '🌐' },
                { id: 'calculator', label: 'Calculator', icon: '🧮' },
                {
                    id: 'games', label: 'Games', icon: '🎮', hasSubmenu: true,
                    submenu: [
                        { id: 'solitaire', label: 'Solitaire', icon: '🃏' },
                        { id: 'minesweeper', label: 'Minesweeper', icon: '💣' }
                    ]
                },
                { id: 'explorer', label: 'Windows Explorer', icon: '🗂️' }
            ]
        },
        {
            id: 'documents',
            label: 'Documents',
            icon: '📄',
            hasSubmenu: true,
            submenu: [
                { id: 'resume', label: 'Resume.doc', icon: '📄' },
                { id: 'cover-letter', label: 'Cover Letter.doc', icon: '📄' }
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
        { id: 'run', label: 'Run...', icon: '▶️' },
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

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) &&
                !event.target.closest('.start-button')) {
                onClose();
                setActiveSubmenu(null);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleItemClick = (item) => {
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
                contentType: 'component',
                contentComponent: InternetExplorer,
                defaultPosition: { x: 100, y: 100 },
                width: 800,
                height: 600
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

    const handleMouseEnter = (itemId) => {
        setActiveSubmenu(itemId);
    };

    const renderMenuItem = (item, level = 0) => {
        if (item.type === 'separator') {
            return <div key={`separator-${level}-${Math.random()}`} className="menu-separator" />;
        }

        return (
            <div
                key={item.id}
                className={`menu-item ${item.hasSubmenu ? 'has-submenu' : ''} ${activeSubmenu === item.id ? 'active' : ''}`}
                onClick={() => handleItemClick(item)}
                onMouseEnter={() => handleMouseEnter(item.id)}
            >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
                {item.hasSubmenu && <span className="submenu-arrow">▶</span>}

                {item.hasSubmenu && activeSubmenu === item.id && item.submenu && (
                    <div className={`submenu level-${level + 1}`}>
                        {item.submenu.map(subItem => renderMenuItem(subItem, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    if (!isOpen) return null;

    return (
        <div className="start-menu" ref={menuRef}>
            <div className="start-menu-sidebar">
                <div className="sidebar-text">
                    <span>Windows</span>
                    <span className="version">95</span>
                </div>
            </div>
            <div className="start-menu-content">
                {menuItems.map(item => renderMenuItem(item))}
            </div>
        </div>
    );
};

export default StartMenu;