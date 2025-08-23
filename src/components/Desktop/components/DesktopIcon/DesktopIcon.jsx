import './DesktopIcon.scss';

const DefaultIcon = () => <span className="icon-placeholder">📄</span>; // Simple document emoji

const DesktopIcon = ({ label, onDoubleClick }) => {
    return (
        <div className="desktop-icon" onDoubleClick={onDoubleClick}>
            <div className="icon-image">
                {/* In future, this could be <img src={icon} alt={label} /> */}
                <DefaultIcon />
            </div>
            <span className="icon-label">{label}</span>
        </div>
    );
};

export default DesktopIcon;