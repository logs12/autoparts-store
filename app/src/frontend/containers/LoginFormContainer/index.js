import React, {Component} from "react";
import Form from "../../../widgets/Form";
import InputText from "../../../widgets/InputText";
import SubmitButton from "../../../widgets/SubmitButton";

import { connect } from 'react-redux';
import * as AuthActions
    from '../../actions/AuthActions';

export default class LoginFormContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form onSubmit={data => console.log(data)}>
                <InputText
                    name="login"
                    placeholder="Логин"
                    label="Логин"/>
                <InputText
                    name="password"
                    placeholder="Пароль"
                    label="Пароль"/>
                <SubmitButton className="login-form__button" label="Войти"/>
            </Form>
        )

    }
}