import React from "react";
import TextField from 'react-mdl/lib/Textfield';

const InputTextComponent = props => {
    return (
        <div className={props.className}>
            <TextField
                floatingLabel
                onChange={props.onChange}
                error={props.error}
                label={props.placeholder}
                value={props.inputTextValue}
            />
        </div>
    );
};

InputTextComponent.propTypes = {
    onChange:React.PropTypes.func
};

export default InputTextComponent;
