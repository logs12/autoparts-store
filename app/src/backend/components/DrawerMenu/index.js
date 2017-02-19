import './style.scss';

import React, { Component } from 'react';
import Icon from 'react-mdl/lib/Icon';
import { Navigation } from 'react-mdl/lib/Layout';
import NavLink from '../../../common/widgets/nav-link/component';

import {
    ADMINISTRATION_ROUTE,
    ADMIN_ROUTE
} from '../../../common/constants';


const DrawerMenu = props => {
    return (
        <Navigation className="drawer-menu mdl-color--blue-grey-800">
            <NavLink
                to={ADMIN_ROUTE}
                className="drawer-menu__nav-link"
                onClick={props.onClick}
            >
                <Icon name="home" />Home
            </NavLink>
            <NavLink
                to={ADMINISTRATION_ROUTE}
                className="drawer-menu__nav-link"
                onClick={props.onClick}
            >
                <Icon name="people" />Administration
            </NavLink>
        </Navigation>
    );
};

export default DrawerMenu;
