import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'

import '../../styles/home.css';
import User from '../../model/User'
class HomeView extends Component {

    render() {
        return (
            <div className="center-text">
                <h1>Welcome to !ChatApp{User.isLoggedIn() && " " + User.getNickname()}!</h1>
                <h3>An awesome forum for real-time chat discussions about anything in life. </h3>
                <Grid centered columns={3}>
                  <Grid.Column className="news">
                    <h3>News</h3>
                    <ul>
                        <li>New frontend</li>
                        <li>You can add your own rooms</li>
                        <li>Now supports both english and swedish</li>
                        <li>Profanity filter. No more bad words!</li>
                    </ul>
                    </Grid.Column>
                  </Grid>
            </div>
        );
    }

}

export default HomeView;
