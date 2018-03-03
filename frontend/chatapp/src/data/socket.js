import socketIOClient from 'socket.io-client';
import * as events from './events';
import * as constants from './constants';

export const socket = socketIOClient(`http://${constants.backendURL}:${constants.socketPort}`);

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

export const getMessages = (roomsId) => {
    socket.emit(events.GET_MESSAGES, roomId);
}