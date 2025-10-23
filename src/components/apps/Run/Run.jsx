import React, { useState, useRef, useEffect } from 'react';
import './Run.scss';
import winverImg from '../../../assets/icons/winver_win_95.png';
import WindowsMediaViewer from '../WindowsMediaViewer/WindowsMediaViewer';
import wmvIcon from '../../../assets/icons/windows_media_viewer.ico';
import runIcon from '../../../assets/icons/run.ico';

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
            setBadCommand(value);
            setDialog('error');
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


