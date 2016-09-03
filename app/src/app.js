import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory} from 'react-router';
import { Routes } from './components/Routes';
import injectTapEventPlugin from 'react-tap-event-plugin';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


render(
    <Router history={browserHistory} routes={Routes}  />,
    document.getElementById('app')
);