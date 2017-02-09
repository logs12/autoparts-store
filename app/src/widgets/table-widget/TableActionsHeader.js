import React, { Component } from 'react';
import Tooltip from 'react-mdl/lib/Tooltip';
import Icon from 'react-mdl/lib/Icon';
import FABButton from 'react-mdl/lib/FABButton';
import Textfield from 'react-mdl/lib/Textfield';


export default class TableActionsHeader extends Component {

    static propTypes = {

    };

    render() {
        return(
            <div className="widget-table__table-header-actions">
                <div className="widget-table__links">
                    <Tooltip label="Add">
                        <FABButton mini>
                            <Icon name="add" />
                        </FABButton>
                    </Tooltip>
                </div>

                <div className="mdl-layout-spacer"></div>

                <div className="widget-table__tools">
                    <Tooltip label="Search">
                        <Textfield
                            value=""
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