import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'

import '../../styles/home.css';
import User from '../../model/User'
import { FormattedMessage } from 'react-intl';

class HomeView extends Component {

    render() {
        return (
            <div className="center-text">
                <h1><FormattedMessage id = "home.welcome" />{User.isLoggedIn() && " " + User.getNickname()}!</h1>
                <h3><FormattedMessage id = "home.heardOfChatapp"  /></h3>
                <Grid centered columns={3}>
                  <Grid.Column className="news">
                    <h3>News</h3>
                    <ul>
                        <li><FormattedMessage id = "home.frontend" /></li>
                        <li><FormattedMessage id = "home.addRoom" /></li>
                        <li><FormattedMessage id = "home.language" /></li>
                        <li><FormattedMessage id = "home.profanity" /></li>
                    </ul>
                    </Grid.Column>
                  </Grid>
            </div>
        );
    }

}

export default HomeView;
