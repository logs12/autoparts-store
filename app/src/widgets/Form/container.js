import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import FormComponent from './component';
import * as actions from './actions';


@connect(
    (state) => state, // mapStateToProps
    (dispatch) => ({ // mapDispatchToProps
        formActions: bindActionCreators(actions, dispatch)
    })
)

export default class Form extends Component {

    /**
     * Инициализируем контроль типов свойств
     * @type {{url: *}}
     */
    static propTypes = {
        formName: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
    };

    /**
     * Инициализируем контроль типов свойств контекста
     * @type {{url: *}}
     */
    static childContextTypes = {
        formName: React.PropTypes.string
    };



    constructor(props, context) {
        super(props, context);
    }

    /**
     * Перед рендерингом инициализируем форму в store
     */
    componentWillMount() {
        this.props.formActions.initForm(
            this.props.formName,
            this.getInputNames(),
            this.props.url
        );
    }

    getChildContext() {
        return {
            formName: this.props.formName
        };
    }

    /**
     * Получаем список полей ввода формы
     * @returns {{}}
     */
    getInputNames() {
        let inputNames = {};
        if (this.props.children) {
            for (var child of this.props.children) {
                if (!child.props.name) {
                    continue;
                }
                inputNames[child.props.name] = null;
            }
        }
        return  inputNames;
    }


    /**
     * Отпрака данных
     * @param event
     */
    submitHandle(event) {

        // Собираем из store данные введенные в форму
        let data = this.props.FormReducer[this.props.formName].values;

        // Запускаем submit формы
        this.props.formActions.submitForm(
            data,
            this.props.url,
        );

        event.preventDefault();
    }

    render () {
        return (
            <FormComponent
                formName={this.props.formName}
                submitHandle={::this.submitHandle}>
                {this.props.children}
            </FormComponent>
        )
    }
}

