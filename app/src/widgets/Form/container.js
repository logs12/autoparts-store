import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import FormComponent from './component';
import * as actions from './actions';


export class Form extends Component {

    constructor(props) {
        super(props)
        console.log('props = ', props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
       debugger;
        console.log(this.props);
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
        inputTextValue: state.InputTextReducer.value,
        state
    }
};

const ConnectedForm = connect(mapStateToProps)(Form);

export default ConnectedForm;