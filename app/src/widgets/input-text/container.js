import React, {Component, PropTypes} from 'react';
import InputTextComponent from "./component";

import { connect } from 'react-redux';

import * as actions from './actions';

import { WIDGET_INPUT_TEXT_ACTION_NAME } from '../../constants';

/**
 * Подключение к reduxStore
 */


@connect(
    (state) => state,
    /*(dispatch) => ({ // mapDispatchToProps
        actions: bindActionCreators(actions, dispatch)
    })*/
)


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
    };


    /**
     * @param reducerName - название reducer
     * @type {{actionName: string}}
     */
    static defaultProps = {
        reducerName: 'FormReducer',
        actionName: WIDGET_INPUT_TEXT_ACTION_NAME,
        urlSubmit: '/',
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

    constructor(props, context) {
        super(props, context);
        this.onChange = this.onChange.bind(this);
    }

    /**
     * Хук на получение новых свойств
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        this.error = nextProps[this.props.reducerName][this.context.formName].errors[this.props.name];
    }

    /**
     * Обработчик события изменения input, отправка введеного значения в store
     */
    onChange(event) {
        event.preventDefault();

        // Передаем в редьюсер артикул детали для поиска
        this.props.dispatch(
            actions.updateInputText(
                this.props.actionName,
                {
                    formName: this.context.formName,
                    inputName: this.props.name,
                    value: event.target.value
                },
            )
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
