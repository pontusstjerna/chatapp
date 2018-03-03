import Room from '../models/room';
import {
    GET_ROOMS,
    ERROR,
} from '../socket/events';

export default (socket) => {

    socket.on(GET_ROOMS, () => {
        Room.find()
        .then(docs => {
            socket.emit(GET_ROOMS, JSON.stringify(docs));
        })
        .catch(err => {
            socket.emit(ERROR, 'Unable to fetch any rooms!');
        });
    });
}