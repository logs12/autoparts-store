import React, {Component} from 'react';
import { connect } from 'react-redux';

import ErrorComponent from './component';


/**
 * Подключение к reduxStore
 */
@connect(
    /**
     * Свойства из state, которые будут использоваться
     * @param state
     */
    (state) => ({ // mapStateToProps
        errors: state.SystemError
    }),
)
export default class ErrorWidget extends Component {
    render () {
        return (
            <ErrorComponent
                messageError={this.props.errors.messageError}
                stackTraceError={this.props.errors.stackTraceError}
            />
        );
    }
}