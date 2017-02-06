import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { render } from 'react-dom';

// Layouts
import  FrontendLayout  from './frontend/layouts/main';
import  BackendLayout  from './backend/layouts/main';

// Frontend components
import FrontendHomePage from './frontend/pages/HomePage';
import TestPage from './frontend/pages/TestPage';

// Backend components
import AdminHomePage from './backend/pages/HomePage';

// Common components
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ErrorPage from './pages/ErrorPage';
import NotFoundPage from './pages/NotFoundPage';
import ApplicationContainer from './containers/ApplicationContainer';


export const routes = (
    <Route>
        <Route path="/" component={ApplicationContainer(FrontendLayout, false)}>
            <IndexRoute component={FrontendHomePage}/>
            <Route path="test" component={TestPage}/>
        </Route>

        <Route path="/admin" component={ApplicationContainer(BackendLayout)}>
            <IndexRoute component={AdminHomePage}/>
        </Route>

        <Route path="/login" component={ApplicationContainer(LoginPage, false)}/>
        <Route path="/sign-up" component={ApplicationContainer(SignUpPage, false)}/>

        <Route path="/error" component={ErrorPage}/>
        <Route path='*' component={NotFoundPage}/>
    </Route>
);