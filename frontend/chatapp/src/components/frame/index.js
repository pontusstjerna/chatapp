import React, { Component } from 'react';
import { Divider} from 'semantic-ui-react'
import { Route, NavLink, HashRouter } from 'react-router-dom';
import User from '../../model/User';

import HomeView from '../home-view';
import SidebarView from '../sidebar-view';
import AboutView from '../about-view';
import SettingsView from '../settings-view';
import RegisterView from '../register-view';
import LoginView from '../login-view';
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

    handleLogout(event){
      User.logout();
      alert("You were logged out");
    }

    // This does the rendering of the component in html-style
    render() {
        return (
            <HashRouter>
                <div className="ui container">

                    <div className="ui inverted menu">

                            <NavLink className="item" exact to="/"><FormattedMessage id = "frame.home"/></NavLink>
                            <NavLink className="item" to="/chat"><FormattedMessage id = "frame.chat" /></NavLink>
                            <NavLink className="item" to="/about"><FormattedMessage id = "frame.about" /></NavLink>
                            {User.isLoggedIn() &&
                              (<NavLink className="item" to="/settings">Settings</NavLink>)
                            }
                            {User.isLoggedIn() ?
                              (<NavLink className="item right" to="/" onClick={this.handleLogout}>Logout</NavLink>) :
                              (<NavLink className="item right" to="/login">Login</NavLink>) }
                    </div>

                    { /* PUT ALL CONTENT HERE */}

                    <div className="content">
                        <Route exact path="/" component={HomeView} />
                        <Route path="/chat" component={SidebarView} />
                        <Route path="/about" component={AboutView} />
                        <Route path="/settings" component={SettingsView} />
                        <Route path="/login" component={LoginView} />
                        <Route path="/register" component={RegisterView} />
                    </div>
                    <Divider hidden/>
                    <Divider hidden/>
                    <Divider hidden/>
                    <Divider hidden/>
                    <Footer/>
                </div>
            </HashRouter>
        );
    }
}
