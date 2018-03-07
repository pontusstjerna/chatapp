import React, { Component } from 'react';

import '../../styles/home.css';
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
                <p>Have you ever heard of !ChatApp? It is an awesome forum for real-time chat discussions about anything in life. </p>
                <div id="news">
                    <h3>News</h3>
                    <ul>
                        <li>New frontend</li>
                        <li>Someone won OS</li>
                    </ul>
                </div>
            </div>
        );
    }

}

export default HomeView;
