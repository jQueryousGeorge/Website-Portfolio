import React, { useState } from 'react';
import './App.css';
import Desktop from './components/Desktop/Desktop';
import Taskbar from './components/Taskbar/Taskbar';

function App() {
  // Window management state for opening desktop apps
  const [openWindows, setOpenWindows] = useState({});
  const [activeWindowId, setActiveWindowId] = useState(null);

  // Function called when an icon is being double-clicked
  const handleOpenWindow = (windowData) => {
    console.log('Opening window:', windowData);

    setOpenWindows(prev => ({
      ...prev,
      [windowData.id]: {
        isOpen: true,
        title: windowData.title,
        contentType: windowData.contentType,
        contentPayload: windowData.contentPayload
      }
    }));
    setActiveWindowId(windowData.id);
  };

  return (
    <div className='App'>
      <Desktop
        onOpenWindow={handleOpenWindow}
        openWindows={openWindows}
      />
      <Taskbar />
    </div>
  );
};

export default App;