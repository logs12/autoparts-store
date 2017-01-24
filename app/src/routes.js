import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { render } from 'react-dom';

// Layouts
import  FrontendLayout  from './frontend/layouts/main';
import  BackendLayout  from './backend/layouts/main';

// Frontend components
import FrontendHome from './frontend/pages/Home';
import Test from './frontend/pages/Test';

// Backend components
import AdminHome from './frontend/pages/Home';

// Common components
import Error from './pages/Error';
import NotFound from './pages/NotFound';

export const routes = (
    <Route>
        <Route path="/" component={FrontendLayout}>
            <IndexRoute component={FrontendHome}/>
            <Route path="test" component={Test}/>
            <Route path="error" component={Error}/>
        </Route>

        <Route path="/admin" component={BackendLayout}/>

        <Route path='*' component={NotFound}/>
    </Route>
);