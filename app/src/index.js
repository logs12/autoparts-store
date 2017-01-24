import "../css/styles.scss";

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory} from 'react-router';
import { routes } from './routes';
import Root from './Root';

import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from './frontend/store/configureStore';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const store = configureStore();

render(
    <Root store={store} history={browserHistory} />,
    document.getElementById('root')
);
