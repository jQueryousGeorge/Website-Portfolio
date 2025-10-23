import React, { useState, useRef } from 'react';
import './Notepad.scss';

const Notepad = () => {
    const [text, setText] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const textareaRef = useRef(null);

    // Handle text change
    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    // Save file as .txt
    const handleSave = () => {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'untitled.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsMenuOpen(false);
    };

    // Toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close menu when clicking outside
    const handleMenuBlur = () => {
        setTimeout(() => setIsMenuOpen(false), 200);
    };

    // Get text statistics
    const lineCount = text.split('\n').length;
    const charCount = text.length;

    return (
        <div className="notepad-container">
            {/* Menu Bar */}
            <div className="notepad-menu-bar">
                <div className="menu-item" onBlur={handleMenuBlur}>
                    <button 
                        className="menu-button" 
                        onClick={toggleMenu}
                    >
                        File
                    </button>
                    {isMenuOpen && (
                        <div className="menu-dropdown">
                            <button 
                                className="menu-dropdown-item" 
                                onClick={handleSave}
                            >
                                Save As...
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Text Area */}
            <textarea
                ref={textareaRef}
                className="notepad-textarea"
                value={text}
                onChange={handleTextChange}
                placeholder="Type your text here..."
                spellCheck={false}
            />

            {/* Status Bar */}
            <div className="notepad-status-bar">
                <span>Ln {lineCount}, Ch {charCount}</span>
            </div>
        </div>
    );
};

export default Notepad;

