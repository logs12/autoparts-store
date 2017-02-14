import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { render } from 'react-dom';

// Layouts Frontend
import FrontendLayout  from './frontend/layouts/main';

// Frontend components
import FrontendHomePage from './frontend/pages/HomePage';
import TestPage from './frontend/pages/TestPage';

// Layouts Backend
import MenuPageLayout from './backend/layouts/MenuPageLayout';
import DashboardLayout from './backend/layouts/DashboardLayout';

// Backend components
import DashboardPage from './backend/pages/DashboardPage';
import UsersRolePage from './backend/menu/users-roles';
import UsersPage from './backend/menu/users-roles/users';
import UserViewPage from './backend/menu/users-roles/users/user';
import UserFormPage from './backend/menu/users-roles/users/user-form';

// Common components
import LoginPage from './common/pages/LoginPage';
import SignUpPage from './common/pages/SignUpPage';
import ErrorPage from './common/pages/ErrorPage';
import NotFoundPage from './common/pages/NotFoundPage';
import ApplicationContainer from './common/containers/ApplicationContainer';

// constants react-redux-router app
import {
    ADMIN_ROUTE,
    USERS_ROLES_ROUTE,
    USERS_ROUTE,
    USER_VIEW_ROUTE,
    USER_CREATE_ROUTE,
    USER_UPDATE_ROUTE,
    USER_DELETE_ROUTE,
} from './common/constants';


export const routes = (
    <Route>
        {/*Frontend*/}
        <Route path="/" component={ApplicationContainer(FrontendLayout, false)}>
            <IndexRoute component={FrontendHomePage}/>
            <Route path="test" component={TestPage}/>
        </Route>

        {/*Backend*/}
        <Route path={ADMIN_ROUTE} component={ApplicationContainer(DashboardLayout)}>
            <IndexRoute component={DashboardPage}/>
        </Route>

        <Route path={USERS_ROLES_ROUTE} component={ApplicationContainer(MenuPageLayout)}>
            <IndexRoute component={UsersRolePage}/>
            <Route path={USERS_ROUTE} component={UsersPage}/>
            <Route path={USER_CREATE_ROUTE} component={UserFormPage}/>
            <Route path={USER_VIEW_ROUTE(':id')} component={UserViewPage}/>
            <Route path={USER_UPDATE_ROUTE(':id')} component={UserFormPage}/>
            <Route path={USER_DELETE_ROUTE(':id')} component={UsersPage}/>
        </Route>

        {/*Common*/}
        <Route path="/login" component={ApplicationContainer(LoginPage, false)}/>
        <Route path="/sign-up" component={ApplicationContainer(SignUpPage, false)}/>

        <Route path="/error" component={ErrorPage}/>
        <Route path='*' component={NotFoundPage}/>
    </Route>
);