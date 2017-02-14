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
        model: React.PropTypes.object,
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
        this.getInputNames(this.props.children);
        this.props.formActions.initForm(
            this.props.formName,
            this.inputNames,
            this.props.url
        );
    }

    getChildContext() {
        return {
            formName: this.props.formName,
        };
    }

    inputNames = {};

    /**
     * Получаем список полей ввода формы
     * @returns {{}}
     */
    getInputNames(children) {
        if (children.length) {
            for (var child of children) {
                if (typeof child.type !== 'function') {
                    this.getInputNames(child.props.children)
                }
                if (!child.props.name) {
                    continue;
                }
                if (this.props.model) {
                    this.inputNames[child.props.name] = this.props.model[child.props.name];
                } else {
                    this.inputNames[child.props.name] = null;
                }
            }
        }
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

