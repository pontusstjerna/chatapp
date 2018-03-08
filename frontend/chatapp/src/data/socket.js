import socketIOClient from 'socket.io-client';
import * as events from './events';
import * as constants from './constants';

const socket = socketIOClient(`http://${constants.backendURL}:${constants.socketPort}`);
socket.on(events.ERROR, msg => {
    alert(msg);
    console.log(msg);
});

export const sendMessage = (msg) => {
    socket.emit(events.SEND_MSG, JSON.stringify(msg));
}

/*
    JSON Response sent from server
    {
        "success": bool,
        "data": obj or null,
        "error": obj or null,
    }
*/


// Returns response wrapped in a promise. No need to register a listener.
export const getRooms = () => {
    socket.emit(events.GET_ROOMS, null);

    return new Promise((resolve, reject) => {
        socket.on(events.GET_ROOMS, response => {
            let res = JSON.parse(response);
            if (res.success) {
                resolve(res.data);
            } else {
                console.log("#getRooms:reject: ", res.error)
                reject(res.error);
            }
        })
        //TODO: reject after a set timeout if we get no response from server
    });
}

// Returns response wrapped in a promise. No need to register a listener.
export const getMessages = (roomId) => {
    socket.emit(events.GET_MESSAGES, roomId);

    return new Promise((resolve, reject) => {
        socket.on(events.GET_MESSAGES, response => {
            let res = JSON.parse(response);
            if (res.success) {
                resolve(res.data.messages);
            } else {
                console.log("#getMessages:reject: ", res.error)
                reject(res.error);
            }
        })
        //TODO: reject after a set timeout if we get no response from server
    });
}

export const createRoom = (room) => {
    socket.emit(events.CREATE_ROOM, JSON.stringify(room));
}

export const registerNewRoom = (listener) => {
    socket.on(events.CREATE_ROOM, response => {
        listener(JSON.parse(response));
    })
}

export const registerReceiveMsg = (listener) => {
    socket.on(events.RECEIVE_MSG, message => {
        listener(JSON.parse(message));
    })
}

/* USER */

// Returns response wrapped in a promise. No need to register a listener.
export const registerUser = (user) => {
    socket.emit(events.USER_REGISTER, JSON.stringify(user));

    return new Promise((resolve, reject) => {
        socket.on(events.USER_REGISTER, response => {
            let res = JSON.parse(response);
            if (res.success) {
                resolve(res.data);
            } else {
                console.log("#registerUser:reject: ", res.error)
                reject(res.error);
            }
        })
        //TODO: reject after a set timeout if we get no response from server
    });
}

// Returns response wrapped in a promise. No need to register a listener.
export const loginUser = (user) => {
    socket.emit(events.USER_LOGIN, JSON.stringify(user));

    return new Promise((resolve, reject) => {
        socket.on(events.USER_LOGIN, response => {
            let res = JSON.parse(response);
            if (res.success) {
                resolve(res.data);
            } else {
                console.log("#loginUser:reject: ", res.error)
                reject(res.error);
            }
        })
        //TODO: reject after a set timeout if we get no response from server
    });
}

export const registerUserLogin = (listener) => {
    socket.on(events.USER_LOGIN, response => {
        listener(JSON.parse(response));
    })
}

export const updateUser = (user) => {
  console.log('Emitting USER_UPDATE: ' + JSON.stringify(user));
  socket.emit(events.USER_UPDATE, user);

  return new Promise((resolve, reject) => {
    socket.on(events.USER_UPDATE, response => {
      let res = JSON.parse(response);
      if (res.success) {
        resolve(res.data);
      } else {
        console.log("#updateUser:reject: ", res.error)
        reject(res.error);
      }
    })
  });
}
