import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import InoreaderRequest from 'util/InoreaderRequest';
import User from 'user/user'
import './index.css';

//npm run server && NODE_PATH=./src npm start
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

if(window.location.search) {
  // let state = getURLParameter('state');
  let code = getURLParameter('code');

  InoreaderRequest.requestToken(code, (json)=>{
    User.accessToken = json.access_token;
    User.tokenType = json.token_type;
    User.refreshToken = json.refresh_token;
    User.expires = json.expires_in;
    InoreaderRequest.getUserInfo((json)=>{
      console.log(json);
    }, (json)=>{
      console.log(json);
    }
      
    );
  }, (json)=>{
    console.log(json);
  });

}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(location.search)||[""])[1].replace(/\+/g, '%20'))||null;
}