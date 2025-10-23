import React, { useMemo, useState } from 'react';
import './WindowsExplorer.scss';
import folderIcon from '../../../assets/icons/my_computer.ico'; // temporary folder-like icon
import { initialDesktopIcons } from '../../../config/desktopIcons';

const ROOT_LABEL = 'C:\\Windows\\Users\\Tyler_Portfolio\\Desktop';

// Build a simple virtual Desktop tree from existing desktop icons as shortcuts
function useDesktopTree() {
    return useMemo(() => {
        const shortcuts = initialDesktopIcons.map(icon => ({
            id: icon.id,
            type: 'shortcut',
            name: icon.label,
            targetWindowId: icon.windowId,
            targetIcon: icon.image,
            width: icon.width,
            height: icon.height,
            defaultPosition: icon.defaultPosition,
            contentType: icon.contentType,
            content: icon.content,
            contentComponent: icon.contentComponent
        }));

        return {
            type: 'folder',
            name: 'Desktop',
            children: shortcuts
        };
    }, []);
}

const WindowsExplorer = ({ onOpenWindow }) => {
    const root = useDesktopTree();
    const [path, setPath] = useState([]); // array of folder names beneath Desktop (we only have root for now)

    const currentFolder = root; // only root exists for now

    const pathString = useMemo(() => {
        const suffix = path.length ? '\\' + path.join('\\') : '';
        return `${ROOT_LABEL}${suffix}`;
    }, [path]);

    const handleOpen = (entry) => {
        if (entry.type === 'folder') {
            setPath(prev => [...prev, entry.name]);
            return;
        }
        if (entry.type === 'shortcut' && onOpenWindow) {
            onOpenWindow({
                id: entry.targetWindowId,
                title: entry.name,
                icon: entry.targetIcon,
                contentType: entry.contentType,
                content: entry.content,
                contentComponent: entry.contentComponent,
                defaultPosition: entry.defaultPosition,
                width: entry.width,
                height: entry.height
            });
        }
    };

    const goUp = () => {
        setPath(prev => prev.length ? prev.slice(0, -1) : prev);
    };

    return (
        <div className="explorer-container">
            <div className="explorer-toolbar">
                <button className="win95-button" onClick={goUp} disabled={path.length === 0}>Up</button>
                <div className="explorer-path">{pathString}</div>
            </div>

            <div className="explorer-list">
                {currentFolder.children.map((entry) => (
                    <div
                        key={entry.id || entry.name}
                        className="explorer-item"
                        onDoubleClick={() => handleOpen(entry)}
                        title={entry.name}
                    >
                        <div className="icon-wrap">
                            {entry.type === 'folder' ? (
                                <img src={folderIcon} alt="folder" />
                            ) : (
                                entry.targetIcon ? <img src={entry.targetIcon} alt="icon" /> : <span>📄</span>
                            )}
                        </div>
                        <div className="item-label">{entry.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WindowsExplorer;


