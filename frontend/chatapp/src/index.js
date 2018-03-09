import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Frame from './components/frame';
import registerServiceWorker from './registerServiceWorker';

/* react-intl for language localizaion */
import { addLocaleData, IntlProvider } from 'react-intl';

import messages_sv from './translations/sv.json';
import locale_sv from 'react-intl/locale-data/sv';

import locale_en from 'react-intl/locale-data/en';
import messages_en from './translations/en.json';


addLocaleData(locale_en);
addLocaleData(locale_sv);

const messages = {
    'sv': messages_sv,
	'en': messages_en
};
const language = navigator.language.split(/[-_]/)[0];  // language settings without the region code en-us becomes en

ReactDOM.render(
<IntlProvider locale={language} messages={messages[language]}>
    <Frame />
</IntlProvider>,
document.getElementById('root'));
registerServiceWorker();
