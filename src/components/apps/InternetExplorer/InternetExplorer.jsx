import React, { useState } from 'react';
import './InternetExplorer.scss';

const InternetExplorer = () => {
    const [urlToShow, setUrlToShow] = useState("https://www.google.com/webhp?igu=1");
    const [url, setUrl] = useState("https://www.google.com/webhp?igu=1");

    const onURLChange = (event) => {
        setUrlToShow(event.target.value);
    };

    const onGo = () => {
        setUrl(urlToShow);
    };

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            onGo();
        }
    };

    return (
        <div
            className="height-100"
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                margin: '-10px',
                width: 'calc(100% + 20px)'
            }}
        >
            <div className="ie-nav-bar">
                <button className="ie-nav-button" title="Back">←</button>
                <button className="ie-nav-button" title="Forward">→</button>
                <button className="ie-nav-button" title="Refresh">🔄</button>
                <button className="ie-nav-button" title="Home">🏠</button>
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
                src={url}
                className="ie-iframe"
                title="Internet Explorer"
                style={{
                    flex: 1,
                    border: 'none',
                    width: '100%',
                    height: '100%',
                    minHeight: '600px', // Increased even more
                    display: 'block'
                }}
            />
        </div>
    );
};

export default InternetExplorer;