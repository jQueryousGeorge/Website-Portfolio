import React, { useState, useRef, useEffect } from 'react';
import './Run.scss';
import winverImg from '../../../assets/icons/winver_win_95.png';

const Run = ({ onCloseWindow }) => {
    const [command, setCommand] = useState('');
    const [dialog, setDialog] = useState(null); // 'winver' | 'error' | null
    const inputRef = useRef(null);

    useEffect(() => {
        // focus the input when opened
        if (inputRef.current) inputRef.current.focus();
    }, []);

    const handleOK = () => {
        const value = (command || '').trim();
        if (value.toLowerCase() === 'winver') {
            setDialog('winver');
        } else {
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

            {dialog === 'winver' && (
                <div className="modal-overlay" onClick={() => setDialog(null)}>
                    <div className="modal winver" onClick={(e) => e.stopPropagation()}>
                        <img src={winverImg} alt="About Windows 95" />
                        <div className="modal-actions">
                            <button className="win95-button" onClick={() => setDialog(null)}>OK</button>
                        </div>
                    </div>
                </div>
            )}

            {dialog === 'error' && (
                <div className="modal-overlay" onClick={() => setDialog(null)}>
                    <div className="modal warning" onClick={(e) => e.stopPropagation()}>
                        <div className="warning-icon">✖</div>
                        <div className="warning-text">There is nowhere you can run.\ncommand not found</div>
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


