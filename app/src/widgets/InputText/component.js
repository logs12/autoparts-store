import React, {Component} from "react";
import TextField from 'material-ui/TextField';

export default class InputText extends Component {

    render() {
        return (
            <div>
                <TextField
                    hintText="Hint Text"
                    onChange={this.props.onChange}
                />
            </div>
        );
    }
}