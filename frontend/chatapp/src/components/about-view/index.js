import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
class AboutView extends Component {
    render() {
        return (
            <div>
                <FormattedMessage id = "about.content"/>
            </div>
        );
    }
}

export default AboutView;