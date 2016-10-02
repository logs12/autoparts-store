import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { render } from 'react-dom';

// Layouts
import  MainLayout  from './layouts/main';

// Components
import Home from './pages/Home';
import Test from './pages/Test';
import NotFound from './components/NotFound';

export const routes = (
    <div>
        <Route path='/' component={MainLayout}>
            <IndexRoute component={Home}/>
            <Route path="test" component={Test}/>
        </Route>

        <Route path='*' component={NotFound}/>
    </div>
);