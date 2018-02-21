import { Router } from 'express';
import Message from '../models/message';

export const messages = () => {
    let router = new Router();
    
    router.get('/',(req, res, next) => {
        Message.find()
        .then(docs => {
            res.json(docs);
        })
        .catch(err => {
            res.status(500)
        })

    });

    router.get('/:id',(req, res, next) => {
        Message.findOne(req.params.id)
        .then(docs => {
            res.json(docs);
   	    })
    });
	
    router.post('/',(req,res,next) =>{
        let newMessage = new Message(req.body)
   	    Message.save().then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    });

    router.delete('/:id', (req, res, next) => {
        let messageId = req.params.id;
        Message.findByIdAndRemove(messageId)
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    });

    return router;

}