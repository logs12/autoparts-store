import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as _ from 'lodash';
import TableWidget from '../../../../common/widgets/table-widget';

import * as actions from '../../../actions/UserAction';
import {
    USERS_ROUTE,
    USER_CREATE_ROUTE,
    USER_VIEW_ROUTE,
    USER_UPDATE_ROUTE,
    USER_DELETE_ROUTE,
} from '../../../../common/constants';


const mapStateToProps = (state, ownProps) => {
    const condition =  ownProps.location.search;

    return {  condition };
};
@connect(
    (state, ownProps) => ({
        userCollection: state.Users.collection,
        condition: ownProps.location.search,
    }),
    (dispatch) => ({ // mapDispatchToProps
        userActions: bindActionCreators(actions, dispatch)
    })
)
export default class UsersPage extends Component{

    componentWillMount() {

        //debugger;
        this.props.userActions.UsersGetAction({condition: this.props.condition});
    }

    componentWillReceiveProps(nextProps) {
        //debugger;
        if (this.props.condition != nextProps.condition) {
            this.props.userActions.UsersGetAction({condition: nextProps.condition});
        }
    }

    render() {
        return (
            <div className="users-page">
                {(!_.isEmpty(this.props.userCollection)) ?
                    <TableWidget

                        actionsTableHeader={[
                            {
                                title: 'Add',
                                iconName: 'add',
                                link: USER_CREATE_ROUTE,
                            }
                        ]}

                        rowMenuActions = {{
                                actionView: {
                                    title: 'View',
                                    url: USER_VIEW_ROUTE,
                                    settings: {
                                        clickRow: true,
                                    },
                                },
                                actionUpdate: {
                                    title: 'Edit',
                                    url: USER_UPDATE_ROUTE,
                                    settings: {
                                        nameIconButton: 'edit',
                                    },
                                },
                                actionDelete: {
                                    title: 'Delete',
                                    dispatchAction: this.props.userActions.UserDeleteAction,
                                    settings: {
                                        nameIconButton: 'delete',
                                    },
                                },
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
                        collection = {this.props.userCollection}

                        paginationOptions ={{
                            entityName: "Users",
                            actionName:"UsersGetAction",
                            paginationUrl: USERS_ROUTE,
                        }}

                        shadow={0}
                        className="wide"
                    >
                    </TableWidget>
                    : null}
            </div>
        );
    }

};