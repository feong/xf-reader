import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import InoreaderRequest from './util/InoreaderRequest';
// import User from './user/user'
import './index.css';

//npm run server && NODE_PATH=./src npm start
//npm run server && npm start
//xiaofengreader@xiaofengreader.com -> 123qwe
ReactDOM.render(
  <App search={window.location.search}/>,
  document.getElementById('root')
);



/*
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

    // InoreaderRequest.getSubscriptions((json)=>{
    //   console.log(json);
    // }, (json)=>{
    //   console.log(json);
    // });

    // InoreaderRequest.getUnreadCounters((json)=>{
    //   console.log(json);
    // }, (json)=>{
    //   console.log(json);
    // });


    
    }, (json)=>{
      console.log(json);
    });
  } else {
    // Get Info
    InoreaderRequest.getSubscriptions((json)=>{
      console.log(json);
    }, (json)=>{
      console.log(json);
    });

    // const id = `feed/http://feeds2.feedburner.com/cnbeta-full`;
    // const id = `feed%2fhttp%3a%2f%2ffeeds2.feedburner.com%2fcnbeta-full`;
    // const id = `feed/http://feeds.feedburner.com/solidot`;
    // const id = `feed%2fhttp%3a%2f%2ffeeds.feedburner.com%2fsolidot`;
    // const id = `feed%2Fhttp%3A%2F%2Ffeeds.arstechnica.com%2Farstechnica%2Fscience1`;
    // InoreaderRequest.getUnreadArticles((json)=>{
    //   console.log(json);
    // }, (json)=>{
    //   console.log(json);
    // }, id);

    // InoreaderRequest.getStarArticles((json)=>{
    //   console.log(json);
    // }, (json)=>{
    //   console.log(json);
    // });


    // InoreaderRequest.getUnreadArticles((json)=>{
    //   console.log(json);
    // }, (json)=>{
    //   console.log(json);
    // });

    // InoreaderRequest.test((json)=>{
    //   console.log(json);
    // }, (json)=>{
    //   console.log(json);
    // }, id);
  }
} else if(window.location.search) {
  // let state = getURLParameter('state');
  let code = getURLParameter('code');

  InoreaderRequest.requestToken(code, (json)=>{
    User.accessToken = json.access_token;
    User.tokenType = json.token_type;
    User.refreshToken = json.refresh_token;
    User.expires = json.expires_in;
    // InoreaderRequest.getUserInfo((json)=>{
    //   console.log(json);
    // }, (json)=>{
    //   console.log(json);
    // });
    // InoreaderRequest.getUnreadCounters((json)=>{
    //   console.log(json);
    // }, (json)=>{
    //   console.log(json);
    // });
  }, (json)=>{
    console.log(json);
  });

}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(location.search)||[""])[1].replace(/\+/g, '%20'))||null;
}*/