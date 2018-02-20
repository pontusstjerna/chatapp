import { Router } from 'express';
import Room from '../models/room';

export const rooms = () => {
    let router = new Router();

    router.get('/', (req, res, next) => {
        Room.find()
        .then(docs => {
            res.json(docs);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    });

    router.get('/:id/messages', (req, res, next) => {
        let roomId = req.params.id;
        console.log("*** NOT IMPL. GET messages in room");
    });

    router.get('/:id', (req, res, next) => {
        let roomId = req.params.id;
        Room.findOne(id)
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    });

    router.post('/', (req, res, next) => {
        let newRoom = new Room(req.body);
        newRoom.save()
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    });

    router.put('/:id', (req, res, next) => {
        let roomId = req.params.id;
        Room.findByIdAndUpdate(roomId, { $set: req.body}, { new: true })
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    });

    router.delete('/:id', (req, res, next) => {
        let roomId = req.params.id;
        Room.findByIdAndRemove(roomId)
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    });

    return router;
}