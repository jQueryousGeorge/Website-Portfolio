import React, { useState, useCallback } from 'react';
import './App.css';
import Desktop from './components/Desktop/Desktop';
import Taskbar from './components/Taskbar/Taskbar';


function App() {
  // Window management state
  const [openWindows, setOpenWindows] = useState({});
  const [activeWindowId, setActiveWindowId] = useState(null);


  // Open a new window or focus an existing one
  const handleOpenWindow = useCallback((windowData) => {
    setOpenWindows(prev => {
      const newWindows = { ...prev };
     
      // If window already exists, just focus it
      if (newWindows[windowData.id]) {
        return {
          ...newWindows,
          [windowData.id]: {
            ...newWindows[windowData.id],
            state: {
              ...newWindows[windowData.id].state,
              isMinimized: false
            }
          }
        };
      }
     
      // Otherwise create a new window
      return {
        ...newWindows,
        [windowData.id]: {
          windowData: windowData,
          state: {
            isOpen: true,
            isMinimized: false,
            position: windowData.defaultPosition || { x: 100, y: 100 },
            zIndex: Object.keys(newWindows).length + 1
          }
        }
      };
    });
   
    setActiveWindowId(windowData.id);
  }, []);


  // Close a window
  const handleCloseWindow = useCallback((windowId) => {
    setOpenWindows(prev => {
      const newWindows = { ...prev };
      delete newWindows[windowId];
      return newWindows;
    });
   
    // If we're closing the active window, we need to set a new active window
    if (activeWindowId === windowId) {
      const remainingWindowIds = Object.keys(openWindows).filter(id => id !== windowId);
      setActiveWindowId(remainingWindowIds.length > 0 ? remainingWindowIds[remainingWindowIds.length - 1] : null);
    }
  }, [activeWindowId, openWindows]);


  // Focus a window (bring to front basically)
  const handleWindowFocus = useCallback((windowId) => {
    if (activeWindowId === windowId) return;
   
    setOpenWindows(prev => {
      if (!prev[windowId]) return prev;
     
      return {
        ...prev,
        [windowId]: {
          ...prev[windowId],
          state: {
            ...prev[windowId].state,
            zIndex: Object.keys(prev).length + 1
          }
        }
      };
    });
   
    setActiveWindowId(windowId);
  }, [activeWindowId]);


  // Minimize/Restore a window
  const handleMinimizeWindow = useCallback((windowId, isMinimized) => {
    setOpenWindows(prev => {
      if (!prev[windowId]) return prev;
     
      return {
        ...prev,
        [windowId]: {
          ...prev[windowId],
          state: {
            ...prev[windowId].state,
            isMinimized
          }
        }
      };
    });
   
    // If minimizing the active window, find the next window to focus!
    if (isMinimized && activeWindowId === windowId) {
      const windowIds = Object.keys(openWindows);
      const currentIndex = windowIds.indexOf(windowId);
      const nextIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex + 1;
     
      if (windowIds[nextIndex] && windowIds[nextIndex] !== windowId) {
        setActiveWindowId(windowIds[nextIndex]);
      } else {
        setActiveWindowId(null);
      }
    }
  }, [activeWindowId, openWindows]);


  return (
    <div className='App'>
      <Desktop
        openWindows={openWindows}
        onOpenWindow={handleOpenWindow}
        onCloseWindow={handleCloseWindow}
        onWindowFocus={handleWindowFocus}
        activeWindowId={activeWindowId}
      />
      <Taskbar
        openWindows={openWindows}
        onWindowFocus={handleWindowFocus}
        onMinimizeWindow={handleMinimizeWindow}
        activeWindowId={activeWindowId}
      />
    </div>
  );
};


export default App;