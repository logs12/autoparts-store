import React, { PropTypes, Component, createElement } from 'react';
import classNames from 'classnames';
import clamp from 'clamp';
import shadows from 'react-mdl/lib/utils/shadows';
import TableHeader from './TableHeader';
import TableActionsHeader from './TableActionsHeader';
import PaginationWidget from '../pagination-widget/container';
import makeSelectable from './Selectable';
import makeSortable from './Sortable';
import TableRow from './TableRow';

const propTypes = {
    className: PropTypes.string,
    columns: (props, propName, componentName) => (
        props[propName] && new Error(`${componentName}: \`${propName}\` is deprecated, please use the component \`TableHeader\` instead.`)
    ),
    data: (props, propName, componentName) => (
        props[propName] && new Error(`${componentName}: \`${propName}\` is deprecated, please use \`rows\` instead. \`${propName}\` will be removed in the next major release.`)
    ),
    rowKeyColumn: PropTypes.string,
    rows: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired,
    shadow: PropTypes.number,
    actionsTableHeader: PropTypes.arrayOf(
        PropTypes.object
    ),
    rowMenuActions: PropTypes.object,
};

class Table extends Component {


    render() {
        const {actionsTableHeader, rowMenuActions, rows, className, columns, shadow, children,
            rowKeyColumn, data, paginationOptions, ...otherProps } = this.props;
        const realRows = rows || data;

        const hasShadow = typeof shadow !== 'undefined';
        const shadowLevel = clamp(shadow || 0, 0, shadows.length - 1);

        // Pagination options
        const entityName = paginationOptions && paginationOptions.hasOwnProperty('entityName') ? paginationOptions.entityName : null;
        const actionName = paginationOptions && paginationOptions.hasOwnProperty('actionName') ? paginationOptions.actionName : null;
        const paginationUrl = paginationOptions && paginationOptions.hasOwnProperty('paginationUrl') ? paginationOptions.paginationUrl : null;

        const classes = classNames('mdl-data-table', {
            [shadows[shadowLevel]]: hasShadow
        }, className);

        const columnChildren = !!children
            ? React.Children.toArray(children)
            : columns.map(column =>
                <TableHeader
                    key={column.name}
                    className={column.className}
                    name={column.name}
                    numeric={column.numeric}
                    tooltip={column.tooltip}
                >
                    {column.label}
                </TableHeader>
            );
        return (
            <div className="table-widget wide mdl-card mdl-shadow--2dp">
                    <TableActionsHeader actions={actionsTableHeader} />
                    <div className="table-widget__table">
                        <table className={classes} {...otherProps}>
                            <thead>
                                <tr>
                                    {columnChildren}
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    realRows.map((row, idx) => {
                                        return <TableRow
                                            columnChildren={columnChildren}
                                            rowKeyColumn={rowKeyColumn}
                                            rowMenuActions={rowMenuActions}
                                            row={row}
                                            idx={idx}
                                            key={idx}
                                        />
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="table-widget__pagination">
                        {createElement(PaginationWidget(entityName, paginationUrl))}
                    </div>
            </div>
        );
    }
}

Table.propTypes = propTypes;

export default makeSortable(makeSelectable(Table));
export const UndecoratedTable = Table;
