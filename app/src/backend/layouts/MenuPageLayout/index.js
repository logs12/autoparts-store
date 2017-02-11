import './style.scss';

import React, { Component } from 'react';
import { Layout, Header, Content, Drawer, Navigation } from 'react-mdl/lib/Layout';

import DrawerHeader from '../../containers/DrawerHeader';
import ProgressBarWidget from '../../../widgets/progress-bar-widget';

import DrawnerMenu from '../../components/DrawerMenu';

const MenuPageLayout = props => {
    return (
        <Layout fixedHeader className="menu-page-layout">

            <Header title={<span><span style={{ color: '#ddd' }}>Area / </span><strong>The Title</strong></span>}>
                <Navigation>
                    <a href="">Link</a>
                    <a href="">Link</a>
                    <a href="">Link</a>
                    <a href="">Link</a>
                </Navigation>
            </Header>
            <ProgressBarWidget />
            <section className="breadcrumbs"></section>
            <Drawer className="mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                <DrawerHeader />
                <DrawnerMenu />
            </Drawer>
            <Content >{props.children}</Content>
        </Layout>
    );
};

export default MenuPageLayout;