import React, {Component} from "react";
import Form from '../../../widgets/Form/container';
import InputText from '../../../widgets/InputText/container';
import SubmitButton from '../../../widgets/SubmitButton';

import { connect } from 'react-redux';
import * as AuthActions
    from '../../actions/AuthActions';

export default class LoginFormContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form
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