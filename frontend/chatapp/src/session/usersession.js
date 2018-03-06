
class UserSession {
    constructor() {
        this._type = 'UserSession';
        this.user = null;
        this.token = null;
    }

    login(user) {
        this.user = user;
    }

    logout() {
        this.user = null;
    }

    getUser(){
        return this.user;
    }
}

export default new UserSession();
