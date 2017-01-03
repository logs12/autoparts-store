import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import FormComponent from './component';
import * as actions from './actions';

/**
 * Свойства из state, которые будут использоваться
 * @param state
 * @returns {{FormReducer: *}}
 */
const mapStateToProps = ( state) => {
    return {
        FormReducer: state.FormReducer
    }
};

@connect(
    mapStateToProps,
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
        actionName: React.PropTypes.string,
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

    /**
     * Устанавливаем свойства по дефолту
     * @type {{actionName: string}}
     */
    static defaultProps = {
        actionName: 'submitForm',
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
     * Хук на получение новых свойств
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        console.log('nextProps213123 = ',nextProps);
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
        let data = this.props.FormReducer[this.props.formName].values;

        // Запускаем submit формы
        this.props.formActions.submitForm(
            this.props.formName,
            this.props.actionName,
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

