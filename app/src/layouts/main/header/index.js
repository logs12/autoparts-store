import React, { Component } from 'react'
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlexMenu from '../../../components/FlexMenu';

export default class Header extends Component {

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    render() {
        return (
            <header>
                <AppBar title="Title" >
                    <FlexMenu />
                </AppBar>

            </header>
        );
    }
}

Header.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};