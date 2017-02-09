import React, { Component } from 'react';
import Tooltip from 'react-mdl/lib/Tooltip';


class SearchWidgets extends Component {

    static propTypes = {

    };

    render() {
        return(
            <div className="widget-table__actions">
                <div className="widget-table__links">

                    <button id="widget-table__action-add" className="widget-table__button-add mdl-button mdl-js-button mdl-button--icon mdl-button--primary" data-upgraded=",MaterialButton" tabindex="0">
                        <i className="material-icons">add</i>
                    </button>
                    <Tooltip label={tooltip}>Add</Tooltip>

                </div>

                <div className="mdl-layout-spacer"></div>

                <div className="widget-table__tools">
                    <div className="widget-table__tools-filter mdl-textfield mdl-js-textfield mdl-textfield--expandable is-upgraded" data-upgraded=",MaterialTextfield" style="display: block;">
                        <label id="widget-table__tools-seach" className="mdl-button mdl-js-button mdl-button--icon" htmlFor="widget-table__tools-filter-id" data-upgraded=",MaterialButton" tabindex="0">
                            <i className="material-icons">search</i>
                        </label>

                        <Tooltip label={tooltip}>Search</Tooltip>
                        <div className="mdl-textfield__expandable-holder">
                            <input className="widget-table__tools-filter-input mdl-textfield__input" type="text" id="widget-table__tools-filter-id" />
                            <label className="mdl-textfield__label" htmlFor="widget-table__tools-filter-id">Search...</label>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}