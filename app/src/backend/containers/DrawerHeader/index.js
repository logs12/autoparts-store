import React, { Component } from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import IconButton from 'react-mdl/lib/IconButton';
import Menu, { MenuItem } from 'react-mdl/lib/Menu';

import { logOutAction } from '../../../common/actions/AuthAction';

@connect(
    (state) => ({ // mapStateToProps
        configData: state.common.configData,
    }),
    dispatch => ({ // mapDispatchToProps
        actions: bindActionCreators({ logOutAction }, dispatch),
        dispatch: dispatch,
    })
)

export default class DrawerHeader extends Component {


    state = {
        userFullName: '',
    };

    componentWillMount() {
        this.userFullName(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.userFullName(nextProps);

    }

    userFullName(props) {
        if (!_.isEmpty(props.configData.user)) {
            this.state.userFullName = props.configData.user['first_name'] + ' '
                + props.configData.user['second_name'] + ' '
                + props.configData.user['third_name'];
        }
    }

    logOutHandler(event) {
        event.preventDefault();
        console.log('event',event);
        this.props.actions.logOutAction();
    }

    render() {
        return(
            <header className="drawer-header">
                <img src="/images/user.jpg" className="avatar" />
                <div className="avatar-dropdown">
                    <span className="user-fio">{this.state.userFullName}</span>
                    <div className="mdl-layout-spacer"></div>

                    <IconButton name="arrow_drop_down" id="demo-menu-lower-right" />
                    <Menu target="demo-menu-lower-right" align="right">
                        <MenuItem onClick={::this.logOutHandler}>Выход</MenuItem>
                    </Menu>
                </div>
            </header>
        );
    }
}