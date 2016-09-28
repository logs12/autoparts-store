import React, { Component } from 'react'
import { Link } from 'react-router';

import FlexMenu from '../../../components/FlexMenu';

import  MainMenu  from '../../../containers/MainMenu';

export default class Header extends Component {

    render() {
        return (
            <header>
                <MainMenu />
            </header>
        );
    }
}

Header.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};