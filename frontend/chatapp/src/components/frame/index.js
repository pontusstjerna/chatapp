import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';

import HomeView from '../home-view';
import SidebarView from '../sidebar-view';
import AboutView from '../about-view';
import RegisterView from '../register-view';
import LoginView from '../login-view';
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
                            <NavLink className="item right" to="/login">Login</NavLink>
                            {/* <NavLink className="item right" to="/register">Register</NavLink> */}
                    </div>

                    { /* PUT ALL CONTENT HERE */}

                    <div className="content">
                        <Route exact path="/" component={HomeView} />
                        <Route path="/chat" component={SidebarView} />
                        <Route path="/about" component={AboutView} />
                        <Route path="/login" component={LoginView} />
                        <Route path="/register" component={RegisterView} />
                    </div>

                    <Footer/>
                </div>
            </HashRouter>
        );
    }
}
