import './styles/style.scss';

import React, { Component } from 'react';
import FlexMenu from '../../../widgets/FlexMenu';
import NavLink from '../NavLink';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


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
            <MuiThemeProvider>
                <div className="main-menu">
                    {/* Логотип */}
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
                                     onClick={this.handleOpen}>
                                Вход
                            </NavLink>
                        </li>
                        <Dialog
                            title="Вход"
                            //actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}>
                                Личный кабинет
                        </Dialog>
                    </nav>
                </div>
            </MuiThemeProvider>
        )
    }
}