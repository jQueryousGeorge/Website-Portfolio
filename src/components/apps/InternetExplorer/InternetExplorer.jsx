import React, { useState, useRef } from 'react';
import './InternetExplorer.scss';

const InternetExplorer = () => {
    const HOME_URL = "https://www.google.com/webhp?igu=1";
    const iframeRef = useRef(null);
    
    const [urlToShow, setUrlToShow] = useState(HOME_URL);
    const [url, setUrl] = useState(HOME_URL);
    const [history, setHistory] = useState([HOME_URL]);
    const [historyIndex, setHistoryIndex] = useState(0);

    const onURLChange = (event) => {
        setUrlToShow(event.target.value);
    };

    const formatUrl = (input) => {
        const trimmedInput = input.trim();
        
        // If empty, return home URL
        if (!trimmedInput) {
            return HOME_URL;
        }
        
        // If it's already a valid URL with protocol, return as is
        if (trimmedInput.startsWith('http://') || trimmedInput.startsWith('https://')) {
            return trimmedInput;
        }
        
        // If it looks like a domain (has a dot and no spaces), add https://
        if (trimmedInput.includes('.') && !trimmedInput.includes(' ')) {
            return `https://${trimmedInput}`;
        }
        
        // Otherwise, treat it as a Google search query
        return `https://www.google.com/search?igu=1&q=${encodeURIComponent(trimmedInput)}`;
    };

    const navigateToUrl = (newUrl) => {
        const formattedUrl = formatUrl(newUrl);
        console.log('Navigating to:', formattedUrl);
        console.log('Before navigation - History:', history, 'Index:', historyIndex);
        
        setUrl(formattedUrl);
        setUrlToShow(formattedUrl);
        
        // Update history: remove any forward history and add new URL
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(formattedUrl);
        console.log('New history:', newHistory, 'New index:', newHistory.length - 1);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    const onGo = () => {
        if (urlToShow && urlToShow !== url) {
            navigateToUrl(urlToShow);
        }
    };

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            onGo();
        }
    };

    const onBack = () => {
        console.log('Back button clicked', { historyIndex, history });
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            const newUrl = history[newIndex];
            console.log('Going back to:', newUrl);
            setUrl(newUrl);
            setUrlToShow(newUrl);
            setHistoryIndex(newIndex);
        }
    };

    const onForward = () => {
        console.log('Forward button clicked', { historyIndex, history });
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            const newUrl = history[newIndex];
            console.log('Going forward to:', newUrl);
            setUrl(newUrl);
            setUrlToShow(newUrl);
            setHistoryIndex(newIndex);
        }
    };

    const onRefresh = () => {
        console.log('Refresh button clicked, reloading:', url);
        // Force iframe reload by resetting the src
        if (iframeRef.current) {
            const currentSrc = iframeRef.current.src;
            iframeRef.current.src = 'about:blank';
            setTimeout(() => {
                iframeRef.current.src = currentSrc;
            }, 10);
        }
    };

    const onHome = () => {
        console.log('Home button clicked, navigating to:', HOME_URL);
        navigateToUrl(HOME_URL);
    };

    const canGoBack = historyIndex > 0;
    const canGoForward = historyIndex < history.length - 1;

    return (
        <div
            className="height-100"
            style={{
                flex: 1,
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div className="ie-nav-bar">
                <button 
                    className="ie-nav-button" 
                    title="Back" 
                    onClick={onBack}
                    disabled={!canGoBack}
                    style={{ opacity: canGoBack ? 1 : 0.5, cursor: canGoBack ? 'pointer' : 'not-allowed' }}
                >
                    ←
                </button>
                <button 
                    className="ie-nav-button" 
                    title="Forward" 
                    onClick={onForward}
                    disabled={!canGoForward}
                    style={{ opacity: canGoForward ? 1 : 0.5, cursor: canGoForward ? 'pointer' : 'not-allowed' }}
                >
                    →
                </button>
                <button 
                    className="ie-nav-button" 
                    title="Refresh" 
                    onClick={onRefresh}
                >
                    🔄
                </button>
                <button 
                    className="ie-nav-button" 
                    title="Home" 
                    onClick={onHome}
                >
                    🏠
                </button>
                <input
                    type="text"
                    className="ie-address-input"
                    value={urlToShow}
                    onChange={onURLChange}
                    onKeyPress={onKeyPress}
                    placeholder="Type a web address"
                />
                <button className="ie-go-button" onClick={onGo}>Go</button>
            </div>
            <iframe
                key={url}
                ref={iframeRef}
                src={url}
                className="ie-iframe"
                title="Internet Explorer"
                style={{
                    flex: 1,
                    minHeight: 0,
                    border: 'none',
                    width: '100%',
                    display: 'block'
                }}
            />
        </div>
    );
};

export default InternetExplorer;