import React, { Component } from 'react';

import Icon from 'react-mdl/lib/Icon';
import Button from 'react-mdl/lib/Button';

export default class TablePaging extends Component {

    handleArrowLeft() {

    }

    handleArrowRigh() {

    }

    render() {
        return(
            <div className="widget-table__paging">
                <div className="mdl-layout-spacer"></div>
                    <div className="widget-table__pager">
                        <span>Lines per page:</span>
                        <span className="widget-table__pager-per-page">20</span>
                        <span className="widget-table__pager-start">1</span>
                        <span>-</span>
                        <span className="widget-table__pager-end">20</span>
                        <span className="widget-table__pager-text widget-table__pager-text--narrow">of</span>
                        <span className="widget-table__pager-total">90</span>
                        <span className="widget-table__pager-navigation">
                        <Button raised className="widget-table__pager-previous" onClick={}><Icon name="keyboard_arrow_left"/></Button>
                        <Button raised className="widget-table__pager-next" onClick={}><Icon name="keyboard_arrow_right"/></Button>
                    </span>
                </div>
            </div>
        )
    }
}