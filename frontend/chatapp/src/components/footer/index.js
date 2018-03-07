import React, { Component } from 'react';

import '../../styles/footer.css';
import { FormattedMessage } from 'react-intl';

class Footer extends Component {
    render() {
        return (
            <footer><FormattedMessage id = "footer.copyright"/></footer>
        )
    }
}

export default Footer;
