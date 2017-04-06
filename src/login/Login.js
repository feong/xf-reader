import React, { Component } from 'react';
import './Login.css';
import URLS from '../util/urls';

class Login extends Component {
    render() {
        return (
            <div className="loginPanelBox">
                <img className="willowImg" src={require("../img/willow.jpg")} alt="Willow"/>
                <div className="loginPanel">
                    <h1 className="loginTitle">晓风的阅读器</h1>
                    <img className="loginAvatar" src={this.props.avatarSRC} alt="Avatar"/>
                    <a className="loginButton" href={URLS.LOGIN}>
                        Sign in with Inoreader
                    </a>
                </div>
            </div>
        );
    }
}

export default Login;