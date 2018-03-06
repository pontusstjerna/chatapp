import React, { Component } from 'react';

import '../../styles/footer.css';
import { FormattedMessage } from 'react-intl';

class Footer extends Component {
    render() {
        return (
            <div className="text-center">
                <p className="footer"><FormattedMessage id = "footer.copyright" defaultMessage = "Copyright 2018 by Henrik, Henry, Johanna and Pontus"/></p>
            </div>
        )
    }
}

export default Footer;
