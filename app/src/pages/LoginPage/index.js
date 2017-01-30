import './style.scss';

import React, { Component } from 'react';

import LoginFormComponent from '../../components/LoginFormComponent';
import Article from '../../widgets/article/component';

export class LoginPage extends Component{

    render () {
        return (
            <div className="page-login">
                <Article>
                    <h3>Вход</h3>
                    <LoginFormComponent/>
                </Article>
            </div>
        )
    }
};