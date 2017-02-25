import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import IconButton from 'react-mdl/lib/IconButton';
import Tooltip from 'react-mdl/lib/Tooltip';
import Menu, { MenuItem } from 'react-mdl/lib/Menu';


/**
 *
 * @param rowMenuActions
 * @param menuItemKey
 * @param onclickHandler
 * @returns {{menuItemComponent: Array, actionButtonIconComponent: Array, onClick: *}}
 */
const renderActionComponent = (rowMenuActions, menuItemKey, onclickHandler) => {

    let menuItemComponent = [];
    let actionButtonIconComponent = [];
    let onClick = null;

    let clickRow = rowMenuActions.settings.hasOwnProperty('clickRow') ?
            rowMenuActions.settings.clickRow : false,

        showInMenu = rowMenuActions.settings.hasOwnProperty('showInMenu') ?
            rowMenuActions.settings.showInMenu : false,

        nameIconButton = rowMenuActions.settings.hasOwnProperty('nameIconButton') ?
            rowMenuActions.settings.nameIconButton : 'arrow_drop_down_circle';

    if (clickRow) {
        onClick = onclickHandler;
    } else {
        if (showInMenu) {
            menuItemComponent.push(
                <MenuItem key={menuItemKey}
                          onClick={onclickHandler}>
                    {rowMenuActions.title}
                </MenuItem>
            );
        } else {
            actionButtonIconComponent.push(
                <Tooltip label={rowMenuActions.title}>
                    <IconButton key={menuItemKey}
                                name={nameIconButton}
                                onClick={onclickHandler} />
                </Tooltip>
            );
        }
    }

    return {menuItemComponent, actionButtonIconComponent, onClick}
};

/**
 * Render roe actions menu
 * @param rowMenuActions
 * @param row
 * @param idx
 * @param columnChildren
 * @param dispatch
 * @returns {*|Array}
 */
const renderRowMenuActions = (rowMenuActions, row, idx, columnChildren, dispatch) => {

    let menuItemComponents = [];
    let actionButtonIconComponents = [];

    // Handler on td table
    let onClickCell = null;

    let menuItemKey = 0;

    for(let rowMenuAction in rowMenuActions) {

        if (!rowMenuActions.hasOwnProperty(rowMenuAction)) continue;

        switch (rowMenuAction) {
            case 'actionView': {

                let { menuItemComponent, actionButtonIconComponent , onClick} = {...renderActionComponent(
                    rowMenuActions[rowMenuAction],
                    menuItemKey,
                    () => dispatch(push(rowMenuActions[rowMenuAction].url(row['id']))),
                    row
                )};

                if (menuItemComponent.length) { menuItemComponents.push(menuItemComponent) }
                if (actionButtonIconComponent.length) { actionButtonIconComponents.push(actionButtonIconComponent) }
                onClickCell = onClickCell ? onClickCell : onClick;
                break;
            }
            case 'actionUpdate': {
                let { menuItemComponent, actionButtonIconComponent , onClick} = {...renderActionComponent(
                    rowMenuActions[rowMenuAction],
                    menuItemKey,
                    () => dispatch(push(rowMenuActions[rowMenuAction].url(row['id']))),
                    row
                )};

                if (menuItemComponent.length) { menuItemComponents.push(menuItemComponent) }
                if (actionButtonIconComponent.length) { actionButtonIconComponents.push(actionButtonIconComponent) }
                onClickCell = onClickCell ? onClickCell : onClick;
                break;
            }
            case 'actionDelete': {
                let { menuItemComponent, actionButtonIconComponent , onClick} = {...renderActionComponent(
                    rowMenuActions[rowMenuAction],
                    menuItemKey,
                    () => rowMenuActions[rowMenuAction].dispatchAction(row['id']),
                    row
                )};

                if (menuItemComponent.length) { menuItemComponents.push(menuItemComponent) }
                if (actionButtonIconComponent.length) { actionButtonIconComponents.push(actionButtonIconComponent) }
                onClickCell = onClickCell ? onClickCell : onClick;
                break;
            }
        }
        menuItemKey++;
    }

    let menuId = `menu-lower-right${row['id']}`;

    // Push usually td
    let cellComponent = columnChildren.map((child, index) => {

        const className = classNames(
            !child.props.numeric ? 'mdl-data-table__cell--non-numeric' : '',
            onClickCell ? 'mdl-data-table__cell--cursor-pointer' : ''
        );

        return <td key={index} className={className} onClick={onClickCell}>
            {child.props.cellFormatter ? child.props.cellFormatter(row[child.props.name], row, idx) : row[child.props.name]}
        </td>
    });

    // Push action td
    cellComponent.push(
        <td key={cellComponent.length} >
            <div className="table-widget__action-cell">
                <div className="table-widget__action-button-icon">
                    {actionButtonIconComponents}
                </div>
                {menuItemComponents.length ?
                    <div className="table-widget__action-menu">
                        <IconButton name="more_vert" id={menuId}/>
                        <Menu target={menuId} align="right">
                            {menuItemComponents}
                        </Menu>
                    </div>
                : null}
            </div>
        </td>
    );
    return cellComponent;

};

const TableRow = (props) => {
    const {columnChildren, rowKeyColumn, rowMenuActions, row, idx} = { ...props};

    const { className: mdlRowPropsClassName, ...remainingMdlRowProps } = row.mdlRowProps || {};

    return (
        <tr
            key={row[rowKeyColumn] || row.key || idx}
            className={classNames(row.className, mdlRowPropsClassName)}
            {...remainingMdlRowProps}
        >
            {renderRowMenuActions(rowMenuActions, row, idx, columnChildren, props['dispatch'])}
        </tr>
    );
};

export default connect()(TableRow)