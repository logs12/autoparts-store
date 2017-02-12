import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import IconButton from 'react-mdl/lib/IconButton';
import Menu, { MenuItem } from 'react-mdl/lib/Menu';
import {
    USER_VIEW_ROUTE,
    USER_UPDATE_ROUTE,
    USER_DELETE_ROUTE,
} from '../../constants';

const renderRowMenuActions = (rowMenuActions, row, dispatch) => {
    let menuItemComponents = [];
    let menuItemKey = 0;
    for(let rowMenuAction in rowMenuActions) {
        if (!rowMenuActions.hasOwnProperty(rowMenuAction)) continue;
        switch (rowMenuAction) {
            case 'actionView': {
                menuItemComponents.push(
                    <MenuItem key={menuItemKey} onClick={() => dispatch(push(USER_VIEW_ROUTE(row['id'])))}>
                        {rowMenuActions[rowMenuAction]}
                    </MenuItem>);
            }
        }
        menuItemKey++;
    }
    let menuId = `menu-lower-right${row['id']}`;
    return  <td>
        <IconButton name="more_vert" id={menuId} />
        <Menu target={menuId} align="right">
            {menuItemComponents}
        </Menu>
    </td>;
};

const TableRowMenuActions = (props) => {
    const {rowMenuActions, row} = { ...props};

    return(
        renderRowMenuActions(rowMenuActions, row, props.dispatch)
    )
};

export default connect()(TableRowMenuActions)