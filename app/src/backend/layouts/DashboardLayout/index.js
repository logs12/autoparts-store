import './style.scss';

import React, { Component } from 'react';
import { Layout, Header, Content, Drawer, Navigation } from 'react-mdl/lib/Layout';

import NavLink from '../../../widgets/nav-link/component';
import DrawerHeader from '../../containers/DrawerHeader';
import ProgressBar from '../../../widgets/progress-bar';


export default class DashboardLayout extends Component {

    render() {
        return (
            <Layout fixedHeader fixedDrawer className="dashboard-layout">

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
                    <DrawerHeader />
                    <Navigation className="navigation mdl-color--blue-grey-800">
                        <NavLink
                            to='/users'
                            className="main-menu__a main-menu__a--brand">
                        </NavLink>
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
