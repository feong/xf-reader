import URLS, {APP_ID, APP_URL, APP_KEY, READ_TAG} from './urls';
import User from '../user/user';

const CONTENT_TYPE = `Content-type`;
const AUTHORIZATION = `Authorization`;
const CONTENT_TYPE_VALUE = `application/x-www-form-urlencoded`;

const HttpRequest = {
    post(url, body, success, fail) {
        let request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader(CONTENT_TYPE, CONTENT_TYPE_VALUE);
        if(url !== URLS.TOKEN && User) {
            request.setRequestHeader(AUTHORIZATION, `${User.tokenType} ${User.accessToken}`);
        }
        request.onreadystatechange = ()=> {
            if(request.readyState === 4){
                let json = JSON.parse(request.responseText);
                if(request.status === 200 && !json.error) {
                    success(json);
                } else {
                    fail(json);
                }
            }
        };
        request.onabort = request.onerror = ()=> {
            let json = JSON.parse(request.responseText);
            fail(json);
        };
        request.send(body);
    },

    get(url, success, fail) {
        let request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader(AUTHORIZATION, `${User.tokenType} ${User.accessToken}`);
        request.onreadystatechange = ()=> {
            if(request.readyState === 4){
                if(!request.responseText) {
                    if(fail) fail(request.responseText);
                    return;
                } else if(request.responseText === 'OK') {
                    if(success) success(request.responseText);
                    return;
                }
                // TODO try catch?
                let json = JSON.parse(request.responseText);
                if(request.status === 200 && !json.error) {
                    if(success) success(json);
                } else {
                    if(fail) fail(json);
                }
            }
        };
        request.onabort = request.onerror = ()=> {
            // May be return twice
            if(!request.responseText) {
                if(fail) fail(request.responseText);
                return;
            }
            let json = JSON.parse(request.responseText);
            if(fail) fail(json);
        };
        request.send();
    }

}

const InoreaderRequest = {
    request: HttpRequest,
    requestDependOnRefreshToken(success, fail) {
        const expiresDate = User.expiresDate;
        const now = new Date();
        if(now > expiresDate) {
            this.refreshToken((json)=>{
                User.accessToken = json.access_token;
                User.tokenType = json.token_type;
                User.refreshToken = json.refresh_token;
                User.expires = json.expires_in;
                if(success) success();
            }, fail);
        } else {
            if(success) success();
        }
    },

    requestToken(code, success, fail) {
        const body = `code=${code}&redirect_uri=${APP_URL}&client_id=${APP_ID}&client_secret=${APP_KEY}&scope=&grant_type=authorization_code`;
        this.request.post(URLS.TOKEN, body, success, fail);
    },

    refreshToken(success, fail) {
        const body = `client_id=${APP_ID}&client_secret=${APP_KEY}&grant_type=refresh_token&refresh_token=${User.refreshToken}`;
        this.request.post(URLS.TOKEN, body, success, fail);
    },

    getUserInfo(success, fail) {
        const callback = ()=> this.request.get(URLS.USERINFO, success, fail);
        this.requestDependOnRefreshToken(callback, fail);
    },

    getUnreadCounters(success, fail) {
        const callback = ()=> this.request.get(URLS.UNREADERCOUNTERS, success, fail);
        this.requestDependOnRefreshToken(callback, fail);
    },

    getSubscriptions(success, fail) {
        const callback = ()=> this.request.get(URLS.SUBSCRIPTIONS, success, fail);
        this.requestDependOnRefreshToken(callback, fail);
    },

    getUnreadArticles(success, fail, id) {
        const url = id ? `${URLS.ARTICLES}/${id}?&xt=${READ_TAG}` : `${URLS.ARTICLES}/&xt=${READ_TAG}`;
        const callback = ()=> this.request.get(url, success, fail);
        this.requestDependOnRefreshToken(callback, fail);
    },

    getArticles(success, fail, id) {
        const url = id ? `${URLS.ARTICLES}/${id}` : `${URLS.ARTICLES}`;
        const callback = ()=> this.request.get(url, success, fail);
        this.requestDependOnRefreshToken(callback, fail);
    },

    addStar(success, fail, id) {
        const url = `${URLS.ADD_STAR}&i=${id}`;
        const callback = ()=> this.request.get(url, success, fail);
        this.requestDependOnRefreshToken(callback, fail);
    },

    removeStar(success, fail, id) {
        const url = `${URLS.REMOVE_STAR}&i=${id}`;
        const callback = ()=> this.request.get(url, success, fail);
        this.requestDependOnRefreshToken(callback, fail);
    },

    read(success, fail, id) {
        const url = `${URLS.READ}&i=${id}`;
        const callback = ()=> this.request.get(url, success, fail);
        this.requestDependOnRefreshToken(callback, fail);
    },

    readMultiplies(success, fail, ids) {
        const url = `${URLS.READ}${ids}`;
        const callback = ()=> this.request.get(url, success, fail);
        this.requestDependOnRefreshToken(callback, fail);
    },

    readAll(success, fail, id, ts) {
        const url = ts ? `${URLS.READ_ALL}?&s=${id}&ts=${ts}` : `${URLS.READ_ALL}?&s=${id}`;
        const callback = ()=> this.request.get(url, success, fail);
        this.requestDependOnRefreshToken(callback, fail);
    },

    getStarArticles(success, fail) {
        const url = `${URLS.ARTICLES}/user/-/state/com.google/starred`;
        const callback = ()=> this.request.get(url, success, fail);
        this.requestDependOnRefreshToken(callback, fail);
    },

    continueLoad(success, fail, id, continueStr) {
        const url = `${URLS.ARTICLES}/${id}?&xt=${READ_TAG}&c=${continueStr}`;
        const callback = ()=> this.request.get(url, success, fail);
        this.requestDependOnRefreshToken(callback, fail);
    },

    test(success, fail) {
        // const url = `${URLS.ARTICLES}/feed%2Fhttp%3A%2F%2Ffeeds.arstechnica.com%2Farstechnica%2Fscience1`;
        const url = `${URLS.ARTICLES}/feed/http://feeds.feedburner.com/solidot?&xt=user/-/state/com.google/read`;
        // const url = `${URLS.ARTICLES}/feed%2fhttp%3a%2f%2ffeeds.feedburner.com%2fsolidot&xt=user/-/state/com.google/read`;
        const callback = ()=> this.request.get(url, success, fail);
        this.requestDependOnRefreshToken(callback, fail);
    }
}

export default InoreaderRequest;