import logo from './logo.svg';
import './App.css';
import FolderDrag from './FolderDrag';
import DragFolder from './DragFolder';
import React, { Component }  from 'react';


function App() {
  return (
    <div className="App">
     <FolderDrag/>
     {/* <DragFolder/> */}
    </div>
  );
}

export default App;
