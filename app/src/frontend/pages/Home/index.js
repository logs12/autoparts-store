import './style.scss';

import React, { Component } from 'react';


import Form from '../../../widgets/Form/container';
import InputText from '../../../widgets/InputText/container';
import SubmitButton from '../../../widgets/SubmitButton/container';

//components
import SearchForArticle from '../../containers/SearchForArticle';

export default class Home extends Component{

    render()  {
        return (
            <div id="home" >
                <Form>
                    <InputText
                        name = 'login'
                        label = 'Логин'
                    />
                    <InputText
                        name = 'Password'
                        label = 'Пароль'
                    />
                    <SubmitButton />
                </Form>

                
                <SearchForArticle />
            </div>
        )
    }
};
