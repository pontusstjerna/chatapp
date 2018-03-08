import * as socket from '../data/socket'

class User {
    constructor() {
        this._type = 'User';
        this.userId = null;
        this.email = "";
        this.nickname = "Anonymous";
        this.about = "";
        this.token = null;
    }

    login(nickname, password) {
        console.log("User.login");
        return socket.loginUser({nickname: nickname, password: password})
        .then((res) => {
            //if succesful
            this.email = res.email;
            this.nickname = res.nickname;
            this.about = res.about;
            this.token = res.token;
            this.userId = res.userId;
            console.log("User logged in");
        })
    }

    logout() {
        this.userId = null;
        this.email = "";
        this.nickname = "Anonymous";
        this.about = "";
        this.token = null;
    }

    update(user) {
      console.log("User.update");
      return socket.updateUser(user)
        .then((res) => {
          //if succesful
          this.email = user.email;
          this.nickname = user.nickname;
          this.about = user.about;
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
