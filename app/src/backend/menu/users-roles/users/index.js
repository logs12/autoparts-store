import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as _ from 'lodash';
//import DataTable, { TableHeader } from 'react-mdl/lib/DataTable';
import TableWidget from '../../../../widgets/table-widget';

import IconButton from 'react-mdl/lib/IconButton';
import Menu, { MenuItem } from 'react-mdl/lib/Menu';

import * as actions from '../../../actions/UserAction';
import { USER_CREATE_ROUTE } from '../../../../constants';

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

    componentWillReceiveProps(nextProps) {

        let rows=[
             {
             material: 'Acrylic (Transparent)',
             quantity: 25,
             price: 2.90,
             actions:<div style={{position: 'relative'}}>
             <IconButton name="more_vert" id="demo-menu-lower-left" />
             <Menu target="demo-menu-lower-left" align="right">
             <MenuItem>Views</MenuItem>
             <MenuItem>Update</MenuItem>
             <MenuItem>Delete</MenuItem>
             </Menu>
             </div>

             },
         ]
    }


    render() {
        return (
            <div className="users-page">
                {(!_.isEmpty(this.props.users)) ?
                    <TableWidget
                        actions={[
                            {
                                title: 'Add',
                                iconName: 'add',
                                link: USER_CREATE_ROUTE,
                            }
                        ]}
                        attributes={
                            {
                                first_name: {
                                    title: 'first_name',
                                    propsTableHeader: {
                                        tooltip: 'First name tooltip',
                                    },
                                },
                                second_name: {
                                    title: 'second_name',
                                    propsTableHeader: {
                                        tooltip: 'Second name tooltip',
                                    },
                                },

                                third_name: {
                                    title: 'third_name',
                                    propsTableHeader: {
                                        tooltip: 'Third name tooltip',
                                    },
                                },
                                phone: {
                                    title: 'phone',
                                    propsTableHeader: {
                                        tooltip: 'phone name tooltip',
                                    },
                                },
                                email: {
                                    title: 'email',
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