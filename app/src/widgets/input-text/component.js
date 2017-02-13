import React from "react";
import TextField from 'react-mdl/lib/Textfield';

const InputTextComponent = props => {
    return (
        <div className={props.className}>
            <TextField
                onChange={props.onChange}
                error={props.error}
                label={props.placeholder}
            />
        </div>
    );
};

InputTextComponent.propTypes = {
    onChange:React.PropTypes.func
};

export default InputTextComponent;
