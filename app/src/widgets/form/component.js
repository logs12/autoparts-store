import React from 'react';

const Form = props => {
    return (
        <form onSubmit={props.submitHandle} className={props.className}>
            {props.children}
        </form>
    )
};

Form.propTypes = {
    submitHandle: React.PropTypes.func.isRequired,
};

export default Form;