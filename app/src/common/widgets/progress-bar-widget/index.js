import "./styles/style.scss";
import React, {Component} from "react";
import { connect } from 'react-redux';

import ProgressBarMdl from 'react-mdl/lib/ProgressBar';

const ProgressBarWidget = props => {
    return (
        (props.progressBarWidget.status === 'enabled') ?
            <ProgressBarMdl indeterminate className="progress-bar"/>
        : null
    )
};

function mapStateToProps (state) {
    return {
        progressBarWidget: state.common.progressBarWidget
    }
}

export default connect(mapStateToProps)(ProgressBarWidget)
