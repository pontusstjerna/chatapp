import User from '../models/user';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    USER_REGISTER,
    USER_LOGIN,
    USER_LOGOUT,
    ERROR,
} from '../socket/events';

const userctrl = require('../controllers/userctrl');
//const checkAuth = require('../middleware/check-auth');

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

    // TODO
}
