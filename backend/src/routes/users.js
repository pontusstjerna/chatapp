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
    socket.on(USER_REGISTER, ({nickname, password}) => {
        console.log('Registering user: ' + nickname);

        User.find({nickname: nickname}).then(user => {
            if (user.length >= 1) {

                socket.emit(ERROR, {
                    status: 403,
                    msg: 'Nickname is already taken'
                });
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        socket.emit(ERROR, {
                            status: 500,
                            msg: err
                        });

                    } else {
                        let user = new User({
                            nickname: nickname,
                            password: hash
                        });
                        user.save().then(result => {
                            console.log(result);
                            socket.emit(USER_REGISTER, {
                                status: 201,
                                message: 'User created successfully',
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            socket.emit(ERROR, {
                                status: 500,
                                msg: err.description,
                            });
                        });
                    }
                });
            }
        });
    });

    socket.on(USER_LOGIN, ({nickname, password}) => {
        console.log('Logging in : ' + nickname);

        User.find({ nickname: nickname })
            .then(user => {
                if (user.length < 1) {
                    socket.emit(ERROR, {
                        status: 403,
                        msg: 'Nickname or password is incorrect.'
                    });
                    return;
                }
                bcrypt.compare(password, user[0].password, (err, result) => {
                    if (err) {
                        socket.emit(ERROR, {
                            status: 401,
                            msg: "Auth failed"
                        });
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
                        socket.emit(USER_LOGIN, {
                            status: 200,
                            msg: "User has logged in.",
                            token: token
                        });
                        return;
                    }
                    socket.emit(ERROR, {
                        status: 401,
                        msg: "Auth failed"
                    });
                    return;
                });
            })
            .catch(err => {
                console.log(err);
                socket.emit(ERROR, {
                    status: 500,
                    msg: err
                });
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
            socket.emit(USER_UPDATE, {
                status: 201,
                message: 'User updated successfully',
            });
          }).catch(err => {
              console.log(err);
              socket.emit(ERROR, {
                  status: 500,
                  msg: err.description,
              });
          });
        } else {
          socket.emit(ERROR, {
              status: 404,
              msg: "user not found",
          });
        }
      });
    });
}
