import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
    render() {
        return (
            <div className="loginPanel">
                <h1>晓风的阅读器</h1>
                <img className="loginAvatar" src={this.props.avatarSRC} alt="Avatar"/>
                <div className="loginButton">
                    Login with Inoreader
                </div>
            </div>
        );
    }
}

export default Login;