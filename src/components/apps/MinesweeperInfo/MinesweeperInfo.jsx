import React from 'react';
import './MinesweeperInfo.scss';
import minesweeperIcon from '../../../assets/icons/minesweeper.ico';

const STORE_URL = 'https://apps.microsoft.com/detail/9nrghq5h1s1n?hl=en-US&gl=US';

const MinesweeperInfo = () => {
    return (
        <div className="ms-info">
            <div className="ms-header">
                <img className="ms-icon" src={minesweeperIcon} alt="Minesweeper" />
                <div className="ms-title">Minesweeper</div>
            </div>
            <div className="ms-body">
                <p>
                    Get the classic Minesweeper experience from the Microsoft Store.
                </p>
                <p>
                    Use the button below to open the store page in a new tab.
                </p>
            </div>
            <div className="ms-actions">
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

export default MinesweeperInfo;


