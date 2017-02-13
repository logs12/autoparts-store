import React, { Component } from 'react';
import { connect } from 'react-redux';

import ErrorComponent from './component';

const ErrorWidget = props => {
    return (
        <ErrorComponent
            messageError={props.errors.messageError}
            stackTraceError={props.errors.stackTraceError}
        />
    );
};

function mapStateToProps(state) {
    return { errors: state.SystemError }
}

export default connect(mapStateToProps)(ErrorWidget);
