import './style.scss';

import React, { Component } from 'react';
import { Layout, Header, Content, Drawer, Navigation } from 'react-mdl/lib/Layout';

import DrawerHeader from '../../containers/DrawerHeader';
import ProgressBarWidget from '../../../common/widgets/progress-bar-widget';

import DrawnerMenu from '../../components/DrawerMenu';
import SnackbarWidget from '../../../common/widgets/snackbar-widget';

import HeaderMenu from '../../components/HeaderMenu';

const MenuPageLayout = props => {
    return (
        <Layout fixedHeader className="menu-page-layout">
            <Header title={<span><span style={{ color: '#ddd' }}>
                Area / </span><strong>The Title</strong></span>}>
                <HeaderMenu />
            </Header>
            <ProgressBarWidget />
            <section className="breadcrumbs"></section>
            <Drawer className="mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                <DrawerHeader />
                <DrawnerMenu />
            </Drawer>
            <Content >{props.children}</Content>
            <SnackbarWidget />
        </Layout>
    );
};

export default MenuPageLayout;
