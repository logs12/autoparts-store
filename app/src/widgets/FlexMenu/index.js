import './styles/style.scss';

import React, { Component } from 'react';
import NavLink from '../../components/NavLink';
import FlexMenuHandler from './FlexMenuHandler';
import Popup from "../../components/Popup";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class FlexMenu extends Component {

    constructor(props, context) {
        super(props, context);
        new FlexMenuHandler();
        // Инициализация свойств
        this.brand = this.props.brand;
        this.links = this.props.links;
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="navbar-component">
                    {/* Класс `area` — это простой контейнер (об этом позднее) */}
                    <div className="navbar area">
                        {/* Логотип */}
                        <li><NavLink to={this.brand['url']} className="brand">{this.brand.title}</NavLink></li>
                        {/* Кнопка для мобильных */}
                        <button data-collapse data-target="#navigation" className="toggle">
                            {/* Здесь будет иконка гамбургера */}
                            <span className="icon"></span>
                        </button>
                        {/* Список ссылок */}
                        <nav role="navigation" id="navigation" className="list">
                            {this.links.map((link, index) => {
                                return (
                                        <NavLink key={index}
                                            onlyActiveOnIndex={true}
                                            to={link.url}
                                            className="item -link">
                                            {link.title}
                                        </NavLink>
                                )
                            })}
                        </nav>
                        <nav>
                            <Popup />
                        </nav>
                    </div>
                </div >
            </MuiThemeProvider>
        )
    }
}