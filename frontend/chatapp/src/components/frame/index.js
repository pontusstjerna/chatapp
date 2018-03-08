import React, { Component } from 'react';
import '../../styles/frame.css';
import {
  Route,
  NavLink,
  HashRouter
} from 'react-router-dom';
import User from '../../model/User';
import {
    registerUserLogin,
} from '../../data/socket';

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
          loggedIn: false || User.isLoggedIn(),
        };
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        registerUserLogin(response => {
            console.log("User logged in: ", response)
            this.setState({loggedIn: true});
        })
    }

    handleLogout(event){
      User.logout();
      this.setState({loggedIn: false});
      alert("You were logged out");
    }

    // This does the rendering of the component in html-style
    render() {
        return (
            <HashRouter>
                <div className="ui container">

                    <div className="ui inverted menu">

                            <NavLink className="item" exact to="/"><FormattedMessage id = "frame.home"/></NavLink>
                            <NavLink className="item" to="/chat"><FormattedMessage id = "frame.chat"/></NavLink>
                            <NavLink className="item" to="/about"><FormattedMessage id = "frame.about"/></NavLink>
                            {this.state.loggedIn &&
                              (<NavLink className="item" to="/settings"><FormattedMessage id = "frame.settings"/></NavLink>)
                            }
                            {this.state.loggedIn ?
                              (<NavLink className="item right" to="/" onClick={this.handleLogout}><FormattedMessage id = "frame.logout" /></NavLink>) :
                              (<NavLink className="item right" to="/login"><FormattedMessage id = "frame.login" /></NavLink>) }
                    </div>

                    { /* PUT ALL CONTENT HERE */}

                    <div className="content page-content">
                        <Route exact path="/" component={HomeView} />
                        <Route path="/chat" component={SidebarView} />
                        <Route path="/about" component={AboutView} />
                        <Route path="/settings" component={SettingsView} />
                        <Route path="/login" component={LoginView} />
                        <Route path="/register" component={RegisterView} />
                    </div>
                    <Footer/>
                </div>
            </HashRouter>
        );
    }
}
