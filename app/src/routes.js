import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { render } from 'react-dom';

// Layouts
import  MainLayout  from './frontend/layouts/main';

// Components
import Home from './frontend/pages/Home';
import Test from './frontend/pages/Test';
import Error from './pages/Error';
import NotFound from './frontend/components/NotFound';

export const routes = (
    <Route>
        <Route path='/' component={MainLayout}>
            <IndexRoute component={Home}/>
            <Route path="test" component={Test}/>
            <Route path='error' component={Error}/>
        </Route>
        <Route path='*' component={NotFound}/>
    </Route>
);