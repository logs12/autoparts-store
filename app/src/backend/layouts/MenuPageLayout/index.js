import './style.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Header, Content, Drawer, Navigation } from '../../../common/widgets/layout-widget';

import DrawerHeader from '../../containers/DrawerHeader';
import DrawnerMenu from '../../components/DrawerMenu';

import NavLink from '../../../common/widgets/nav-link/component';
import ProgressBarWidget from '../../../common/widgets/progress-bar-widget';
import SnackbarWidget from '../../../common/widgets/snackbar-widget';

import {
    USERS_ROUTE
} from '../../../common/constants';

const mapStateToProps = state => {
    return {
        pathname: state.routing.locationBeforeTransitions.pathname,
    };
};

@connect(mapStateToProps)

export default class MenuPageLayout extends Component {

    state = {
        navLinks: [],
        title: null,
        fixedDrawer: false,
    };

    clickMenuItem = false;

    onClickNavLick() {
        this.clickMenuItem = true;
    }

    /**
     * @param pathname
     */
    renderSubComponentFromPathname(pathname) {
        if (pathname.indexOf("administration") !== -1) {
            this.setState({
                navLinks: [
                    <NavLink
                        key="users"
                        to={USERS_ROUTE}
                        className="drawer-menu__nav-link"
                    >
                        Users
                    </NavLink>
                ],
                title: 'Administration',
                fixedDrawer: false,
            });

        } else {
            this.setState({
                navLinks: [],
                fixedDrawer:true,
                title: 'Home',
            });
        }
    }

    componentWillMount() {
        this.renderSubComponentFromPathname(this.props.pathname);
    }

    componentWillReceiveProps(nextProps) {
        this.renderSubComponentFromPathname(nextProps.pathname);
    }

    render() {
        return (
            <div>
                <Layout fixedHeader fixedDrawer={this.state.fixedDrawer} className="menu-page-layout"  clickMenuItem = {this.clickMenuItem}>
                    <Header title={<span><span style={{ color: '#ddd' }}>
                    {this.state.title} </span><strong></strong></span>}>
                        <Navigation className="header-menu mdl-color--blue-grey-800">
                            {this.state.navLinks}
                        </Navigation>
                    </Header>
                    <ProgressBarWidget />
                    <section className="breadcrumbs"></section>
                    <Drawer className="mdl-color--blue-grey-900 mdl-color-text--blue-grey-50"  >
                        <DrawerHeader />
                        <DrawnerMenu onClick={::this.onClickNavLick} />
                    </Drawer>
                    <Content >{this.props.children}</Content>
                    <SnackbarWidget />
                </Layout>
            </div>
        );
    }
};

