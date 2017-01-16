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
     * @type {boolean}
     */
    disabled = true;

    /**
     * Инициализируем контроль типов свойств контекста
     * @type {{url: *}}
     */
    static contextTypes = {
        formName: React.PropTypes.string.isRequired
    };

    componentWillReceiveProps(nextProps) {
        // Если isChanged == true, то выключаем кнопку disabled == false
        this.disabled = !nextProps.forms[this.context.formName].isChanged;
    }

    render () {
        return (
            <SubmitButtonComponent
                className={this.props.className}
                label={this.props.label}
                disabled={this.disabled}
            >
            </SubmitButtonComponent>
        )
    }
}