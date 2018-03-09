import User from '../models/user';
import AnonUser from '../models/anonuser';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    USER_REGISTER,
    USER_LOGIN,
    USER_LOGOUT,
    USER_UPDATE,
    USER_INFO,
    ANON_CREATE,
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
                            email: uf.email,
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
                                email: user[0].email,
                                nickname: user[0].nickname,
                                about: user[0].about,
                                userId: user[0]._id,
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

    socket.on(USER_UPDATE, ({token, id, email, nickname, about}) => {
        console.log('Updating : ' + nickname);
        try {
            // check that token is valid and that it has the same id as the user to be updated.
            let decoded = jwt.verify(token, JWT_KEY);
            console.log("DECODED:", decoded);
            if (decoded.userId != id) {
                let error = { success: false, data: null, error: "Not Authorized" };
                socket.emit(USER_UPDATE, JSON.stringify(error));
                return;
            }
        } catch (err) {
            let error = { success: false, data: null, error: err };
            socket.emit(USER_UPDATE, JSON.stringify(error));
            return;
        }

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
                            email: email,
                            nickname: nickname,
                            about: about,
                        },
                        error: null
                    }
                    socket.emit(USER_UPDATE, JSON.stringify(response));
                    return;
                }).catch(err => {
                    console.log(err);
                    let error = {
                        success: false,
                        data: null,
                        error: "Update failed"
                    };
                    socket.emit(USER_UPDATE, JSON.stringify(error));
                    return;
                });
            } else {
                let error = {
                    success: false,
                    data: null,
                    error: "Update failed"
                };
                socket.emit(USER_UPDATE, JSON.stringify(error));
                return;
            }
        });
    });

    socket.on(USER_INFO, (userId) => {
        User.findOne({_id: userId}).then(user => {
            if(user) {
              socket.emit(USER_INFO, JSON.stringify({
                success: true,
                data: {
                  nickname: user.nickname,
                  about: user.about
                }
              }));
            } else {
              let anonymousUser = {
                  success: true,
                  data: {
                      nickname: 'Anonymous',
                      about: "You don't me",
                  },
              };
              socket.emit(USER_INFO, JSON.stringify(anonymousUser));
            }
        }).catch(err => {
          console.log('ARGH');
          let error = {
              success: false,
              data: null,
              error: "User info fetch failed"
          };
          socket.emit(USER_INFO, JSON.stringify(error));
        });
    });

    socket.on(ANON_CREATE, (name) => {
        let anonName = JSON.parse(name);
        console.log('Creating AnonUser: ', anonName);

        let newAnon = new AnonUser({nickname: anonName});
        newAnon.save()
        .then(result => {
            console.log("Saved AnonUser:", result);
            socket.emit(ANON_CREATE, JSON.stringify({
                success: true,
                data: newAnon,
                error: null
            }));
        })
        .catch(err => {
            console.log(err);
            let error = { success: false, data: null, error: err };
            socket.emit(ANON_CREATE, JSON.stringify(error));
        });

    });
}
