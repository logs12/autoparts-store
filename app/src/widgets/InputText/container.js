import React, {Component, PropTypes} from 'react';
import InputTextComponent from "./component";
import {bindActionCreators} from "redux";

import { connect } from 'react-redux';
import * as actions from '../Form/actions';

/*const mapStateToProps = (state) => {
    return {
        value: state.FormReducer.value,
        errors: state.FormReducer.errors
    }
};

@connect(
    mapStateToProps,
    (dispatch) => ({ // mapDispatchToProps
        formActions: bindActionCreators(actions, dispatch)
    })
)*/

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
        alert(111);
        console.log('InputText = ',nextProps);
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
                this.context.formName,
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

/*

const mapStateToProps = (state) => {
    return {
        value: state.FormReducer.value,
        errors: state.FormReducer.errors
    }
};

const ConnectedInput = connect(mapStateToProps)(InputText);

export default ConnectedInput;
*/
