import http from 'http';
import socketIO from 'socket.io';
import * as events from './events';
import Message from '../models/message';

const port = 4000;

export default (app) => {
    // our server instance
    const server = http.createServer(app);
    
    // This creates our socket using the instance of the server
    const io = socketIO(server);

    server.listen(port, () => console.log(`Listening on port ${port}`));
    
    io.on(events.CONNECTION, socket => {
      console.log('New user connected!');

      // just like on the client side, we have a socket.on method that takes a callback function
      socket.on(events.SEND_MSG, (msg) => {
        console.log('Server received message: ' + msg);
        
        // TODO: Add message to database
        let newMessage = new Message(JSON.parse(msg));
        newMessage.save().then(() => {
            console.log('Message successfully saved to db');
            io.sockets.emit(events.RECEIVE_MSG, msg);
        }).catch(err => {
            console.log('Unable to save message to db: ' + err.message);
        });
      })
    
    })
    
}