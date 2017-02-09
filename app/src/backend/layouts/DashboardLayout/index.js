import './style.scss';

import React, { Component } from 'react';
import { Layout, Header, Content, Drawer, Navigation } from 'react-mdl/lib/Layout';

import DrawerHeader from '../../containers/DrawerHeader';

import DrawnerMenu from '../../components/DrawerMenu';


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
                <section className="breadcrumbs"></section>
                <Drawer className="mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                    <DrawerHeader />
                    <DrawnerMenu />
                </Drawer>
                <Content >{this.props.children}</Content>

            </Layout>
        );
    }
}
