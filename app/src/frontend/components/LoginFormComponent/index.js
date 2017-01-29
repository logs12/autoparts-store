import './style.scss';

import React, {Component} from "react";

import Form from '../../../widgets/form/container';
import {InputText} from '../../../widgets/input-text/container';
import SubmitButton from '../../../widgets/button-loading/container';

import { connect } from 'react-redux';

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
                <SubmitButton
                    label="Вход"
                />
            </Form>

        )
    }
}