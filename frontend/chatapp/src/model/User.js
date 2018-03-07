
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

    isLoggedIn() {
      return this.user !== null
    }
}

export default new User();
