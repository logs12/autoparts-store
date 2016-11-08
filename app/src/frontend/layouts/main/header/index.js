import React, { Component } from 'react'

import  MainMenu  from '../../../components/MainMenu';

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