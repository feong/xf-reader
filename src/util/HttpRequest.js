import URLS, {APP_ID, APP_URL, APP_KEY} from './urls';

const CONTENT_TYPE = `Content-type`;
const CONTENT_TYPE_VALUE = `application/x-www-form-urlencoded`;

const HttpRequest = {
    request: new XMLHttpRequest(),
    post(url, body, result) {
        this.request.open('POST', url, true);
        this.request.setRequestHeader(CONTENT_TYPE, CONTENT_TYPE_VALUE);
        this.request.onreadystatechange = ()=> {
            if(this.request.readyState === 4){
                result({state: 200, msg: this.request.responseText});
            }
        };
        this.request.onabort = this.request.onerror = ()=> {
            result({state: 400, msg: null});
        };
        this.request.send(body);
    }
}

const InoreaderRequest = {
    request: HttpRequest,
    requestToken(code, result) {
        const body = `code=${code}&redirect_uri=${APP_URL}&client_id=${APP_ID}&client_secret=${APP_KEY}&scope=&grant_type=authorization_code`;
        this.request.post(URLS.TOKEN, body, result);
    }
}

export default InoreaderRequest;