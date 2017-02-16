import React, { Component } from 'react';
import { Navigation } from 'react-mdl/lib/Layout';

import Icon from 'react-mdl/lib/Icon';
import { Navigation } from 'react-mdl/lib/Layout';
import NavLink from '../../../common/widgets/nav-link/component';

export default class HeaderMenu extends Component {
    render () {
        return (
            <Navigation>
                <a href="">Link</a>
                <a href="">Link</a>
                <a href="">Link</a>
                <a href="">Link</a>
            </Navigation>
        )
    }
}