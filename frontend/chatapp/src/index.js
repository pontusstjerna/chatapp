import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Frame from './components/frame';
import registerServiceWorker from './registerServiceWorker';

/* react-intl for language localizaion */
import { addLocaleData, IntlProvider } from 'react-intl';

/* Import basic support for another locale if needed
   ('en' is included by default) */
import messages_sv from './translations/sv.json';
import locale_sv from 'react-intl/locale-data/sv';

addLocaleData(locale_sv);
const messages = {
    'sv': messages_sv,
};
const language = navigator.language;  // language settings

ReactDOM.render(
<IntlProvider locale={language} messages={messages[language]}>
    <Frame />
</IntlProvider>,
document.getElementById('root'));
registerServiceWorker();
