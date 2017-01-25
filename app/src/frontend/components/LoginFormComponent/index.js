import './style.scss';

import React, {Component} from "react";
import Form from '../../../widgets/form/container';
import InputText from '../../../widgets/input-text/container';
import SubmitButton from '../../../widgets/submit-button/container';

import { connect } from 'react-redux';

export default class LoginFormComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form
                actionName="authAction"
                formName="loginForm"
                url="/login" >
                <InputText
                    name = 'login'
                    placeholder = 'Логин'
                />
                <InputText
                    name = 'password'
                    placeholder = 'Пароль'
                />
                <SubmitButton
                    className="login-form__button"
                    label="Войти"
                />
            </Form>
        )
    }
}