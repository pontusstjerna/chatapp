import { Router } from 'express';

export const index = () => {
    let router = new Router();

    router.get('/', (req, res, next) => {
        res.json({"message": "index route for rest api"});
    });

    return router;
}
