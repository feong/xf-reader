import React, { Component } from 'react';
import './App.css';

import Loading from './loading/Loading';
import Login from './login/Login';
import Subscriptions from './subscriptions/Subscriptions';
import Titles from './Titles/Titles';
import Content from './Content/Content';

import InoreaderRequest from './util/InoreaderRequest';
import User from './user/user'

import Articles from './Articles/Articles';

class App extends Component {
  subscriptions = []
  unreadCounts = []
  state = {status:'init'}

  componentWillMount() {
    const search = this.props.search;
    if(User.accessToken) {
      let now = new Date();
      let expiresDate = User.expiresDate;
      this.setState({status: now > expiresDate ? 'expire' : 'login'});
    } else if(search) {
      this.setState({status: 'auth'});
    }

    // this.subscriptions = JSON.parse(testSubScriptions).subscriptions;
    // this.subscriptionsUnreadCounts = JSON.parse(testSubScriptionsUnreadCounts).unreadcounts;
    // this.findUnreadCounts(this.subscriptions, this.subscriptionsUnreadCounts);
    this.setState({status: 'guest'});
    // this.setState({status: 'content'});
    // this.contents = JSON.parse(testContents).items;
    // console.log(this.contents);
  }

  getURLParameter(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(location.search)||[""])[1].replace(/\+/g, '%20'))||null;
  }

  titleClicked(id) {
    Articles.currentArticle = id;
    this.setState({status:'content'});
  }

  subscriptionClicked(id) {
    Articles.getUnreadArticles((json)=>{
      this.setState({status:'titles'});
    }, ()=>{}, id);
    this.setState({status:'loading'});
  }

  render() {

    if(this.state.status === 'init') {
      const defaultAvatarSRC = require("./img/avatar.jpg");
      const avatarSRC = this.props.avatarSRC ? this.props.avatarSRC : defaultAvatarSRC;
      return (
        <div className="app">
          <Login avatarSRC={avatarSRC}/>
        </div>
      );
    } else if(this.state.status === 'content') {
      return (
        <div className="app">
          <Content content={Articles.currentArticle}/>
        </div>
      );
    } else if(this.state.status === 'titles') {
      return (
        <div className="app">
          <Titles contents={Articles.unreadArticles} titleClicked={this.titleClicked.bind(this)}/>
        </div>
      );
    } else if(this.state.status === 'subscriptions') {
      return (
        <div className="app">
          <Subscriptions subscriptions={Articles.subscriptions} subscriptionClicked={this.subscriptionClicked.bind(this)}/>
        </div>
      );
    } else if(this.state.status === 'auth') {
      const state = this.getURLParameter('state');
      const code = this.getURLParameter('code');
      InoreaderRequest.requestToken(code, (json)=>{
        User.accessToken = json.access_token;
        User.tokenType = json.token_type;
        User.refreshToken = json.refresh_token;
        User.expires = json.expires_in;
        this.setState('login');
        }, (json)=>{
          console.log(json);
      });
    } else if(this.state.status === 'expire') {
      InoreaderRequest.refreshToken((json)=>{
        User.accessToken = json.access_token;
        User.tokenType = json.token_type;
        User.refreshToken = json.refresh_token;
        User.expires = json.expires_in;
        this.setState('login');
        }, (json)=>{
          console.log(json);
      });
    } else if(this.state.status === 'login') {
      InoreaderRequest.getSubscriptions((json)=>{
        console.log(json);
        const firstSub = json.subscriptions[0];
        // const src = require(firstSub.iconUrl);
        const src = require("./img/avatar.jpg");
        const title = firstSub.title;
        }, (json)=>{
          console.log(json);
      });
    } else if(this.state.status === 'guest') {
      Articles.getSubscriptions((json)=>{
        this.setState({status:'subscriptions'});
      }, ()=>{

      });
    } 
    return (
      <div className="app">
        <Loading/>
      </div>
    );


    let isLogin = false;
    const search = this.props.search;
    if(User.accessToken) {
      let now = new Date();
      let expiresDate = User.expiresDate;
      if(now > expiresDate) {
        // Fresh Token
        InoreaderRequest.refreshToken((json)=>{
        User.accessToken = json.access_token;
        User.tokenType = json.token_type;
        User.refreshToken = json.refresh_token;
        User.expires = json.expires_in;
        isLogin = true;
        }, (json)=>{
          console.log(json);
        });
      } else {
        isLogin = true;
      }
    } else if(search) {
      // let state = getURLParameter('state');
      let code = this.getURLParameter('code');

      InoreaderRequest.requestToken(code, (json)=>{
        User.accessToken = json.access_token;
        User.tokenType = json.token_type;
        User.refreshToken = json.refresh_token;
        User.expires = json.expires_in;
        isLogin = true;
      }, (json)=>{
        console.log(json);
      });
    }

    if(isLogin) {
      return (
        <div className="App">
          <Loading/>
        </div>
      );
      InoreaderRequest.getSubscriptions((json)=>{
        console.log(json);
        const firstSub = json.subscriptions[0];
        // const src = require(firstSub.iconUrl);
        const src = require("./img/avatar.jpg");
        const title = firstSub.title;
        return (
          <div className="App">
            <Subscriptions src={src} title={title}/>
          </div>
        );
      }, (json)=>{
        console.log(json);
      });
    } else {
      const defaultAvatarSRC = require("./img/avatar.jpg");
      const avatarSRC = this.props.avatarSRC ? this.props.avatarSRC : defaultAvatarSRC;

      return (
        <div className="App">
          <Login avatarSRC={avatarSRC}/>
        </div>
      );
    }
    
  }
}

export default App;
