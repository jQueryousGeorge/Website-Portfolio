import React, { useState } from 'react';
import './App.css';
import Desktop from './components/Desktop/Desktop';
import Taskbar from './components/Taskbar/Taskbar';

function App() {
  return (
    <div className='App'>
      <Desktop />
      <Taskbar />
    </div>
  );
};

export default App;