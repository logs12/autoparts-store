import React, { Component } from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Tooltip from 'react-mdl/lib/Tooltip';
import Icon from 'react-mdl/lib/Icon';
import FABButton from 'react-mdl/lib/FABButton';
import Textfield from 'react-mdl/lib/Textfield';

@connect(
    (state) => ({
        routing: state.routing,
    })
)
export default class TableActionsHeader extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * Render actions button
     * @returns {Array}
     */
    renderActionButton() {
        let actionComponents = [];
        if(this.props.actions.length) {
            this.props.actions.forEach((action, index) => {
                actionComponents.push(
                    <Tooltip key={index} label={action.title}>
                        <FABButton mini className="table-widget__action-button">
                            <Icon name={action.iconName} onClick = {() => {this.props.dispatch(push(action.link))}} />
                        </FABButton>
                    </Tooltip>
                );
            });
        }
        return actionComponents;
    }

    render() {
        return(
            <div className="table-widget__actions">
                <div className="table-widget__links">
                    {this.renderActionButton()}
                </div>

                <div className="mdl-layout-spacer"></div>

                <div className="table-widget__tools">
                    <Tooltip label="Search">
                        <Textfield
                            onChange={() => {}}
                            label="Search"
                            expandable
                            expandableIcon="search"
                        />
                    </Tooltip>
                </div>

            </div>
        )
    }
}