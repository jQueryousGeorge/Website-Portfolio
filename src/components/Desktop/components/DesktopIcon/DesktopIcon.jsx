import './DesktopIcon.scss';

const GenericFileIcon = () => <span className="icon-placeholder">📄</span>; // Simple document emoji

const DesktopIcon = ({ label, imgSrc, onDoubleClick }) => {
    return (
        <div className='desktop-icon' role='button' onDoubleClick={onDoubleClick}>
            <div className="icon-image">
                {imgSrc ? <img src={imgSrc} alt={label || "desktop icon"} /> : <GenericFileIcon />}
            </div>
            <span className="icon-label">{label}</span>
        </div>
    );
};

export default DesktopIcon;