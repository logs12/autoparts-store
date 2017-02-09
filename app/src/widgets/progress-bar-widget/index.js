import "./styles/style.scss";
import React, {Component} from "react";
import { connect } from 'react-redux';

import ProgressBarMdl from 'react-mdl/lib/ProgressBar';

const ProgressBarWidget = props => {
    return (
        (props.progressBar.status === 'enabled') ?
            <ProgressBarMdl indeterminate className="progress-bar"/>
        : null
    )
};

function mapStateToProps (state) {
    return {
        progressBar: state.ProgressBar
    }
}

export default connect(mapStateToProps)(ProgressBarWidget)
