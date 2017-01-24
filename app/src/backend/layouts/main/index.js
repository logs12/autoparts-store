import './style.scss';

import React, { Component } from 'react';

export default class BackendLayout extends Component {

    render() {
        return (
            <div className="backend-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
                <header className="header mdl-layout__header mdl-color--white mdl-color-text--grey-600">
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title"></span>
                        <div className="mdl-layout-spacer"></div>
                        <nav className="mdl-navigation"></nav>
                    </div>
                    <div className="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
                </header>
                <section className="breadcrumbs"></section>
                <div className="drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                    <header className="drawer-header">
                        <img src="/images/user.jpg" className="avatar" />
                        <div className="avatar-dropdown">
                            <span className="user-fio"></span>
                            <div className="mdl-layout-spacer"></div>
                            <button id="accbtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                                <i className="material-icons" role="presentation">arrow_drop_down</i>
                                <span className="visuallyhidden">Accounts</span>
                            </button>
                            <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="accbtn">
                                <li className="mdl-menu__item">
                                    <a href="#logout">Выход</a>
                                </li>
                            </ul>
                        </div>
                    </header>
                    <nav className="navigation mdl-navigation mdl-color--blue-grey-800"></nav>
                </div>
                <main className="mdl-layout__content mdl-color--grey-100"></main>
                <div className="mdl-layout-spacer"></div>
            </div>
        )
    }
}
