import { Router } from 'express';
import User from '../models/user';

export const users = () => {
    let router = new Router();

    router.get('/', (req, res, next) => {
        let usr = new User({
            nickname: 'user1',
            password: 'pass1',
        });

        usr.save().then(x => 
            console.log('Created: ' + JSON.stringify(x))
        ).catch(err => 
            console.log(JSON.stringify(err))
        );

        res.status(200).send();
    });    

    return router;
}
