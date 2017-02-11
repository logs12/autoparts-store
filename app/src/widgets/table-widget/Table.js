import React, { PropTypes } from 'react';
import classNames from 'classnames';
import clamp from 'clamp';
import shadows from 'react-mdl/lib/utils/shadows';
import TableHeader from './TableHeader';
import TableActionsHeader from './TableActionsHeader';
import TablePaging from './TablePaging';
import makeSelectable from './Selectable';
import makeSortable from './Sortable';

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
    actionsTableBody: PropTypes.arrayOf(
        PropTypes.object
    ),
};

class Table extends React.Component {

    /**
     *
     * @param column
     * @param row
     * @param idx
     * @returns {XML}
     */
    renderCell(column, row, idx) {
        const className = !column.numeric ? 'mdl-data-table__cell--non-numeric' : '';
        return (
            <td key={column.name} className={className}>
                {column.cellFormatter ? column.cellFormatter(row[column.name], row, idx) : row[column.name]}
            </td>
        );
    }

    /**
     * Rendering rows
     * @param realRows
     * @param columnChildren
     * @param rowKeyColumn
     * @param actionsTableBody - actions table body
     * @returns {Array}
     */
    renderRows(realRows, columnChildren, rowKeyColumn, actionsTableBody) {

        /*@@@@@@@@@@@@@@@@@@@*/
        let trComponent = [];
        trComponent.push(
            realRows.map((row, idx) => {
                const { className: mdlRowPropsClassName, ...remainingMdlRowProps } = row.mdlRowProps || {};

                return (
                    <tr
                        key={row[rowKeyColumn] || row.key || idx}
                        className={classNames(row.className, mdlRowPropsClassName)}
                        {...remainingMdlRowProps}
                    >
                        {columnChildren.map((child) => this.renderCell(child.props, row, idx))}
                    </tr>
                );
            })
        );
        return trComponent;
    }

    render() {

        const { className, columns, shadow, children,
            rowKeyColumn, rows, data, actionsTableHeader, actionsTableBody, ...otherProps } = this.props;
        const realRows = rows || data;

        const hasShadow = typeof shadow !== 'undefined';
        const shadowLevel = clamp(shadow || 0, 0, shadows.length - 1);

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
            <div className="widget-table wide mdl-card mdl-shadow--2dp">
                    <TableActionsHeader actions={actionsTableHeader} />
                    <div className="widget-table__table">
                        <table className={classes} {...otherProps}>
                            <thead>
                                <tr>
                                    {columnChildren}
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderRows(realRows, columnChildren, rowKeyColumn, actionsTableBody)}
                            </tbody>
                        </table>
                    </div>
                    <TablePaging />
            </div>
        );
    }
}

Table.propTypes = propTypes;

export default makeSortable(makeSelectable(Table));
export const UndecoratedTable = Table;