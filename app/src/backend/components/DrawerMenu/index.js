import './style.scss';

import React, { Component } from 'react';
import Icon from 'react-mdl/lib/Icon';
import { Navigation } from 'react-mdl/lib/Layout';
import NavLink from '../../../common/widgets/nav-link/component';

import {
    USERS_ROLES_ROUTE,
    ADMIN_ROUTE
} from '../../../common/constants';


const DrawerMenu = () => {
    return (
        <Navigation className="drawer-menu mdl-color--blue-grey-800">
            <NavLink
                to={ADMIN_ROUTE}
                className="drawer-menu__nav-link">
                <Icon name="home" />Home
            </NavLink>
            <NavLink
                to={USERS_ROLES_ROUTE}
                className="drawer-menu__nav-link">
                <Icon name="location_city" />Our Buildings
            </NavLink>
            <NavLink
                to={USERS_ROLES_ROUTE}
                className="drawer-menu__nav-link">
                <Icon name="people" />Administration
            </NavLink>
        </Navigation>
    );
};

export default DrawerMenu;
