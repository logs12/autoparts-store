import './style.scss';
import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import TableHeader  from './TableHeader';
import Table  from './Table';

export default class TableWidget extends Component {

    static propTypes = {
        actionsTableHeader: PropTypes.arrayOf(
            PropTypes.object
        ),
        rowMenuActions: PropTypes.object,
        attributes: PropTypes.object.isRequired,
    };

    renderTableHeader(attributes) {
        let componentTableHeader = [];
        if (!_.isEmpty(attributes)) {
            let key = 0;
            for (let attribute in attributes) {
                if (!attributes.hasOwnProperty(attribute)) continue;
                const { title, ...otherProps } = attributes[attribute];
                componentTableHeader.push(
                    <TableHeader key = {key} name = {attribute} { ...otherProps.propsTableHeader }>{title}</TableHeader>
                );
                key++;
            }
        }
        return componentTableHeader;
    }

    render() {
        const { actionsTableHeader, rowMenuActions, attributes, collection, ...otherProperties } = this.props;
        return(
            <Table
                actionsTableHeader={actionsTableHeader}
                rowMenuActions={rowMenuActions}
                rows = {collection}
                { ...otherProperties }
            >
                {this.renderTableHeader(attributes)}
            </Table>
        )
    }
}


