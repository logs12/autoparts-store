import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory} from 'react-router';
import { Routes } from './components/Routes';
import Home from './pages/Home';

import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from './store/configureStore';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const store = configureStore();

/*render(
 <Provider store={store}>
 <Router history={browserHistory} routes={ MainMenu }  />,
 </Provider>,
 document.getElementById('app')
 );*/


render(
    <Provider store={store}>
        <Home />
    </Provider>,
    document.getElementById('root')
);