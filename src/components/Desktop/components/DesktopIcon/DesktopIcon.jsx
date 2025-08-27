import './DesktopIcon.scss';

const DefaultIcon = () => <span className="icon-placeholder">📄</span>; // Simple document emoji

const DesktopIcon = ({ label, imgSrc, onDoubleClick }) => {
    return (
        <div className="desktop-icon" onDoubleClick={onDoubleClick}>
            <div className="icon-image">
                {imgSrc ? <img src={imgSrc} alt={label} /> : <DefaultIcon />}
            </div>
            <span className="icon-label">{label}</span>
        </div>
    );
};

export default DesktopIcon;