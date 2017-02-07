import "../css/styles.scss";

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

import React from 'react';
import { render } from 'react-dom';
import { browserHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Root from './Root';

import configureStore from './store/ConfigureStore';

import configDataAction from './actions/ConfigDataAction';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

// get Config data each time the application is loaded
store.dispatch(configDataAction());

render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);
