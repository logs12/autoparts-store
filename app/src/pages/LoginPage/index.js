import './style.scss';

import React, { Component } from 'react';

import LoginFormComponent from '../../components/LoginFormComponent';
import Article from '../../widgets/article/component';

const LoginPage = () => {
    return (
        <div className="page-login">
            <Article>
                <h3>Вход</h3>
                <LoginFormComponent/>
            </Article>
        </div>
    );
};

export default LoginPage;