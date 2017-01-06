import React, {Component} from "react";
import TextField from 'material-ui/TextField';

export default class InputText extends Component {

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
                    name = {this.props.name}
                    hintText = {this.props.placeholder}
                    onChange={this.props.onChange}
                    errorText={this.props.error}
                />
            </div>
        );
    }
}