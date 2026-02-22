import React, { useState, useRef } from 'react';
import './InternetExplorer.scss';

const InternetExplorer = () => {
    const HOME_URL = "https://www.google.com/webhp?igu=1";
    const iframeRef = useRef(null);

    const [urlToShow, setUrlToShow] = useState(HOME_URL);
    const [url, setUrl] = useState(HOME_URL);
    const [history, setHistory] = useState([HOME_URL]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [reloadKey, setReloadKey] = useState(0);
    // Tracks how many times the iframe has navigated beyond the React-set URL.
    // Needed because back/forward must step through in-frame navigation first.
    const [inFrameNavDepth, setInFrameNavDepth] = useState(0);
    // True while waiting for the first onLoad after a React-triggered navigation.
    const isInitialIframeLoad = useRef(true);

    const onURLChange = (event) => {
        setUrlToShow(event.target.value);
    };

    const formatUrl = (input) => {
        const trimmedInput = input.trim();

        // Need to block dangerous protocols!
        if (/^(javascript|data|vbscript|file):/i.test(trimmedInput)) {
            return HOME_URL;
        }

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

        isInitialIframeLoad.current = true;
        setInFrameNavDepth(0);
        setUrl(formattedUrl);
        setUrlToShow(formattedUrl);

        // Update history: remove any forward history and add new URL
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(formattedUrl);
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
        if (inFrameNavDepth > 0) {
            // The iframe has navigated beyond the React-loaded page.
            // Reload the current React URL to step back to where the iframe started,
            // instead of skipping past it to the previous React history entry.
            isInitialIframeLoad.current = true;
            setInFrameNavDepth(0);
            setUrlToShow(url);
            setReloadKey(k => k + 1);
        } else if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            isInitialIframeLoad.current = true;
            setInFrameNavDepth(0);
            setUrl(history[newIndex]);
            setUrlToShow(history[newIndex]);
            setHistoryIndex(newIndex);
        }
    };

    const onForward = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            isInitialIframeLoad.current = true;
            setInFrameNavDepth(0);
            setUrl(history[newIndex]);
            setUrlToShow(history[newIndex]);
            setHistoryIndex(newIndex);
        }
    };

    const onRefresh = () => {
        isInitialIframeLoad.current = true;
        setInFrameNavDepth(0);
        setReloadKey(k => k + 1);
    };

    const onHome = () => {
        if (url === HOME_URL) {
            // Already pointing at home URL — force remount to reset any in-frame navigation
            isInitialIframeLoad.current = true;
            setInFrameNavDepth(0);
            setUrlToShow(HOME_URL);
            setReloadKey(k => k + 1);
        } else {
            navigateToUrl(HOME_URL);
        }
    };

    const onIframeLoad = () => {
        if (isInitialIframeLoad.current) {
            // This is the React-triggered load — don't count it as in-frame navigation
            isInitialIframeLoad.current = false;
            return;
        }
        setInFrameNavDepth(d => d + 1);
        try {
            const iframeUrl = iframeRef.current?.contentWindow?.location?.href;
            if (iframeUrl && iframeUrl !== 'about:blank') {
                setUrlToShow(iframeUrl);
            }
        } catch {
            // Cross-origin frame — browser blocks URL access, leave URL bar unchanged
        }
    };

    const canGoBack = historyIndex > 0 || inFrameNavDepth > 0;
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
                key={`${url}-${reloadKey}`}
                ref={iframeRef}
                src={url}
                className="ie-iframe"
                title="Internet Explorer"
                onLoad={onIframeLoad}
                // Keep scripts/same-origin so sites render, but block popups to limit abuse
                sandbox='allow-scripts allow-same-origin allow-forms'
                referrerPolicy='no-referrer'
                allow="accelerometer 'none'; camera 'none'; geolocation 'none'; microphone 'none'"
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