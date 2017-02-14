import "../css/styles.scss";

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

import React from 'react';
import { render } from 'react-dom';
import { browserHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Root from './Root';

import { push } from 'react-router-redux';

import configureStore from './common/store/ConfigureStore';

import configDataAction from './common/actions/ConfigDataAction';

import Preloader from './common/components/Preloader';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

// View Preloader befor loading configData
render(
    <Preloader />,
    document.getElementById('root')
);

// Get Config data each time the application is loaded
store.dispatch(configDataAction())
    .then(() => {
        render(
            <Root store={store} history={history} />,
            document.getElementById('root')
        );
    })
    .catch(() => {
        render(
            <Root store={store} history={history} />,
            document.getElementById('root')
        );
    });

