
class User {
    constructor() {
        this._type = 'User';
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

export default new User();
