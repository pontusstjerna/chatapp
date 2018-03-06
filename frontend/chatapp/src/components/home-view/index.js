import React, { Component } from 'react';

import '../../styles/home.css';
import { FormattedMessage } from 'react-intl';

class HomeView extends Component {

    render() {
        return (
            <div>
                <p><FormattedMessage id = "home.heardOfChatapp" defaultMessage = "Have you ever heard of !ChatApp? It is an awesome forum for real-time chat discussions about anything in life."/> </p>
                <div id="news">
                    <h3><FormattedMessage id = "home.news" defaultMessage = "News"/></h3>
                    <ul>
                        <li><FormattedMessage id = "home.frontend" defaultMessage = "New frontend"/></li>
                        <li><FormattedMessage id = "home.os" defaultMessage = "Someone won OS"/></li>
                    </ul>
                </div>
            </div>
        );
    }

}

export default HomeView;