import React, { useState, useRef, useEffect } from 'react';
import './Run.scss';
import winverImg from '../../../assets/icons/winver_win_95.png';
import WindowsMediaViewer from '../WindowsMediaViewer/WindowsMediaViewer';
import wmvIcon from '../../../assets/icons/windows_media_viewer.ico';
import { initialDesktopIcons } from '../../../config/desktopIcons';
import { APPS_FOLDER_SHORTCUTS } from '../AppsFolder/AppsFolder';
import MinesweeperInfo from '../MinesweeperInfo/MinesweeperInfo';
import SolitaireInfo from '../SolitaireInfo/SolitaireInfo';
import minesweeperIcon from '../../../assets/icons/minesweeper.ico';
import solitaireIcon from '../../../assets/icons/solitaire.ico';

const Run = ({ onCloseWindow, onOpenWindow }) => {
    const [command, setCommand] = useState('');
    const [dialog, setDialog] = useState(null); // 'winver' | 'error' | null
    const [badCommand, setBadCommand] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        // focus the input when opened
        if (inputRef.current) inputRef.current.focus();
    }, []);

    const handleOK = () => {
        const value = (command || '').trim();
        if (value.toLowerCase() === 'winver') {
            // Launch Windows Media Viewer with the winver image
            if (onOpenWindow) {
                onOpenWindow({
                    id: 'wmvWinverWindow',
                    title: 'Windows Media Viewer',
                    icon: wmvIcon,
                    contentType: 'component',
                    contentComponent: () => <WindowsMediaViewer src={winverImg} alt="About Windows 95" />,
                    width: 360,
                    height: 280
                });
            }
            if (onCloseWindow) onCloseWindow();
        } else {
            // Support launching any desktop app via <name>.exe
            const lower = value.toLowerCase();
            if (!lower.endsWith('.exe')) {
                setBadCommand(value);
                setDialog('error');
                return;
            }

            const rawName = lower.slice(0, -4); // strip .exe
            const normalize = (s) => (s || '')
                .toLowerCase()
                .replace(/[^a-z0-9]/g, ''); // remove spaces, hyphens, punctuation

            const target = normalize(rawName);

            let matchedIcon = null;
            const searchPool = [
                ...initialDesktopIcons,
                ...APPS_FOLDER_SHORTCUTS.map(s => ({
                    id: s.id,
                    label: s.name,
                    image: s.icon,
                    windowId: s.id,
                    contentType: 'component',
                    contentComponent: s.component,
                    defaultPosition: s.defaultPosition,
                    width: s.width,
                    height: s.height
                }))
            ];

            for (const icon of searchPool) {
                const byLabel = normalize(icon.label);
                const byId = normalize(icon.id);
                const byWindowId = normalize(icon.windowId);
                if (target === byLabel || target === byId || target === byWindowId) {
                    matchedIcon = icon;
                    break;
                }
            }

            if (matchedIcon && onOpenWindow) {
                onOpenWindow({
                    id: matchedIcon.windowId,
                    title: matchedIcon.label,
                    icon: matchedIcon.image,
                    contentType: matchedIcon.contentType,
                    content: matchedIcon.content,
                    contentComponent: matchedIcon.contentComponent,
                    defaultPosition: matchedIcon.defaultPosition,
                    width: matchedIcon.width || 400,
                    height: matchedIcon.height || 300
                });
                if (onCloseWindow) onCloseWindow();
            } else {
                // Fall back to Start Menu-only entries (e.g., Games)
                const startMenuLaunchers = {
                    minesweeper: () => onOpenWindow && onOpenWindow({
                        id: 'minesweeperInfoWindow',
                        title: 'Minesweeper',
                        icon: minesweeperIcon,
                        contentType: 'component',
                        contentComponent: MinesweeperInfo,
                        width: 420,
                        height: 260
                    }),
                    solitaire: () => onOpenWindow && onOpenWindow({
                        id: 'solitaireInfoWindow',
                        title: "Solitaire '95",
                        icon: solitaireIcon,
                        contentType: 'component',
                        contentComponent: SolitaireInfo,
                        width: 420,
                        height: 260
                    })
                };

                const starter = startMenuLaunchers[target];
                if (starter) {
                    starter();
                    if (onCloseWindow) onCloseWindow();
                } else {
                    setBadCommand(value);
                    setDialog('error');
                }
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleOK();
        }
    };

    return (
        <div className="run-container">
            <div className="run-title">Type the name of a program, folder, or document, and Windows will open it for you.</div>
            <div className="run-row">
                <label className="run-label" htmlFor="run-input">Open:</label>
                <input
                    id="run-input"
                    ref={inputRef}
                    className="run-input"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div className="run-dropdown-toggle" aria-hidden>▾</div>
            </div>
            <div className="run-actions">
                <button className="win95-button" onClick={handleOK}>OK</button>
                <button className="win95-button" onClick={() => onCloseWindow && onCloseWindow()}>Cancel</button>
                <button className="win95-button" disabled>Browse...</button>
            </div>

            {dialog === 'winver' && null}

            {dialog === 'error' && (
                <div className="modal-overlay" onClick={() => setDialog(null)}>
                    <div className="modal warning" onClick={(e) => e.stopPropagation()}>
                        <div className="warning-icon">✖</div>
                        <div className="warning-text">Windows cannot find '{badCommand || ''}'. Please try running an app name on the Desktop + .exe (e.g., 'Notepad.exe') or 'winver' into the Run box.</div>
                        <div className="modal-actions">
                            <button className="win95-button" onClick={() => setDialog(null)}>OK</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Run;


