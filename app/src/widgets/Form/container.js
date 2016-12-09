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

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        console.log(this.props);
        // Передаем в редьюсер url для отправки данных формы
        this.props.dispatch(
            FormActions.update(
                this.props.formName,
                this.props.url,
        ));
        event.preventDefault();
    }

    render () {
        return (
            <FormComponent onSubmit={this.onSubmit}>
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