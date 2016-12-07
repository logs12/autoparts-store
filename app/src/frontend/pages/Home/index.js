import './style.scss';

import React, { Component } from 'react';


import Form from '../../../widgets/Form/container';
import InputText from '../../../widgets/InputText/container';

//components
import SearchForArticle from '../../containers/SearchForArticle';

export default class Home extends Component{

    render()  {
        return (
            <div id="home" >
                <Form>
                    <InputText
                        name = 'login'
                        placeholder = 'Логин'
                    />
                    <InputText
                        name = 'Password'
                        placeholder = 'Пароль'
                    />
                    <input type="submit" />
                </Form>

                
                <SearchForArticle />
            </div>
        )
    }
};
