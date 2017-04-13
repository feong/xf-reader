class User {
    set accessToken(value) {
        localStorage.accessToken = value;
    }
    get accessToken() {
        return localStorage.accessToken;
    }

    set tokenType(value) {
        localStorage.tokenType = value;
    }
    get tokenType() {
        return localStorage.tokenType;
    }

    set refreshToken(value) {
        localStorage.refreshToken = value;
    }
    get refreshToken() {
        return localStorage.refreshToken;
    }

    set expires(value) {
        let now = new Date();
        localStorage.expiresDate = now.setHours(now.getHours() + 1);
    }
    // get expires() {
    //     return this.expiresDate;
    // }
    get expiresDate() {
        return localStorage.expiresDate;
    }

    logout() {
        localStorage.accessToken = null;
    }
}

const user = new User();
export default user;