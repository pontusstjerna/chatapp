import Message from '../models/message';
import {
    SEND_MSG,
    GET_MESSAGES,
    RECEIVE_MSG,
    ERROR,
} from '../socket/events';


export default (io, socket) => {
    // just like on the client side, we have a socket.on method that takes a callback function
    socket.on(SEND_MSG, (msg) => {
        console.log('Server received message: ' + msg);
    
        // TODO: Add message to database
        let newMessage = new Message(JSON.parse(msg));
        newMessage.save().then(() => {
            console.log('Message successfully saved to db');
            io.sockets.emit(RECEIVE_MSG, msg);
        }).catch(err => {
            console.log('Unable to save message to db: ' + err.message);
        });
    });

    socket.on(GET_MESSAGES, (roomId) => {
        Message.find({room: roomId})
        .populate('user', '-password -__v')
        .exec()
        .then(docs => {
            let resp = {
                room: roomId,
                messages: docs
            };
            
            socket.emit(GET_MESSAGES, JSON.stringify(resp));
        })
        .catch(err => {
            socket.emit(ERROR, 'Unable to get all messages from room ' + roomId);
        })
    });
}