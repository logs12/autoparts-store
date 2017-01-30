import './style.scss';

import React, {Component} from "react";

import Form from '../../widgets/form/container';
import {InputText} from '../../widgets/input-text/container';
import ButtonLoading from '../../widgets/button-loading/container';

export default class LoginFormComponent extends Component {

    render() {
        return (
            <Form
                actionName="authAction"
                formName="loginForm"
                url="/api/login" >
                <InputText
                    name = 'email'
                    placeholder = 'Логин'
                />
                <InputText
                    name = 'password'
                    placeholder = 'Пароль'
                />
                <ButtonLoading
                    label="Вход"
                />
            </Form>
        )
    }
}