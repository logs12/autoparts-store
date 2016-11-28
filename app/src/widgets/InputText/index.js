import React, {Component} from "react";
import TextField from 'material-ui/TextField';

export default class InputText extends Component {

    static propTypes = {
        name: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string,
        label: React.PropTypes.string
    }

    constructor (props) {
        super(props);

    }

    render() {
        return (
            <div>
                <TextField hintText={this.props.placeholder} floatingLabelText={this.props.label}/>
            </div>
        );
    }
}