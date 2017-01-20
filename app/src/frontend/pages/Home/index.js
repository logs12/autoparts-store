import './style.scss';

import React, { Component } from 'react';


import Form from '../../../widgets/Form/container';
import {InputText} from '../../../widgets/InputText/container';
import SubmitButton from '../../../widgets/SubmitButton/container';

//components
import SearchForArticle from '../../containers/SearchForArticle';
import {actionFormDecorator} from '../../../widgets/Form/decorators/@actionFormDecorator';

export default class Home extends Component{


    constructor(props) {
        super(props);
        debugger;
        let ff = function f(n) {
            return n;
        };
        ff = actionFormDecorator(ff,'sdfsdf');
        let uu = ff(456);
    }

    render()  {
        return (
            <div id="home" >
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

                <SearchForArticle />
            </div>
        )
    }
};
