import './style.scss';

import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Main extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header has-drawer is-upgraded">
                    <Header/>
                    <main className="wrapper mdl-layout__content">
                        <div className="wrapper-page-content ">
                            {this.props.children}
                        </div>
                        <div className="mdl-layout-spacer"></div>
                        <Footer/>
                    </main>
                </div>
            </MuiThemeProvider>
        )
    }
}