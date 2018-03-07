import User from '../models/user';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    USER_REGISTER,
    USER_LOGIN,
    USER_LOGOUT,
    USER_UPDATE,
    ERROR,
} from '../socket/events';

//placeholder
const JWT_KEY = "somesecrethere";

export default (socket) => {
    socket.on(USER_REGISTER, (userform) => {
        let uf = JSON.parse(userform);
        console.log('Registering user: ', uf.nickname);

        User.find({nickname: uf.nickname}).then(user => {
            if (user.length >= 1) {
                let error = { success: false, data: null, error: "Nickname is already taken" };
                socket.emit(USER_REGISTER, JSON.stringify(error));
            } else {
                bcrypt.hash(uf.password, 10, (err, hash) => {
                    if (err) {
                        let error = { success: false, data: null, error: err };
                        socket.emit(USER_REGISTER, JSON.stringify(error));

                    } else {
                        let newUser = new User({
                            nickname: uf.nickname,
                            password: hash
                        });
                        newUser.save().then(result => {
                            console.log("Saved User:", result);
                            newUser.password = undefined;
                            socket.emit(USER_REGISTER, JSON.stringify({
                                success: true,
                                data: newUser,
                                error: null
                            }));
                        })
                        .catch(err => {
                            console.log(err);
                            let error = { success: false, data: null, error: err };
                            socket.emit(USER_REGISTER, JSON.stringify(error));
                        });
                    }
                });
            }
        });
    });

    socket.on(USER_LOGIN, (loginForm) => {
        let lf = JSON.parse(loginForm);
        console.log('Logging in : ' + lf.nickname);

        User.find({ nickname: lf.nickname })
            .then(user => {
                if (user.length < 1) {
                    let error = { success: false, data: null, error: "Nickname or password is incorrect"};
                    socket.emit(USER_LOGIN, JSON.stringify(error));
                    return;
                }
                bcrypt.compare(lf.password, user[0].password, (err, result) => {
                    if (err) {
                        let error = { success: false, data: null, error: "Authentication  failed"};
                        socket.emit(USER_LOGIN, JSON.stringify(error));
                        return;
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                nickname: user[0].nickname,
                                userId: user[0]._id
                            },
                            //process.env.JWT_KEY,
                            JWT_KEY,
                            {
                                expiresIn: "1h"
                            }
                        );
                        let response = {
                            success: true,
                            data: {
                                msg: "User has logged in.",
                                token: token
                            },
                            error: null
                        };
                        socket.emit(USER_LOGIN, JSON.stringify(response));
                        return;
                    }
                    let error = { success: false, data: null, error: "Auth failed" };
                    socket.emit(USER_LOGIN, JSON.stringify(error));
                    return;
                });
            })
            .catch(err => {
                console.log(err);
                let error = { success: false, data: null, error: "Auth failed" };
                socket.emit(USER_LOGIN, JSON.stringify(error));
            });
    });

    socket.on(USER_UPDATE, ({email, nickname, about}) => {
      console.log('Updating : ' + nickname);
      User.findOne({ email: email }).then(user => {
        console.log(JSON.stringify(user));
        if (user) {
          user.email = email;
          user.nickname = nickname;
          user.about = about;
          user.save().then(result => {
            console.log(result);
            let response = {
              success: true,
              data: {
                  msg: "User has been updated.",
              },
              error: null
            }
            socket.emit(USER_UPDATE, JSON.stringify(response));
          }).catch(err => {
              console.log(err);
              let error = {
                success: false,
                data: null,
                error: "Update failed"
              };
              socket.emit(USER_LOGIN, JSON.stringify(error));
          });
        } else {
          let error = {
            success: false,
            data: null,
            error: "Update failed"
          };
          socket.emit(USER_LOGIN, JSON.stringify(error));
        }
      });
    });
}
