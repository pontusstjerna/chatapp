import socketIOClient from 'socket.io-client';
import * as events from './events';
import * as constants from './constants';

const socket = socketIOClient(`http://${constants.backendURL}:${constants.socketPort}`);
socket.on(events.ERROR, msg => {
    alert(msg);
    console.log(msg);
});

export const send = (msg) => {
    socket.emit(events.SEND_MSG, JSON.stringify(msg));
}

export const getRooms = () => {
    socket.emit(events.GET_ROOMS, null);
}

export const registerRooms = (listener) => {
    socket.on(events.GET_ROOMS, rooms => {
        listener(JSON.parse(rooms));
    })
}

export const registerNewRoom = (listener) => {
    socket.on(events.CREATE_ROOM, response => {
        listener(JSON.parse(response));
    })
}

export const createRoom = (room) => {
    socket.emit(events.CREATE_ROOM, JSON.stringify(room));
}

export const getMessages = (roomId) => {
    socket.emit(events.GET_MESSAGES, roomId);
}

export const registerMessages = (listener) => {
    socket.on(events.GET_MESSAGES, messages => {
        listener(JSON.parse(messages));
    })
}

export const registerReceiveMsg = (listener) => {
    socket.on(events.RECEIVE_MSG, message => {
        listener(JSON.parse(message));
    })
}