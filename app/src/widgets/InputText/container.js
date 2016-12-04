import React, {Component} from "react";
import InputTextComponent from "./component";

import { connect } from 'react-redux';
import * as InpitAction from './actions';

export class InputText extends Component {

    /**
     * Инициализируем контроль типов свойств
     * @type {{name: *, placeholder: *, label: *}}
     */
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string,
        label: React.PropTypes.string
    };

    /**
     * Инициализируем контроль типов контекста
     * @type {{update: *, values: *, registerValidation: *}}
     */
    static contextTypes = {
        /*update: React.PropTypes.func.isRequired,
        values: React.PropTypes.object.isRequired,
        registerValidation: React.PropTypes.func.isRequired*/
    };

    /**
     * Инициализируем состояния
     * @type {{errors: Array}}
     */
    state = {
        errors: []
    };

    /**
     * Обработчик события измнния input, отправка введеного значения в store
     */
    onChange(event) {
        console.log('event = ',event.target.value);
        // Передаем в редьюсер артикул детали для поиска
        this.props.dispatch(
            InpitAction.update(
                this.props.name,
                event.target.value
        ));

        this.pending = this.props.pending;
        this.action = this.props.action;
        this.reduxState = this.props.reduxState;
    }

    render () {
        return (
            <InputTextComponent
                label = {this.props.label}
                onChange = {this.onChange}
            />
        )
    }

}


const mapStateToProps = (state) => {
    return {
        pending: state.SearchForArticul.pending,
        products: state.SearchForArticul.products,
        reduxState: state
    }
};

const ConnectedInput = connect(mapStateToProps)(InputText);

export default ConnectedInput;
