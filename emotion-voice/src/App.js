import React from 'react';
import logo from './logo.svg';
import './App.css';
import Voice from './components/Voice'
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MyTabs from './components/MyTabs';


function App() {
  return (
    <div style={{top:'0', bottom:'0', left:'0', right:'0', position: 'absolute', backgroundColor:"#2e1534"}}>
      <MyTabs />
    </div>

);
}

export default App;
