import React, { Component } from 'react';

import '../../styles/home.css';
import { FormattedMessage } from 'react-intl';
import User from '../../model/User'

class HomeView extends Component {

    render() {
        return (
            <div>
                {User.isLoggedIn() &&
                <div>
                    <h3>Hello {User.getNickname()} </h3>
                </div>
                }
                <p><FormattedMessage id = "home.heardOfChatapp"/> </p>
                <div id="news">
                    <h3><FormattedMessage id = "home.news"/></h3>
                    <ul>
                        <li><FormattedMessage id = "home.frontend"/></li>
                        <li><FormattedMessage id = "home.os"/></li>
                    </ul>
                </div>
            </div>
        );
    }

}

export default HomeView;
