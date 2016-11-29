import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Form from './components/Form';
import * as actions from './actions';

const SmartForm = connect(state => state, actions)(Form);

const reduxMiddleware = applyMiddleware(thunk, createLogger());

export default props => (
        <Form {...props}/>
);

export {default as Text} from './components/Text';
export {default as SubmitButton} from './components/SubmitButton';


const mapStateToProps = (state) => {
    return {
        pending: state.SearchForArticul.pending,
        products: state.SearchForArticul.products,
        reduxState: state
    }
};

/**
 * Подключаем выиджет Form к общему Store
 */
export default connect(mapStateToProps)(Form);