class User {
    set expires(value) {
        let now = new Date();
        this.expiresDate = now.setHours(now.getHours() + 1);
    }
}

const user = new User();
export default user;