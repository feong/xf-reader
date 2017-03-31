import React, { Component } from 'react';
import './Login.css';
import URLS from 'util/urls';

class Login extends Component {
    render() {
        return (
            <div className="loginPanel">
                <h1>晓风的阅读器</h1>
                <img className="loginAvatar" src={this.props.avatarSRC} alt="Avatar"/>
                <a className="loginButton" href={URLS.LOGIN}>
                    Sign in with Inoreader
                </a>
            </div>
        );
    }
}

export default Login;