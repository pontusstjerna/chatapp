import React, { Component } from 'react';
import {
    Route,
    NavLink,
    HashRouter
  } from 'react-router-dom';

import HomeView from '../home-view';
import ChatroomsView from '../chatrooms-view';
import AboutView from '../about-view';
import Footer from '../footer';
// This should import the default bootstrap css stuff
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../../styles/main.css';
import '../../styles/frame.css';


class Frame extends Component {
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
                <div className="text-center">
                    <h1>!ChatApp</h1>
                    <div>
                        <NavLink className="menu-item" exact to="/">Home</NavLink>
                        <NavLink className="menu-item" to="/chat">Chat!</NavLink>        
                        <NavLink className="menu-item" to="/about">About</NavLink>
                    </div>
                    { /* PUT ALL CONTENT HERE */}
                    <div className="content"> 
                        <Route exact path="/" component={HomeView} />
                        <Route path="/chat" component={ChatroomsView} />
                        <Route path="/about" component={AboutView} />
                        {/* <Route path="/chat" component={undefined} /> */}
                    </div>
                <Footer />
                </div>                
            </HashRouter>
        );
    }
}

export default Frame;