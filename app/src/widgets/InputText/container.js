import React, {Component} from "react";
import InputTextComponent from "./component";

import { connect } from 'react-redux';
import * as FormAction from '../Form/actions';

export class InputText extends Component {

    /**
     * Инициализируем контроль типов свойств
     * @type {{name: *, placeholder: *, label: *}}
     */
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string
    };

    /**
     * Инициализируем состояния
     * @type {{errors: Array}}
     */
    state = {
        errors: []
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    /**
     * Обработчик события измнния input, отправка введеного значения в store
     */
    onChange(event) {
        console.log('event = ',event.target.value);
        // Передаем в редьюсер артикул детали для поиска
        //console.log('getState = ', this.props.getState());
        this.props.dispatch(
            FormAction.updateInputText(
                'loginForm',
                this.props.name,
                event.target.value
        ));
    }

    render () {
        return (
            <InputTextComponent
                name = {this.props.name}
                placeholder = {this.props.placeholder}
                onChange = {this.onChange}
            />
        )
    }

}


const mapStateToProps = (state) => {
    return {
        value: state.FormReducer.value
    }
};

const ConnectedInput = connect(mapStateToProps)(InputText);

export default ConnectedInput;
