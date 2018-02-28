import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../models/user';


export function userRegister(req, res, next) {
    User.find({nickname: req.body.nickname})
        .then(user => {
            if (user.length >= 1) {
                return res.status(403).json({
                    message: "Nickname is already taken"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status.(500).json({
                            error: err
                        })
                    } else {
                        let user = new User({
                            nickname: req.body.nickname,
                            password: hash
                        });
                        user.save()
                            .then(res => {

                            })
                            .catch(err => {

                            })
                    }
                })
            }
        })
    //res.json({"NOT_IMPLEMENTED": "userRegister"});
};

export function userLogin(req, res, next) {
    res.json({"NOT_IMPLEMENTED": "userLogin"});
};

export function userLogout(req, res, next) {
    res.json({"NOT_IMPLEMENTED": "userLogout"});
};
