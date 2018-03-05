import React, { Component } from 'react';
import {
    Route,
    NavLink,
    HashRouter
  } from 'react-router-dom';
import * as constants from '../../data/constants';
import {
    getRooms,
    registerRooms,
    registerNewRoom,
} from '../../data/socket';

import ChatWindowView from '../chat-window-view';
import CreateRoomView from './components/createRoomView';


class SidebarView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rooms: [],   
        }
    }

    componentDidMount() {
        registerRooms((rooms) => {
            this.setState({rooms});
        });
        registerNewRoom((success) => {
            this.getAllRooms();
        });
        this.getAllRooms();
    }

    getAllRooms() {
        getRooms();
    }

    renderLinks() {
        return this.state.rooms.map(room => 
            <NavLink className="item" key={room._id} to={'/chat/' + room.name}>
                {room.name.replace(/_/g, ' ')}</NavLink>);
    }

    renderRoutes() {
        return this.state.rooms.map(room => 
            <Route key={room._id} path={'/chat/' + room.name} render={() => <ChatWindowView room={room} />} />);
    }

    render() {
        return (
            <HashRouter>
                <div className="ui grid">
                    <div className="four wide column">
                        <div className="ui left vertical fluid menu">
                            <div className="item">
                                <div className="header">Rooms</div>
                                <div className="menu">
                                    {this.renderLinks()} 
                                </div>
                            </div>
                            <div className="item">
                                <div className="header">Manage</div>
                                <div className="menu">
                                    <NavLink className="item" to="/chat/addRoom">Add room </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="twelve wide stretched column">
                        {this.renderRoutes()}
                        <Route path="/chat/addRoom" render={() => <CreateRoomView addRoom={room => this.addRoom(room)} />} />
                    </div>
            
                </div>
            </HashRouter>
        );
    }
}

export default SidebarView;