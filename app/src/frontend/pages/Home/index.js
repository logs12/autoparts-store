import './style.scss';

import React, { Component } from 'react';


import Form from '../../../widgets/Form/container';
import InputText from '../../../widgets/InputText/container';
import SubmitButton from '../../../widgets/SubmitButton';

//components
import SearchForArticle from '../../containers/SearchForArticle';

export default class Home extends Component{

    render()  {
        return (
            <div id="home" >
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
                        label="Вход"
                    />
                </Form>
                
                <SearchForArticle />
            </div>
        )
    }
};
