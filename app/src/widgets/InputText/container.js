import React, {Component, PropTypes} from 'react';
import InputTextComponent from "./component";
import {bindActionCreators} from "redux";

import { connect } from 'react-redux';
import * as actions from '../Form/actions';

const mapStateToProps = (state) => {
    return {
        forms: state.FormReducer
    }
};

@connect(
    mapStateToProps,
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
    }


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

        console.log('InputText = ',this.props);
    }

    /**
     * Хук на получение новых свойств
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        console.log('InputText = ',nextProps);
        this.error = nextProps.forms[this.context.formName].errors[this.props.name];
        //this.error = nextProps['forms'][this.context.formName];
    }

    /**
     * Обработчик события измнния input, отправка введеного значения в store
     */
    onChange(event) {
        console.log('event = ',event.target.value);
        // Передаем в редьюсер артикул детали для поиска
        //console.log('getState = ', this.props.getState());
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

