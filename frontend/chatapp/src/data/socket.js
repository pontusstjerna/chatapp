import socketIOClient from 'socket.io-client';
import * as events from './events';

const serverUrl = 'http://localhost:4000';
const socket = socketIOClient(serverUrl);

let listeners = [];

socket.on(events.RECEIVE_MSG, msg => {
    for(let i = 0; i < listeners.length; i++) {
        listeners[i](JSON.parse(msg));
    }
});

export const send = (msg) => {
    socket.emit('change color','red');   
    socket.emit(events.SEND_MSG, JSON.stringify(msg));
}

export const registerListener = (listener) => {
    listeners.push(listener);
}