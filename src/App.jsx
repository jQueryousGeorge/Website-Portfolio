import React, { useState, useCallback } from 'react';
import './App.css';
import Desktop from './components/Desktop/Desktop';
import Taskbar from './components/Taskbar/Taskbar';

function App() {
  // Window management state - simplified structure
  const [openWindows, setOpenWindows] = useState({});
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [nextZIndex, setNextZIndex] = useState(1);

  // Open a new window or focus an existing one
  const handleOpenWindow = useCallback((windowData) => {
    setOpenWindows(prev => {
      // If window already exists, just focus it
      if (prev[windowData.id]) {
        return {
          ...prev,
          [windowData.id]: {
            ...prev[windowData.id],
            isMinimized: false
          }
        };
      }
      
      // Otherwise create a new window
      const newZIndex = nextZIndex;
      setNextZIndex(newZIndex + 1);
      
      return {
        ...prev,
        [windowData.id]: {
          id: windowData.id,
          title: windowData.title,
          contentType: windowData.contentType,
          content: windowData.content,
          contentComponent: windowData.contentComponent,
          position: windowData.defaultPosition || { x: 100, y: 100 },
          width: windowData.width || 400,
          height: windowData.height || 300,
          isMinimized: false,
          zIndex: newZIndex
        }
      };
    });
    
    setActiveWindowId(windowData.id);
  }, [nextZIndex]);

  // Close a window
  const handleCloseWindow = useCallback((windowId) => {
    setOpenWindows(prev => {
      const newWindows = { ...prev };
      delete newWindows[windowId];
      return newWindows;
    });
    
    // If we're closing the active window, set a new active window
    if (activeWindowId === windowId) {
      const remainingWindowIds = Object.keys(openWindows).filter(id => id !== windowId);
      setActiveWindowId(remainingWindowIds.length > 0 ? remainingWindowIds[remainingWindowIds.length - 1] : null);
    }
  }, [activeWindowId, openWindows]);

  // Focus a window (bring to front)
  const handleWindowFocus = useCallback((windowId) => {
    if (activeWindowId === windowId) return;
    
    const newZIndex = nextZIndex;
    setNextZIndex(newZIndex + 1);
    
    setOpenWindows(prev => {
      if (!prev[windowId]) return prev;
      
      return {
        ...prev,
        [windowId]: {
          ...prev[windowId],
          zIndex: newZIndex
        }
      };
    });
    
    setActiveWindowId(windowId);
  }, [activeWindowId, nextZIndex]);

  // Minimize/Restore a window
  const handleMinimizeWindow = useCallback((windowId, isMinimized) => {
    setOpenWindows(prev => {
      if (!prev[windowId]) return prev;
      
      return {
        ...prev,
        [windowId]: {
          ...prev[windowId],
          isMinimized
        }
      };
    });
    
    // If minimizing the active window, find the next window to focus
    if (isMinimized && activeWindowId === windowId) {
      const visibleWindows = Object.entries(openWindows)
        .filter(([id, window]) => id !== windowId && !window.isMinimized)
        .sort((a, b) => b[1].zIndex - a[1].zIndex);
      
      if (visibleWindows.length > 0) {
        setActiveWindowId(visibleWindows[0][0]);
      } else {
        setActiveWindowId(null);
      }
    } else if (!isMinimized) {
      // When restoring, make it active
      handleWindowFocus(windowId);
    }
  }, [activeWindowId, openWindows, handleWindowFocus]);

  return (
    <div className='App'>
      <Desktop
        openWindows={openWindows}
        onOpenWindow={handleOpenWindow}
        onCloseWindow={handleCloseWindow}
        onWindowFocus={handleWindowFocus}
        onMinimizeWindow={handleMinimizeWindow}
        activeWindowId={activeWindowId}
      />
      <Taskbar 
        openWindows={openWindows}
        onOpenWindow={handleOpenWindow}
        onWindowFocus={handleWindowFocus}
        onMinimizeWindow={handleMinimizeWindow}
        activeWindowId={activeWindowId}
      />
    </div>
  );
};

export default App;