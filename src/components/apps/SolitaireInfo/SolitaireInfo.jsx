import React from 'react';
import './SolitaireInfo.scss';
import solitaireIcon from '../../../assets/icons/solitaire.ico';

const STORE_URL = 'https://apps.microsoft.com/detail/9p6msr2dzxb2?hl=en-US&gl=US';

const SolitaireInfo = () => {
    return (
        <div className="solitaire-info">
            <div className="solitaire-header">
                <img className="solitaire-icon" src={solitaireIcon} alt="Solitaire '95" />
                <div className="solitaire-title">Solitaire '95</div>
            </div>
            <div className="solitaire-body">
                <p>
                    You can download the classic Windows 95 version of Solitaire from the Microsoft Store.
                </p>
                <p>
                    Use the button below to open the store page.
                </p>
            </div>
            <div className="solitaire-actions">
                <a
                    href={STORE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="win95-button"
                >
                    Open in Microsoft Store
                </a>
            </div>
        </div>
    );
};

export default SolitaireInfo;


