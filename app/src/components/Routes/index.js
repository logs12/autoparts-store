import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { render } from 'react-dom';

// Layouts
import  MainLayout  from '../../layouts/main';

// Components
import Home from '../Home';
import NotFound from '../NotFound';

export const Routes = (
    <div>
        <Route path='/' component={MainLayout}>
            <IndexRoute component={Home}/>
        </Route>

        <Route path='*' component={NotFound}/>
    </div>
);