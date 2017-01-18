import React, {Component, PropTypes} from 'react';
import InputTextComponent from "./component";
import {bindActionCreators} from "redux";

import { connect } from 'react-redux';
import * as actions from './actions';


/**
 * Подключение к reduxStore
 */
@connect(
    (state) => state,
    (dispatch) => ({ // mapDispatchToProps
        actions: bindActionCreators(actions, dispatch)
    })
)

/**
 * Виджет можно использовать независимо от формы, но в таком случае необходимо явно прописывать название reducer
 * в глобальном state в свойстве reducerName, которому принадлежат данные
    <InputText
        name = 'password'
        placeholder = 'Пароль'
        reducerName = 'entity'
    />
 */
export default class InputText extends Component {

    /**
     * Инициализируем контроль типов свойств
     * @type {{name: *, placeholder: *, label: *}}
     */
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string,
    };


    /**
     * @param reducerName - название reducer
     * @type {{actionName: string}}
     */
    static defaultProps = {
        reducerName: 'FormReducer',
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

        // Передаем в редьюсер артикул детали для поиска
        this.props.dispatch(
            SearchForArticulActions.getProducts(event.target.value)
        );

        // Передаем в редьюсер данные input
        this.props.actions.updateInputText(
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

