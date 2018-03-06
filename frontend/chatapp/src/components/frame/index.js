import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';

import HomeView from '../home-view';
import ChatroomsView from '../chatrooms-view';
import AboutView from '../about-view';
import RegisterView from '../register-view';
import Footer from '../footer';

/* react-intl imports */
import { FormattedMessage } from 'react-intl';

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
                            <NavLink className="item" exact to="/"><FormattedMessage id = "frame.home" defaultMessage = "Home"/></NavLink>
                            <NavLink className="item" to="/chat"><FormattedMessage id = "frame.chat" defaultMessage = "Chat!"/></NavLink>
                            <NavLink className="item" to="/about"><FormattedMessage id = "frame.about" defaultMessage = "About"/></NavLink>
                            <NavLink className="item right" to="/register"><FormattedMessage id = "frame.register" defaultMessage = "Register"/></NavLink>
                    </div>

                    { /* PUT ALL CONTENT HERE */}

                    <div className="content">
                        <Route exact path="/" component={HomeView} />
                        <Route path="/chat" component={ChatroomsView} />
                        <Route path="/about" component={AboutView} />
                        <Route path="/register" component={RegisterView} />
                    </div>

                    <Footer/>
                </div>
            </HashRouter>
        );
    }
}
