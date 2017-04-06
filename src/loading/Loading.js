import React, { Component } from 'react';
import './Loading.css'

class Loading extends Component {
    render() {
        return (
            <div className="loadingBox">
                <img className="loginAvatar" src={require("../img/avatar.jpg")} alt="Avatar"/>
            </div>
        );
    }
}

export default Loading;