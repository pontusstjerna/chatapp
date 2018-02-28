import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../models/user';

//placeholder
const JWT_KEY = "somesecrethere";

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
                        return res.status(500).json({
                            error: "A," + err
                        })
                    } else {
                        let user = new User({
                            nickname: req.body.nickname,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created successfully"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                  error: "B," + err
                                });
                            })
                    }
                })
            }
        })
};

export function userLogin(req, res, next) {
    //console.log("###user login: secret:" + process.env.JWT_KEY);
    User.find({ nickname: req.body.nickname })
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
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
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

export function userLogout(req, res, next) {
    res.json({"NOT_IMPLEMENTED": "userLogout"});
};
