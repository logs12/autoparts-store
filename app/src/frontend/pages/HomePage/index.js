import './style.scss';

import React, { Component } from 'react';


import Form from '../../../widgets/form/container';
import {InputText} from '../../../widgets/input-text/container';
import ButtonLoading from '../../../widgets/button-loading/container';

//components
import SearchForArticle from '../../containers/SearchForArticle';
import {actionFormDecorator} from '../../../widgets/form/decorators/@actionFormDecorator';
import ProgressBar from 'react-mdl/lib/ProgressBar';

export default class HomePage extends Component{
    
    /*constructor(props) {
        super(props);
        debugger;
        let ff = function f(n) {
            return n;
        };
        ff = actionFormDecorator(ff,'sdfsdf');
        let uu = ff(456);
    }*/

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
                    <ButtonLoading
                        label="Вход"
                    />
                </Form>

                <SearchForArticle />
            </div>
        )
    }
};
