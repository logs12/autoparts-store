import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Form from './component';
import * as actions from './actions';

const mapStateToProps = (state) => {
    return {
        values: state.SearchForArticul.products,
        reduxState: state
    }
};


//export default connect(mapStateToProps)(Form);

/**
 * Подключаем выиджет Form к общему Store
 */
const SmartForm = connect(state => state, actions)(Form);

export default props => (
        <SmartForm {...props}/>
);

export {default as InputText} from '../InputText';
export {default as SubmitButton} from '../SubmitButton';

