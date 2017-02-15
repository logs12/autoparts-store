import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";

import { WIDGET_FORM_INIT } from '../../constants';

import ButtonLoadingComponent from './component';

/**
 * Подключение к reduxStore
 */
@connect(
    (state) => ({
        FormWidgets: state.FormWidget
    })
)

/**
 * Виджет можно использовать независимо от формы, но в таком случае необходимо явно прописывать название reducer
 * в глобальном state в свойстве reducerName, которому принадлежат данные
    <ButtonLoading
        label = 'Send'
        reducerName = 'entity'
    />
 */

export default class ButtonLoading extends Component{

    static propTypes = {
        className: React.PropTypes.string,
        label: React.PropTypes.string
    };

    /**
     * Дефолтные свойства
     * @type {{}}
     */
    static defaultProps = {
        reducerName: 'FormWidgets',
        label: 'Submit',
        className: ''
    };

    /**
     * Свойство выключения кнопки
     * @type {{disabled: boolean, isPending: boolean, isSuccess: boolean}}
     */
    state = {
        disabled: true,
        isPending: false,
        buttonState: WIDGET_FORM_INIT,
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
        this.state.disabled = !nextProps[this.props.reducerName][this.context.formName].isChanged;

        // Состояния кнопки
        this.state.buttonState = nextProps[this.props.reducerName][this.context.formName].stateForm;

    }

    render () {
        return (
            <ButtonLoadingComponent
                className={this.props.className}
                label={this.props.label}
                disabled={this.state.disabled}
                buttonState={this.state.buttonState}
            >
            </ButtonLoadingComponent>
        )
    }
}