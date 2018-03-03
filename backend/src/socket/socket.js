import http from 'http';
import socketIO from 'socket.io';
import * as events from './events';
import Message from '../models/message';
import rooms from '../routes/rooms2';
import messages from '../routes/messages2';

const port = 4000;

export default (app) => {
    // our server instance
    const server = http.createServer(app);
    
    // This creates our socket using the instance of the server
    const io = socketIO(server);

    server.listen(port, () => console.log(`Listening on port ${port}`));
    
    io.on(events.CONNECTION, socket => {
        console.log('New user connected!');
    
        rooms(socket);
        messages(socket);

        return socket;
    })
}