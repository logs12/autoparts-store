import React, {Component} from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class LoginForm extends Component {

    render () {
        return (
            <form >
                <TextField
                    hintText="Логин"
                    floatingLabelText="Логин"
                    floatingLabelFixed={true}
                />
                <TextField
                    hintText="Пароль"
                    floatingLabelText="Пароль"
                    type="password"
                />
                <RaisedButton label="Default" />
            </form>
        )
    }
}