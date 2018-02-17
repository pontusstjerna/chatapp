import React, { Component } from 'react';
import {
    Route,
    NavLink,
    HashRouter
  } from 'react-router-dom';

import ChatroomView from '../chatroom-view';

import '../../styles/chatrooms.css';

class ChatroomsView extends Component {
    render() {
        return (
            <HashRouter>
                <div className="row">
                    <div className="offset-md-1 col-md-2 selector">
                        <h3> Available chat rooms </h3>
                        <hr/>
                        <NavLink className="chatroom-item" activeClassName="chatroom-active" to="/chat/room1">Room 1</NavLink>
                        <NavLink className="chatroom-item" activeClassName="chatroom-active" to="/chat/room2">Room 2</NavLink>
                    </div>
                    <div className="col-md-6 chatroom-content">
                        <Route path="/chat/room1" render={() => <ChatroomView name="Room 1" />} />
                        <Route path="/chat/room2" render={() => <ChatroomView name="Room 2" />} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default ChatroomsView;