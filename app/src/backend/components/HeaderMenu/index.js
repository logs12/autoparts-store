import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-mdl/lib/Layout';
import Icon from 'react-mdl/lib/Icon';
import NavLink from '../../../common/widgets/nav-link/component';

import {
    USERS_ROUTE
} from '../../../common/constants';


const mapStateToProps = (state) => {
    return {
        routing: state.routing.locationBeforeTransitions,
    };
};

@connect(mapStateToProps)
export default class HeaderMenu extends Component {

    render () {
        return (
            <Navigation className="header-menu mdl-color--blue-grey-800">
                <NavLink
                    to={USERS_ROUTE}
                    className="drawer-menu__nav-link">
                    Users
                </NavLink>
            </Navigation>
        )
    }
}