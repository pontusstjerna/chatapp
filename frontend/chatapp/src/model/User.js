import * as socket from '../data/socket'
const shortid = require('shortid');

class User {
    constructor() {
        this._type = 'User';
        this.userId = null;
        this.email = "";
        this.nickname = "Anonymous(" + shortid.generate() + ")";
        this.about = "";
        this.token = null;
    }

    login(nickname, password) {
        return socket.loginUser({nickname: nickname, password: password})
        .then((res) => {
            //if succesful
            this.email = res.email;
            this.nickname = res.nickname;
            this.about = res.about;
            this.token = res.token;
            this.userId = res.userId;
            console.log("[" + this.nickname + "] logged in");
        })
    }

    logout() {
        this.userId = null;
        this.email = "";
        this.nickname = "Anonymous(" + shortid.generate() + ")";
        this.about = "";
        this.token = null;
    }

    updateSettings(userform) {
        console.log("User.update:", userform);
        userform.token = this.token;
        userform.id = this.userId;
        return socket.updateUser(userform)
        .then((updated) => {
            //if succesful
            this.email = updated.email;
            this.nickname = updated.nickname;
            this.about = updated.about;
        })
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

    getUserAbout(){
        return this.about;
    }

    getUserEmail(){
        return this.email;
    }
}

export default new User();
