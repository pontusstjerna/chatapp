import React, { Component } from 'react';
import {
    Route,
    NavLink,
    HashRouter
  } from 'react-router-dom';
import * as constants from '../../data/constants';

import ChatroomView from '../chatroom-view';
import CreateRoomView from './components/createRoomView';

import '../../styles/chatrooms.css';

class ChatroomsView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rooms: [],   
        }
    }

    componentDidMount() {
        this.getAllRooms();
    }

    getAllRooms() {
        fetch(`http://${constants.backendURL}:${constants.restPort}/rooms`).then(result => {
            if (result.ok) {
                return result.json();
            } else {
                alert('Unable to fetch any rooms! :( Status: ' + result.status);
                return null;
            }
        }).then(rooms => {
            if (rooms) {
                this.setState({rooms});
            }
        });
    }

    renderLinks() {
        return this.state.rooms.map(room => 
            <NavLink key={room._id} className="chatroom-item" activeClassName="chatroom-active" to={'/chat/' + room.name}>
                {room.name.replace(/_/g, ' ')}</NavLink>);
    }

    renderRoutes() {
        return this.state.rooms.map(room => 
            <Route key={room._id} path={'/chat/' + room.name} render={() => <ChatroomView room={room} />} />);
    }

    addRoom(room) {
        // Todo!
        fetch(`http://${constants.backendURL}:${constants.restPort}/rooms`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(room),
        }).then(result => {
            if (result.ok) {
                this.getAllRooms();
            } else {
                alert('Unable to create room ' + room.name);
            }
        });
    }

    render() {
        return (
            <HashRouter>
                <div className="row">
                    <div className="offset-md-1 col-md-2 selector">
                        <h3> Available chat rooms </h3>
                        <hr/>
                        {this.renderLinks()}
                        <NavLink className="add-room" activeClassName="add-room-active" to="/chat/addRoom">Add room </NavLink>
                    </div> 
                    <div className="col-md-6 chatroom-content">
                        {this.renderRoutes()}
                        <Route path="/chat/addRoom" render={() => <CreateRoomView addRoom={room => this.addRoom(room)} />} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default ChatroomsView;