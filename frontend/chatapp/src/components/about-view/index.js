import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
class AboutView extends Component {
    render() {
        return (
            <div>
                <FormattedMessage id = "about.content" defaultMessage = "This is text about us."/>
            </div>
        );
    }
}

export default AboutView;