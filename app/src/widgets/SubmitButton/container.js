import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";

import SubmitButtonComponent from './component';

/**
 * Подключение к reduxStore
 */
@connect(
    (state) => ({
        forms: state.FormReducer
    })
)

export default class SubmitButton extends Component{

    static propTypes = {
        className: React.PropTypes.string,
        label: React.PropTypes.string
    };

    /**
     * Дефолтные свойства
     * @type {{}}
     */
    static defaultProps = {
        label: 'Submit',
    };

    /**
     * Свойство выключения кнопки
     * @type {{disabled: boolean, isPending: boolean}}
     */
    state = {
        disabled: true,
        isPending: false,
    };

    /**
     * Инициализируем контроль типов свойств контекста
     * @type {{formName: *, isPending: RegExp}}
     */
    static contextTypes = {
        formName: React.PropTypes.string.isRequired,
    };

    /**
     *
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {

        // Если isChanged == true, то выключаем кнопку disabled == false
        this.state.disabled = !nextProps.forms[this.context.formName].isChanged;

        //
        this.state.isPending = nextProps.forms[this.context.formName].isPending;

    }

    render () {
        return (
            <SubmitButtonComponent
                className={this.props.className}
                label={this.props.label}
                disabled={this.state.disabled}
                isPending={this.state.isPending}
            >
            </SubmitButtonComponent>
        )
    }
}