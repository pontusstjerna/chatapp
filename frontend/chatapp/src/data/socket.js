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

let ObserverReceiveNewRoom = null;

export const registerReceiveNewRoom = (component) => {
    ObserverReceiveNewRoom = component;
}

export const unregisterReceiveNewRoom = () => {
    ObserverReceiveNewRoom = null;
}

socket.on(events.CREATE_ROOM, room => {
    if (ObserverReceiveNewRoom != null) {
        ObserverReceiveNewRoom.onReceiveNewRoom(JSON.parse(room));
    }
});


let ObserverReceiveMsg = null;

export const registerReceiveMsg = (component) => {
    ObserverReceiveMsg = component;
}

export const unregisterReceiveMsg = () => {
    ObserverReceiveMsg = null;
}

socket.on(events.RECEIVE_MSG, msg => {
    if (ObserverReceiveMsg != null) {
        ObserverReceiveMsg.onReceiveMsg(JSON.parse(msg));
    }
});

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

export const createAnonUser = (user) => {
    socket.emit(events.ANON_CREATE, JSON.stringify(user));

    return new Promise((resolve, reject) => {
        socket.on(events.ANON_CREATE, response => {
            let res = JSON.parse(response);
            if (res.success) {
                resolve(res.data);
            } else {
                console.log("#registerAnonUser:reject: ", res.error)
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
