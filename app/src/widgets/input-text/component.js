import React, {Component} from "react";
import { TextField } from 'react-mdl/lib/Textfield';

export default class InputTextComponent extends Component {

    /**
     * Инициализируем контроль типов свойств
     * @type {{name: *, placeholder: *, onChange: *}}
     */
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string,
        onChange:React.PropTypes.func
    };

    render() {
        return (
            <div>
                <TextField
                    onChange={this.props.onChange}
                    error={this.props.error}
                    label={this.props.placeholder}
                />
            </div>
        );
    }
}