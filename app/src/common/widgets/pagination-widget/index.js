import './style.scss';

import React, { Component } from 'react';

import Icon from 'react-mdl/lib/Icon';
import Button from 'react-mdl/lib/Button';

export default class PaginationWidget extends Component {
    render() {
        return(
            <div className="pagination-widget">
                <div className="mdl-layout-spacer"></div>
                <div className="pagination-widget__pager">
                    <span>Lines per page:</span>
                    <span className="pagination-widget__pager-per-page">20</span>
                    <span className="pagination-widget__pager-start">1</span>
                    <span>-</span>
                    <span className="pagination-widget__pager-end">20</span>
                    <span className="pagination-widget__pager-text widget-table__pager-text--narrow">of</span>
                    <span className="pagination-widget__pager-total">90</span>
                    <span className="pagination-widget__pager-navigation">
                        <Button raised className="pagination-widget__pager-previous" ><Icon name="keyboard_arrow_left"/></Button>
                        <Button raised className="pagination-widget__pager-next"><Icon name="keyboard_arrow_right"/></Button>
                    </span>
                </div>
            </div>
        )
    }
}