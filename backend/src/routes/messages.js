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
        newMessage.save()
        .then(() => {
            console.log('Message successfully saved to db');

            Message.findById(newMessage._id)
            .populate('user.item', 'nickname')
            .exec((err, populatedMessage) => {
                io.sockets.emit(RECEIVE_MSG, JSON.stringify(populatedMessage));
            })
        })
        .catch(err => {
            console.log('Unable to save message to db: ', err);
        });
    });

    socket.on(GET_MESSAGES, (roomId) => {
        Message.find({room: roomId})
        .populate('user.item', 'nickname')
        .exec()
        .then(docs => {
            let response = {
                success: true,
                data: {
                    room: roomId,
                    messages: docs
                },
                error: null
            };
            socket.emit(GET_MESSAGES, JSON.stringify(response));
        })
        .catch(err => {
            let errorResponse = {success: false, data: null, error: err};
            socket.emit(GET_MESSAGES, JSON.stringify(errorResponse));
        });
    });

}
