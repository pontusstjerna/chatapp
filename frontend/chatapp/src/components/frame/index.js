import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import UserSession from '../../session/usersession';

import HomeView from '../home-view';
import ChatroomsView from '../chatrooms-view';
import AboutView from '../about-view';
import SettingsView from '../settings-view';
import RegisterView from '../register-view';
import Footer from '../footer';

export default class Frame extends Component {
    constructor(props) {
        // This needs to be called first. Props is an object containing all properties of a component
        // For example <Frame ostmacka="hello"/> would create a prop ostmacka with the value "hello".
        super(props);

        // This view's local state, aka all "global variables" should be stored here
        this.state = {

        };
    }

    // This does the rendering of the component in html-style
    render() {
        return (
            <HashRouter>
                <div className="ui container">

                    <div className="ui inverted menu">
                            <NavLink className="item" exact to="/">Home</NavLink>
                            <NavLink className="item" to="/chat">Chat!</NavLink>
                            <NavLink className="item" to="/about">About</NavLink>
                            {UserSession.isLoggedIn() ? (<NavLink className="item" to="/settings">Settings</NavLink>) : (null) }
                            <NavLink className="item right" to="/register">Register</NavLink>
                    </div>

                    { /* PUT ALL CONTENT HERE */}

                    <div className="content">
                        <Route exact path="/" component={HomeView} />
                        <Route path="/chat" component={ChatroomsView} />
                        <Route path="/about" component={AboutView} />
                        <Route path="/settings" component={SettingsView} />
                        <Route path="/register" component={RegisterView} />
                    </div>

                    <Footer/>
                </div>
            </HashRouter>
        );
    }
}
