import './styles/style.scss';

import React, {Component} from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class LoginForm extends Component {

    render () {
        return (
            <form className="login-form">
                <TextField
                    hintText="Логин"
                    floatingLabelText="Логин"
                    fullWidth={true}
                />
                <TextField
                    hintText="Пароль"
                    floatingLabelText="Пароль"
                    type="password"
                    fullWidth={true}
                />
                <div className="login-form__button">
                    <RaisedButton
                        label="Войти"
                    />
                </div>
            </form>
        )
    }
}