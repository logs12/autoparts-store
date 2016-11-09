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
                    <FlexMenu brand = {this.brand} links = {this.links}/>

                    <nav className="authentication">
                        <li className="main-menu__li">
                            <NavLink onlyActiveOnIndex={true}
                                     to="#"
                                     className="item -link">
                                <i className="fa fa-pencil fa-2x" aria-hidden="true"></i>Регистрация
                            </NavLink>
                        </li>
                        <li className="main-menu__li">
                            <NavLink onlyActiveOnIndex={true}
                                     to="#"
                                     onClick={this.handleOpen}
                                     className="item -link">
                                <i className="fa fa-sign-in fa-2x" aria-hidden="true"></i>Вход
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