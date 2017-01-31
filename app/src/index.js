import "../css/styles.scss";

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

import React from 'react';
import { render } from 'react-dom';
import { browserHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Root from './Root';

import configureStore from './store/ConfigureStore';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);
