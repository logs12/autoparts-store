import React, { Component } from 'react'
import { Link } from 'react-router';

import FlexMenu from '../../../components/FlexMenu';

export default class Header extends Component {

    render() {
        return (
            <header>
                <FlexMenu />
            </header>
        );
    }
}

Header.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};