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
        <div className="height-100">
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
                frameBorder="0"
                height="100%"
                width="100%"
                title="Internet Explorer"
            />
        </div>
    );
};

export default InternetExplorer;