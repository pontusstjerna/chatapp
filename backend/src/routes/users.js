import { Router } from 'express';
import User from '../models/user';

const userctrl = require('../controllers/userctrl');
//const checkAuth = require('../middleware/check-auth');

export const users = () => {
    let router = new Router();

    router.post('/register', userctrl.userRegister);

    router.post('/login', userctrl.userLogin);

    router.post('/logout', userctrl.userLogout);

    // Get all users
    router.get('/', (req, res, next) => {
        User.find()
        .then(docs => {
            res.json(docs);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    });

    // Get user by id
    router.get('/:id', (req, res, next) => {
        let userId = req.params.id;
        User.findOne(userId)
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    });

    // Create
    router.post('/', (req, res, next) => {
        let newUser = new User(req.body);
        newUser.save()
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    });

    //Update
    router.put('/:id', (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndUpdate(userId, { $set: req.body}, { new: true })
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    });

    //Delete
    router.delete('/:id', (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    });

    return router;
}
