import './style.scss';
import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import TableHeader  from './TableHeader';
import Table  from './Table';

/*export { default as TableHeader } from './TableHeader';
export { default as Table } from './Table';
export { default } from './Table';*/

import { USER_CREATE_ROUTE } from '../../constants';


export default class TableWidget extends Component {

    static propTypes = {
        actions: PropTypes.arrayOf(
            PropTypes.object
        ),
        attributes:PropTypes.object.isRequired
    };

    renderTableHeader(attributes) {
        let componentTableHeader = [];
        if (!_.isEmpty(attributes)) {
            let key = 0;
            for (let attribute in attributes) {
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
        const { actions, attributes, collection, ...otherProperties } = this.props;
        return(
            <Table
                actions={actions}
                rows = {collection}
                { ...otherProperties }
            >
                {this.renderTableHeader(attributes)}
            </Table>
        )
    }
}


