import URLS, {APP_ID, APP_URL, APP_KEY} from './urls';
import User from 'user/user';

const CONTENT_TYPE = `Content-type`;
const AUTHORIZATION = `Authorization`;
const CONTENT_TYPE_VALUE = `application/x-www-form-urlencoded`;

const HttpRequest = {
    request: new XMLHttpRequest(),
    post(url, body, success, fail) {
        this.request.open('POST', url, true);
        this.request.setRequestHeader(CONTENT_TYPE, CONTENT_TYPE_VALUE);
        if(url !== URLS.TOKEN && User) {
            this.request.setRequestHeader(AUTHORIZATION, `${User.tokenType} ${User.accessToken}`);
        }
        this.request.onreadystatechange = ()=> {
            if(this.request.readyState === 4){
                let json = JSON.parse(this.request.responseText);
                if(this.request.status === 200 && !json.error) {
                    success(json);
                } else {
                    fail(json);
                }
            }
        };
        this.request.onabort = this.request.onerror = ()=> {
            let json = JSON.parse(this.request.responseText);
            fail(json);
        };
        this.request.send(body);
    },

    get(url, success, fail) {
        this.request.open('POST', url, true);
        this.request.setRequestHeader(AUTHORIZATION, `${User.tokenType} ${User.accessToken}`);
        this.request.onreadystatechange = ()=> {
            if(this.request.readyState === 4){
                let json = JSON.parse(this.request.responseText);
                if(this.request.state === 200 && !json.error) {
                    success(json);
                } else {
                    fail(json);
                }
            }
        };
        this.request.onabort = this.request.onerror = ()=> {
            let json = JSON.parse(this.request.responseText);
            fail(json);
        };
        this.request.send();
    }
}

const InoreaderRequest = {
    request: HttpRequest,
    requestToken(code, success, fail) {
        const body = `code=${code}&redirect_uri=${APP_URL}&client_id=${APP_ID}&client_secret=${APP_KEY}&scope=&grant_type=authorization_code`;
        this.request.post(URLS.TOKEN, body, success, fail);
    },

    getUserInfo(success, fail) {
        this.request.get(URLS.USERINFO, success, fail);
    }
}

export default InoreaderRequest;