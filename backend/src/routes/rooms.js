import { Router } from 'express';
import Room from '../models/room';

export const rooms = () => {
    let router = new Router();

    router.get('/', function(req, res, next) {
      Room.find()
        .then(docs => {
          res.json(docs);
        })
        .catch(err => {
          res.status(500).json(err);
        })
    });

    router.get('/:id', function(req, res, next) {
      let roomId = req.params.id;
      Room.findOne(id)
        .then(doc => {
          res.json(doc);
        })
        .catch(err => {
          res.status(500).json(err);
        })
    });

    router.post('/', function(req, res, next) {
      let newRoom = new Room(req.body);
      newRoom.save()
        .then(doc => {
          res.json(doc);
        })
        .catch(err => {
          res.status(500).json(err);
        })
    });

    router.put('/:id', function(req, res, next) {
      let roomId = req.params.id;
      console.log("*** PUT on:", roomId)
      Room.findByIdAndUpdate(roomId, { $set: req.body}, { new: true })
        .then(doc => {
          res.json(doc);
        })
        .catch(err => {
          res.status(500).json(err);
        })
    });

    router.delete('/:id', function(req, res, next) {
      let roomId = req.params.id;
      console.log("*** DELETE on /rooms/", roomId)
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
