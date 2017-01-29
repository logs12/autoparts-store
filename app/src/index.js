import "../css/styles.scss";

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

import * as _ from 'lodash';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Root from './Root';

import configureStore from './store/configureStore';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store)

render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);
