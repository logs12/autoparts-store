import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as _ from 'lodash';
import TableWidget from '../../../../common/widgets/table-widget';

import * as actions from '../../../actions/UserAction';
import { USER_CREATE_ROUTE } from '../../../../common/constants';

@connect(
    (state) => ({
        users: state.Users
    }),
    (dispatch) => ({ // mapDispatchToProps
        userActions: bindActionCreators(actions, dispatch)
    })
)
export default class UsersPage extends Component{

    componentWillMount() {
        this.props.userActions.UsersGetAction();
    }
    render() {
        return (
            <div className="users-page">
                {(!_.isEmpty(this.props.users)) ?
                    <TableWidget
                        actionsTableHeader={[
                            {
                                title: 'Add',
                                iconName: 'add',
                                link: USER_CREATE_ROUTE,
                            }
                        ]}

                        rowMenuActions = {{
                                actionView: 'View',
                                actionUpdate: 'Edit',
                                actionDelete: 'Delete',
                        }}

                        attributes={
                            {
                                first_name: {
                                    title: 'First name',
                                    propsTableHeader: {
                                        tooltip: 'First name tooltip',
                                    },
                                },
                                second_name: {
                                    title: 'Second name',
                                    propsTableHeader: {
                                        tooltip: 'Second name tooltip',
                                    },
                                },

                                third_name: {
                                    title: 'Third name',
                                    propsTableHeader: {
                                        tooltip: 'Third name tooltip',
                                    },
                                },
                                phone: {
                                    title: 'Phone',
                                    propsTableHeader: {
                                        tooltip: 'phone name tooltip',
                                    },
                                },
                                email: {
                                    title: 'Email',
                                    propsTableHeader: {
                                        tooltip: 'email name tooltip',
                                    },
                                },
                            }
                        }
                        collection = {this.props.users}
                        shadow={0}
                        className="wide"
                    >
                    </TableWidget>
                    : null}
            </div>
        );
    }

};