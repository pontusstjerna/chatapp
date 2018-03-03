import Room from '../models/room';
import {
    GET_ROOMS,
    CREATE_ROOM,
    ERROR,
} from '../socket/events';

export default (io, socket) => {

    socket.on(GET_ROOMS, () => {
        Room.find()
        .then(docs => {
            socket.emit(GET_ROOMS, JSON.stringify(docs));
        })
        .catch(err => {
            socket.emit(ERROR, 'Unable to fetch any rooms!');
        });
    });

    socket.on(CREATE_ROOM, room => {
        let newRoom = new Room(JSON.parse(room));
        newRoom.save().then(doc => {
            io.sockets.emit(CREATE_ROOM, JSON.stringify(doc));
        })
        .catch(err => {
            socket.emit(ERROR, 'Unable to create room: ' + err);
        })
    })
}