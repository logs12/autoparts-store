import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import FormComponent from './component';
import * as FormActions from './actions';


export class Form extends Component {

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
        this.props.dispatch(
            FormActions.initForm(
                this.props.formName,
                this.getInputNames(),
                this.props.url
        ));
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
        // Передаем в редьюсер url для отправки данных формы
        let data = this.props.state['FormReducer'][this.props.formName].values;
        this.props.dispatch(
            FormActions.submitForm(
                data,
                this.props.url,
        ));
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

/**
 * Подключаем выиджет Form к общему Store
 */
const mapStateToProps = (state) => {
    return {
        state
    }
};

const ConnectedForm = connect(mapStateToProps)(Form);

export default ConnectedForm;