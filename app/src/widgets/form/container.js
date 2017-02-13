import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import FormComponent from './component';
import * as actions from './actions';


/**
 * Подключение к reduxStore
 */
@connect(
    /**
     * Свойства из state, которые будут использоваться
     * @param state
     */
    (state) => ({ // mapStateToProps
        forms: state.FormReducer
    }),

    /**
     * Actions из state, которые будут использоваться
     * @param dispatch
     */
    (dispatch) => ({ // mapDispatchToProps
        formActions: bindActionCreators(actions, dispatch)
    })
)

export default class Form extends Component {

    /**
     * Инициализируем контроль типов свойств
     * @type {{actionName: string, formName: *, url: *}}
     */
    static propTypes = {
        actionName: React.PropTypes.string,
        formName: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        className: React.PropTypes.string,
    };

    /**
     * Инициализируем контроль типов свойств контекста
     * @type {{formName: string}}
     */
    static childContextTypes = {
        formName: React.PropTypes.string,
    };

    /**
     * Устанавливаем свойства по дефолту
     * @type {{actionName: string, formName: string, url: string}}
     */
    static defaultProps = {
        actionName: 'submitForm',
        formName: 'widgetForm',
        url: '/',
        className: 'form-widget',
    };

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
            formName: this.props.formName,
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
     * Отправка данных
     * @param event
     */
    submitHandle(event) {

        // Собираем из store данные введенные в форму
        let values = this.props.forms[this.props.formName].values;

        // Запускаем submit формы
        this.props.formActions.submitFormAction(
            this.props.actionName, {
            formName: this.props.formName,
            values: values,
            url: this.props.url,
        });


        event.preventDefault();
    }

    render () {
        return (
            <FormComponent
                submitHandle={::this.submitHandle}
                className={this.props.className}>
                {this.props.children}
            </FormComponent>
        )
    }
}

