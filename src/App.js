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
  }

  return (
    <div className='App'>
      <Desktop />
      <Taskbar />
    </div>
  );
};

export default App;