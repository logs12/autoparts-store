import './styles/style.scss';

import React, { Component } from 'react';
import FlexMenu from '../../../widgets/flex-menu';
import NavLink from '../../../widgets/nav-link/component';
import LoginForm from '../../containers/LoginFormContainer';
import Dialog from 'material-ui/Dialog';


export default class MainMenu extends Component {

    constructor(props, context) {
        super(props, context);
        this.brand = {
            url: '/',
            title: 'Автозапчасти'
        };
        this.links = [
            {
                url: '/',
                title: 'Главная'
            },
            {
                url: '/test',
                title: 'Тест'
            },

            {
                url: '/test',
                title: 'Тест'
            },

            {
                url: '/test',
                title: 'Тест'
            },

            {
                url: '/test',
                title: 'Тест'
            },
            {
                url: '/test',
                title: 'Тест'
            },
            {
                url: '/test',
                title: 'Тест'
            },
            {
                url: '/test',
                title: 'Тест'
            },
            {
                url: '/test',
                title: 'Тест'
            },

        ];

        this.state = {
            open: false
        }
        
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        return (
                <div className="main-menu">
                    {/* Логотип */}
                    <div className="ww">
                        <nav>
                            <li className="main-menu__li">
                                <NavLink
                                    to={this.brand['url']}
                                    className="main-menu__a main-menu__a--brand">
                                    {this.brand.title}
                                </NavLink>
                            </li>
                        </nav>

                        <FlexMenu links = {this.links}/>
                    </div>

                    <nav className="authorization">
                        <li className="authorization__li">
                            <i className="fa fa-pencil fa-2x" aria-hidden="true"></i>
                            <NavLink onlyActiveOnIndex={true}
                                     to="#"
                                     className="authorization__a">
                                Регистрация
                            </NavLink>
                        </li>
                        <li className="authorization__li">
                            <i className="fa fa-sign-in fa-2x" aria-hidden="true"></i>
                            <NavLink onlyActiveOnIndex={true}
                                     to="#"
                                     className="authorization__a"
                                     onClick={::this.handleOpen}>
                                Вход
                            </NavLink>
                        </li>
                        <Dialog
                            contentClassName="login-form__dialog"
                            title="Вход в личный кабинет"
                            modal={false}
                            open={this.state.open}
                            onRequestClose={::this.handleClose}
                            autoScrollBodyContent={true}>
                                <LoginForm />
                        </Dialog>
                    </nav>
                </div>
        )
    }
}