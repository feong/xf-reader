import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import InoreaderRequest from 'util/HttpRequest';
import './index.css';

//npm run server && NODE_PATH=./src npm start
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

if(window.location.search) {
  // let state = getURLParameter('state');
  let code = getURLParameter('code');
  InoreaderRequest.requestToken(code, (result)=>{console.log(result)});
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(location.search)||[""])[1].replace(/\+/g, '%20'))||null;
}