import React, { Component } from 'react';
import './App.css';
import Login from './login/Login';

class App extends Component {
  render() {
    const defaultAvatarSRC = require("./img/avatar.jpg");
    const avatarSRC = this.props.avatarSRC ? this.props.avatarSRC : defaultAvatarSRC;
    return (
      <div className="App">
        <Login avatarSRC={avatarSRC}/>
      </div>
    );
  }
}

export default App;
