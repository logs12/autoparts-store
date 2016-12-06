import React, {Component} from "react";
import TextField from 'material-ui/TextField';

export default class InputText extends Component {

    /**
     * Инициализируем контроль типов свойств
     * @type {{name: *, placeholder: *, label: *}}
     */
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string,
        label: React.PropTypes.string
    };

    render() {
        return (
            <div>
                <TextField
                    name = {this.props.name}
                    hintText = {this.props.label}
                    onChange={this.props.onChange}
                />
            </div>
        );
    }
}