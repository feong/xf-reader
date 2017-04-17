import React, { Component } from 'react';
import './App.css';

import Loading from './loading/Loading';
import Login from './login/Login';
import Subscriptions from './subscriptions/Subscriptions';
import Titles from './titles/Titles';
import Content from './content/Content';

import InoreaderRequest from './util/InoreaderRequest';
import User from './user/user'

import Articles from './articles/Articles';

class App extends Component {
  subscriptions = [];
  unreadCounts = [];
  state = {status:'init'};
  viewing = null;
  loading = false;
  componentWillMount() {
    const search = this.props.search;
    // User.accessToken = null;
    if(User.accessToken) {
      let now = new Date();
      let expiresDate = User.expiresDate;
      this.setState({status: now > expiresDate ? 'expire' : 'login'});
    } else if(search) {
      this.setState({status: 'auth'});
    }
    // this.setState({status: 'guest'});


    // this.subscriptions = JSON.parse(testSubScriptions).subscriptions;
    // this.subscriptionsUnreadCounts = JSON.parse(testSubScriptionsUnreadCounts).unreadcounts;
    // this.findUnreadCounts(this.subscriptions, this.subscriptionsUnreadCounts);
    // this.setState({status: 'content'});
    // this.contents = JSON.parse(testContents).items;
    // console.log(this.contents);
  }

  componentDidMount() {
    window.addEventListener("resize", this.setStateByWidth.bind(this));
  }

  componentWillUnMount() {
    window.removeEventListener("resize", this.setStateByWidth.bind(this));
  }

