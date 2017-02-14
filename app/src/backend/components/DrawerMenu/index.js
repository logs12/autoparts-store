import './style.scss';

import React, { Component } from 'react';

import { USERS_ROLES_ROUTE } from '../../../common/constants';

import { Navigation } from 'react-mdl/lib/Layout';
import NavLink from '../../../common/widgets/nav-link/component';

const DrawerMenu = () => {
    return (
        <Navigation className="drawer-menu mdl-color--blue-grey-800">
            <NavLink
                to={USERS_ROLES_ROUTE}
                className="drawer-menu__nav-link">
                <i className="drawer-menu__icon fa fa-users" aria-hidden="true"></i>Users and Roles
            </NavLink>
        </Navigation>
    );
};

export default DrawerMenu;
