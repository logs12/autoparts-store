import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as _ from 'lodash';
//import DataTable, { TableHeader } from 'react-mdl/lib/DataTable';
import DataTable, { TableHeader } from '../../../../widgets/table-widget';

import IconButton from 'react-mdl/lib/IconButton';
import Menu, { MenuItem } from 'react-mdl/lib/Menu';

import * as actions from '../../../actions/UserAction';

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
                    <DataTable
                        shadow={0}
                        rows = {this.props.users}
                        className="wide"
                    >

                        <TableHeader name="_model_cid" >Material</TableHeader>
                        <TableHeader name="email">Quantity</TableHeader>
                        <TableHeader name="first_name">Quantity</TableHeader>
                        <TableHeader name="id"></TableHeader>
                        <TableHeader name="phone"></TableHeader>
                        <TableHeader name="second_name"></TableHeader>
                        <TableHeader name="status_id"></TableHeader>
                        <TableHeader name="third_name"></TableHeader>
                    </DataTable>
                    : null}
            </div>
        );
    }

};