  getURLParameter(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(location.search)||[""])[1].replace(/\+/g, '%20'))||null;
  }

  getSubscriptions(callback) {
      Articles.getSubscriptions((json)=>{
          this.setStateByWidth();
          if(callback) callback(true);
        }, (json)=>{
          console.log(json);
          if(callback) callback(false);
      });
  }

  subscriptionClicked(id) {
    this.viewing = 'titles';
    if(Articles.subscriptionsID === id) return;

    Articles.currentArticleID = null;
    Articles.getUnreadArticles((json)=>{
      this.loading = false;
      this.setStateByWidth();
      // this.setState({status:'titles'});
    }, ()=>{}, id);
    // this.setState({status:'loading'});
    this.loading = true;
    this.setStateByWidth();
  }

  clickArticle(article) {
    this.viewing = 'content';
    if(Articles.currentArticleID === article.id) return;

    Articles.currentArticleID = article.id;

    Articles.readArticle(()=>{
        // this.setStateByWidth();
    }, null, article);
    this.setStateByWidth();
  }

  starArticle(article, stared) {
    Articles.starArticle(()=>{
        this.setStateByWidth();
    }, null, article, stared);
    this.setStateByWidth();
  }

  readLoaded() {
    Articles.readLoadedArticles(()=>{
      this.setStateByWidth();
    }, null);
    this.setStateByWidth();
  }

  readSubscriptionArticles() {
    Articles.readSubscriptionArticles(()=>{
      this.setStateByWidth();
    }, null);
    this.setStateByWidth();
  }

  readAllUnreadArticles() {
    Articles.readAllUnreadArticles(()=>{
      this.setStateByWidth();
    }, null);
    this.setStateByWidth();
  }

  exit() {
      User.accessToken = null;
      this.setState({status:'init'});
  }

  setStateByWidth() {
    const width = document.body.clientWidth;
      // this.setState({status:'3-columns'}); return;
    if(width < 1000) {
      if(this.viewing === 'titles') {
          this.setState({status:'1-column-titles'});
      } else if (this.viewing === 'content') {
          this.setState({status:'1-column-content'});
      } else {
          this.setState({status:'1-column-subscriptions'});
      }
    } else {
      this.setState({status:'3-columns'});
    }
  }

  continueLoad() {
    Articles.getContinueArticles(()=>{this.setStateByWidth()}, null);
  }

  render() {
    if(this.state.status === 'init') {
      const defaultAvatarSRC = require("./img/avatar.jpg");
      const avatarSRC = this.props.avatarSRC ? this.props.avatarSRC : defaultAvatarSRC;
      return (
        <Login avatarSRC={avatarSRC}/>
      );
    } else if(this.state.status === '1-column-subscriptions') {
      return (
        <div className="app">
          <Subscriptions subscriptions={Articles.subscriptions}
                         subscriptionClicked={this.subscriptionClicked.bind(this)} 
                         onRefresh={this.getSubscriptions.bind(this)} 
                         onExit={this.exit.bind(this)}
                         onReadAllUnreadArticles={this.readAllUnreadArticles.bind(this)}/>
        </div>
      );
    } else if(this.state.status === '1-column-titles') {
      return (
        <div className="app">
          <Titles contents={Articles.unreadArticles} 
                  clickArticle={this.clickArticle.bind(this)} 
                  onStar={this.starArticle.bind(this)} 
                  onContinueLoad={this.continueLoad.bind(this)} 
                  hasMore={Articles.continueStr !== null}
                  onReadLoaded={this.readLoaded.bind(this)}
                  onReadSubscriptionArticles={this.readSubscriptionArticles.bind(this)}/>
        </div>
      );
    } else if(this.state.status === '1-column-content') {
      return (
        <div className="app">
          <Content content={Articles.currentArticle} onStar={this.starArticle.bind(this)}/>
        </div>
      );
    } else if(this.state.status === '3-columns') {
      return (
        
        <div className="app">
          <Subscriptions subscriptions={Articles.subscriptions}
                         subscriptionClicked={this.subscriptionClicked.bind(this)} 
                         onRefresh={this.getSubscriptions.bind(this)} 
                         onExit={this.exit.bind(this)}
                         onReadAllUnreadArticles={this.readAllUnreadArticles.bind(this)}
                         thin={this.viewing === 'content' && document.body.clientWidth < 1500}/>
          {this.loading && <Loading/>}
          {/* If it is loading, nulls will be return of following components.*/}
          <Titles contents={Articles.unreadArticles} 
                  clickArticle={this.clickArticle.bind(this)} 
                  onStar={this.starArticle.bind(this)} 
                  onContinueLoad={this.continueLoad.bind(this)} 
                  hasMore={Articles.continueStr !== null}
                  onReadLoaded={this.readLoaded.bind(this)}
                  onReadSubscriptionArticles={this.readSubscriptionArticles.bind(this)}/>
          <Content content={Articles.currentArticle} onStar={this.starArticle.bind(this)}/>
        </div>
        
        /*this.loading ? 
        <div className="app">
          <Subscriptions subscriptions={Articles.subscriptions} subscriptionClicked={this.subscriptionClicked.bind(this)}/>
          <Loading/>
        </div>
        :
        <div className="app">
          <Subscriptions subscriptions={Articles.subscriptions} subscriptionClicked={this.subscriptionClicked.bind(this)} thin={this.viewing === 'content' && document.body.clientWidth < 1500}/>
          <Titles contents={Articles.unreadArticles} titleClicked={this.titleClicked.bind(this)} onStar={this.starArticle.bind(this)}/>
          <Content content={Articles.currentArticle}/>
        </div>*/
      );
    } else if(this.state.status === 'auth') {
      const state = this.getURLParameter('state');
      const code = this.getURLParameter('code');
      InoreaderRequest.requestToken(code, (json)=>{
        User.accessToken = json.access_token;
        User.tokenType = json.token_type;
        User.refreshToken = json.refresh_token;
        User.expires = json.expires_in;
        this.setState({status:'login'});
        }, (json)=>{
          console.log(json);
      });
    } else if(this.state.status === 'expire') {
      InoreaderRequest.refreshToken((json)=>{
        User.accessToken = json.access_token;
        User.tokenType = json.token_type;
        User.refreshToken = json.refresh_token;
        User.expires = json.expires_in;
        this.setState({status:'login'});
        }, (json)=>{
          console.log(json);
      });
    } else if(this.state.status === 'login') {
      this.getSubscriptions();
      // Articles.getSubscriptions((json)=>{
      //   this.setStateByWidth();
      //   // console.log(json);
      //   // const firstSub = json.subscriptions[0];
      //   // // const src = require(firstSub.iconUrl);
      //   // const src = require("./img/avatar.jpg");
      //   // const title = firstSub.title;
      //   }, (json)=>{
      //     console.log(json);
      // });
    } else if(this.state.status === 'guest') {
      this.getSubscriptions();
      // Articles.getSubscriptions((json)=>{
      //   this.setStateByWidth();
      //   // this.setState({status:'subscriptions'});
      // }, ()=>{

      // });
    } 
    return (
      <Loading/>
    );
    
  }

}

export default App;
