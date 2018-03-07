import * as socket from '../data/socket'

class User {
    constructor() {
        this._type = 'User';
        this.userId = null;
        this.nickname = "Anonymous";
        this.token = null;
    }

    login(nickname, password) {
        console.log("User.login");
        return socket.loginUser({nickname: nickname, password: password})
        .then((res) => {
            //if succesful
            this.nickname = res.nickname;
            this.token = res.token;
            this.userId = res.userId;
            console.log("User logged in");
        })
    }

    logout() {
        this.userId = null;
        this.nickname = "Anonymous";
        this.token = null;
    }

    isLoggedIn() {
        return !!this.token;
    }

    getNickname(){
        return this.nickname;
    }

    getUserId(){
        return this.userId;
    }
}

export default new User();
