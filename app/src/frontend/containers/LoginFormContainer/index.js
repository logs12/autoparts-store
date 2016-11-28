import React, {Component} from "react";
import Form from "../../../../widgets/Form";
import InputText from "../../../widgets/InputText";

import { connect } from 'react-redux';
import * as AuthActions
    from '../../actions/AuthActions';

export default class LoginFormContainer extends Component {

    constructor() {

    }

    render() {
        <Form>
            <Text
                name="login"
                placeholder="Логин"
                label="Логин"/>
            <Text
                name="password"
                placeholder="Пароль"
                label="Пароль"/>
            <Text
                name="login"
                placeholder="Логин"
                label="Логин"/>
            <div className="login-form__button">
                <RaisedButton
                    label="Войти"
                />
            </div>
        </Form>
    }
}