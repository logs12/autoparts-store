import './style.scss';

import React, { Component } from 'react';

import { Layout, Header, Content,Drawer, Navigation } from 'react-mdl/lib/Layout';
import { ProgressBar } from 'react-mdl/lib/ProgressBar';


export default class BackendLayout extends Component {

    render() {

        return (
                <Layout fixedHeader fixedDrawer className="backend-layout">
                    <ProgressBar indeterminate />
                    <Header title={<span><span style={{ color: '#ddd' }}>Area / </span><strong>The Title</strong></span>}>
                        <Navigation>
                            <a href="">Link</a>
                            <a href="">Link</a>
                            <a href="">Link</a>
                            <a href="">Link</a>
                        </Navigation>
                    </Header>

                    <section className="breadcrumbs"></section>
                    <Drawer className="drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                        <header className="drawer-header">
                            <img src="/images/user.jpg" className="avatar" />
                            <div className="avatar-dropdown">
                                <span className="user-fio">Фамилия #1 Администратор портала Отчество #1</span>
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
                        <Navigation className="navigation mdl-color--blue-grey-800">
                            <a href="">Link</a>
                            <a href="">Link</a>
                            <a href="">Link</a>
                            <a href="">Link</a>
                        </Navigation>
                    </Drawer>
                    <Content >{this.props.children}</Content>

                </Layout>
        );

       /* return {
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
            <main className="mdl-layout__content mdl-color--grey-100">{this.props.children}</main>
            <div className="mdl-layout-spacer"></div>
        </div>
        }*/
    }
}
