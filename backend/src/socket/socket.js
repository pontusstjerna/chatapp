import http from 'http';
import socketIO from 'socket.io';
import * as events from './events';
import Message from '../models/message';
import rooms from '../routes/rooms';
import messages from '../routes/messages';
import users from '../routes/users';

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

    let numUsers = 0;

    io.on(events.CONNECTION, socket => {
        console.log('New client connected! socket.id:', socket.id);

        numUsers++;
        console.log('count:', numUsers);

        rooms(io, socket);
        messages(io, socket);
        users(socket);

        socket.on('disconnect', function () {
            console.log("client disconnected, socket.id:", socket.id);
            numUsers--;
            console.log('count:', numUsers);
        });

        return socket;
    })
}
