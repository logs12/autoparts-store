import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Snackbar from 'react-mdl/lib/Snackbar';
import * as actions from './actions';

const mapStateToProps = state => {
    return ({
        snackbarWidgetState: state.SnackbarWidget,
    });
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
};

@connect(mapStateToProps, mapDispatchToProps)

export default class SnackbarWidget extends Component {

    state = {
        isSnackbarActive: false,
    };

    componentWillMount() {
        this.setState({ isSnackbarActive: this.props.snackbarWidgetState.isSnackbarActive });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isSnackbarActive: nextProps.snackbarWidgetState.isSnackbarActive });
    }

    /**
     * Handle event time out snackbar
     */
    handleTimeoutSnackbar() {
        this.props.snackbarWidgetState.actionTimeoutSnackbar();
        this.props.actions.SnackbarWidgetInactiveAction();

    }

    handleClickActionSnackbar() {
        this.props.actions.SnackbarWidgetInactiveAction();
    }

    render() {

        const { isSnackbarActive } = this.state;
        const { messageSnackbar, actionTitle } = this.props.snackbarWidgetState;

        return (
            <div>
                <Snackbar
                    timeout={1500}
                    active={isSnackbarActive}
                    onClick={::this.handleClickActionSnackbar}
                    onTimeout={::this.handleTimeoutSnackbar}
                    action={actionTitle}>
                        {messageSnackbar}
                </Snackbar>
            </div>
        );
    }
}