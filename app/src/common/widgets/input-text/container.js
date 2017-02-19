import React, {Component, PropTypes} from 'react';
import InputTextComponent from "./component";

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import * as actions from './actions';

import { WIDGET_INPUT_TEXT_ACTION_NAME } from '../../constants';



const mapStateToProps = state => {
    return ({
        FormWidgets: state.FormWidget
    });
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
};

/**
 * Подключение к reduxStore
 */
@connect(mapStateToProps, mapDispatchToProps)

/**
 * Виджет можно использовать независимо от формы, но в таком случае необходимо явно прописывать название reducer
 * в глобальном state в свойстве reducerName, которому принадлежат данные
    <InputText
        name = 'password'
        placeholder = 'Пароль'
        actionName = 'updateInputText'
        urlSubmit = ''
        reducerName = 'entity'
    />
 */
export class InputText extends Component {

    /**
     * Инициализируем контроль типов свойств
     * @type {{name: *, placeholder: *, label: *}}
     */
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string,
        actionName: React.PropTypes.string,
        urlSubmit: React.PropTypes.string,
        className: React.PropTypes.string,
    };


    /**
     * @param reducerName - название reducer
     * @type {{actionName: string}}
     */
    static defaultProps = {
        reducerName: 'FormWidgets',
        actionName: WIDGET_INPUT_TEXT_ACTION_NAME,
        urlSubmit: '/',
        className: 'input-text-widget',
    };

    /**
     * Инициализируем контроль типов свойств контекста
     * @type {{url: *}}
     */
    static contextTypes = {
        formName: React.PropTypes.string.isRequired,
    };

    /**
     * Инициализируем состояния
     * @type {{errors: Array}}
     */
    state = {
        errors: []
    };

    inputTextValue = '';

    constructor(props, context) {
        super(props, context);

        this.inputTextValue = this.props[this.props.reducerName][this.context.formName].values[this.props.name];
    }

    /**
     * Хук на получение новых свойств
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        this.error = nextProps[this.props.reducerName][this.context.formName].errors[this.props.name];
        this.inputTextValue = nextProps[this.props.reducerName][this.context.formName].values[this.props.name];
    }

    /**
     * Обработчик события изменения input, отправка введеного значения в store
     */
    onChange(event) {
        event.preventDefault();

        // Передаем в редьюсер значение поля
        this.props.actions.updateInputText(
            this.props.actionName,
            {
                formName: this.context.formName,
                inputName: this.props.name,
                value: event.target.value
            },
        );
    }

    render () {
        return (
            <InputTextComponent
                name = {this.props.name}
                placeholder = {this.props.placeholder}
                onChange = {::this.onChange}
                error={this.error}
                className={this.props.className}
                inputTextValue={this.inputTextValue}
            />
        )
    }

}

