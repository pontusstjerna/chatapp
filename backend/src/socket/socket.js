import http from 'http';
import socketIO from 'socket.io';
import * as events from './events';
import Message from '../models/message';

const port = 4000;


var Filter = require('bad-words');

export default (app) => {
    // our server instance
    const server = http.createServer(app);
    
    // our profanity filter
    const filter = new Filter();

    // This creates our socket using the instance of the server
    const io = socketIO(server);


    server.listen(port, () => console.log(`Listening on port ${port}`));

    io.on(events.CONNECTION, socket => {
      console.log('New user connected!');

      // just like on the client side, we have a socket.on method that takes a callback function
      socket.on(events.SEND_MSG, (msg) => {
        console.log('Server received message: ' + msg);

	let newMessage = new Message(JSON.parse(msg));

	//replaces the profanity text with asterisks
	newMessage.text=filter.clean(newMessage.text);

        // TODO: Add message to database
        newMessage.save().then(() => {
            console.log('Message successfully saved to db');
            io.sockets.emit(events.RECEIVE_MSG, JSON.stringify(newMessage));
        }).catch(err => {
            console.log('Unable to save message to db: ' + err.message);
        });
      })
    
    })
    
}
