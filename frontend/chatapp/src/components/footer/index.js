import React, { Component } from 'react';

import '../../styles/footer.css';
import { FormattedMessage } from 'react-intl';

class Footer extends Component {
    render() {
        return (
            <div className="text-center">
                <p className="footer"><FormattedMessage id = "footer.copyright"/></p>
            </div>
        )
    }
}

export default Footer;
