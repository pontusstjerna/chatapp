import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
class AboutView extends Component {
    render() {
        return (
            <div className="center-text">
                <h1><FormattedMessage id = "about.chatapp"/></h1>
                <p><FormattedMessage id = "about.content"/></p>
            </div>
        );
    }
}

export default AboutView;
