import './style.scss';

import React, {Component} from "react";

import { LOGIN_URL_REQUEST } from "../../constants";

import Form from '../../widgets/form/container';
import {InputText} from '../../widgets/input-text/container';
import ButtonLoading from '../../widgets/button-loading/container';

export default class LoginFormComponent extends Component {

    render() {
        return (
            <Form
                actionName="loginAction"
                formName="loginForm"
                url={LOGIN_URL_REQUEST} >
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