import React, {Component, PropTypes} from 'react';
import InputTextComponent from "./component";
import {bindActionCreators} from "redux";

import { connect } from 'react-redux';
import * as actions from '../Form/actions';

/**
 * Подключение к reduxStore
 */
@connect(
    (state) => ({
        forms: state.FormReducer
    }),
    (dispatch) => ({ // mapDispatchToProps
        formActions: bindActionCreators(actions, dispatch)
    })
)

export default class InputText extends Component {

    /**
     * Инициализируем контроль типов свойств
     * @type {{name: *, placeholder: *, label: *}}
     */
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string
    };

    /**
     * Инициализируем контроль типов свойств контекста
     * @type {{url: *}}
     */
    static contextTypes = {
        formName: React.PropTypes.string.isRequired
    };

    /**
     * Инициализируем состояния
     * @type {{errors: Array}}
     */
    state = {
        errors: []
    };

    constructor(props, context) {
        super(props, context);
        this.onChange = this.onChange.bind(this);
    }

    /**
     * Хук на получение новых свойств
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        this.error = nextProps.forms[this.context.formName].errors[this.props.name];
    }

    /**
     * Обработчик события изменния input, отправка введеного значения в store
     */
    onChange(event) {
        // Передаем в редьюсер артикул детали для поиска
        this.props.formActions.updateInputText(
                this.context.formName,
                this.props.name,
                event.target.value
        );
    }

    render () {
        return (
            <InputTextComponent
                name = {this.props.name}
                placeholder = {this.props.placeholder}
                onChange = {this.onChange}
                error={this.error}
            />
        )
    }

}

