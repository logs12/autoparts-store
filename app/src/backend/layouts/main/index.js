import './style.scss';

import React, { Component } from 'react';

import { Layout, Header, Content, Drawer, Navigation } from 'react-mdl/lib/Layout';
import IconButton from 'react-mdl/lib/IconButton';
import Menu, { MenuItem } from 'react-mdl/lib/Menu';

import ProgressBar from '../../../widgets/progress-bar';


export default class BackendLayout extends Component {

    render() {
        return (
            <Layout fixedHeader fixedDrawer className="backend-layout">

                <Header title={<span><span style={{ color: '#ddd' }}>Area / </span><strong>The Title</strong></span>}>
                    <Navigation>
                        <a href="">Link</a>
                        <a href="">Link</a>
                        <a href="">Link</a>
                        <a href="">Link</a>
                    </Navigation>
                </Header>
                <ProgressBar indeterminate />
                <section className="breadcrumbs"></section>
                <Drawer className="drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                    <header className="drawer-header">
                        <img src="/images/user.jpg" className="avatar" />
                        <div className="avatar-dropdown">
                            <span className="user-fio">Фамилия #1 Администратор портала Отчество #1</span>
                            <div className="mdl-layout-spacer"></div>

                            <IconButton name="arrow_drop_down" id="demo-menu-lower-right" />
                            <Menu target="demo-menu-lower-right" align="right">
                                <MenuItem>Выход</MenuItem>
                            </Menu>
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
    }
}
