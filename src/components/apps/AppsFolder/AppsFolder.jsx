import React from 'react';
import './AppsFolder.scss';
import Calculator from '../Calculator/Calculator';
import Notepad from '../Notepad/Notepad';
import WindowsExplorer from '../WindowsExplorer/WindowsExplorer';
import calculatorIcon from '../../../assets/icons/calculator.ico';
import notepadIcon from '../../../assets/icons/notepad.ico';
import windowsExplorerIcon from '../../../assets/icons/windows_explorer.ico';

const APP_SHORTCUTS = [
    {
        id: 'calculatorWindow',
        name: 'Calculator',
        icon: calculatorIcon,
        component: Calculator,
        width: 320,
        height: 380,
        defaultPosition: { x: 80, y: 120 }
    },
    {
        id: 'notepadWindow',
        name: 'Notepad',
        icon: notepadIcon,
        component: Notepad,
        width: 600,
        height: 450,
        defaultPosition: { x: 100, y: 180 }
    },
    {
        id: 'windowsExplorerWindow',
        name: 'Windows Explorer',
        icon: windowsExplorerIcon,
        component: WindowsExplorer,
        width: 680,
        height: 480,
        defaultPosition: { x: 200, y: 120 }
    }
];

const AppsFolder = ({ onOpenWindow }) => {
    const openShortcut = (s) => {
        if (!onOpenWindow) return;
        onOpenWindow({
            id: s.id,
            title: s.name,
            icon: s.icon,
            contentType: 'component',
            contentComponent: s.component,
            defaultPosition: s.defaultPosition,
            width: s.width,
            height: s.height
        });
    };

    return (
        <div className="apps-folder">
            {APP_SHORTCUTS.map(s => (
                <div key={s.id} className="apps-item" onDoubleClick={() => openShortcut(s)} title={s.name}>
                    <div className="icon-wrap"><img src={s.icon} alt={s.name} /></div>
                    <div className="label">{s.name}</div>
                </div>
            ))}
        </div>
    );
};

export default AppsFolder;


