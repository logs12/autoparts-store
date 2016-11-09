import './styles/style.scss';

import React, { Component } from 'react';
import NavLink from '../../frontend/components/NavLink';
import FlexMenuHandler from './FlexMenuHandler';

export default class FlexMenu extends Component {

    constructor(props, context) {
        super(props, context);
        new FlexMenuHandler();
        // Инициализация свойств
        this.brand = this.props.brand;
        this.links = this.props.links;
        this.state = {
            open: false
        }
    }

    render() {
        return (
            <div className="flex-menu">
                {/* Логотип */}
                <li className="flex-menu__li">
                    <NavLink
                        to={this.brand['url']}
                        className="flex-menu__a flex-menu__a--brand">
                        {this.brand.title}
                    </NavLink>
                </li>
                {/* Кнопка для мобильных */}
                <button data-collapse data-target="#navigation" className="flex-menu__button">
                    {/* Здесь будет иконка гамбургера */}
                    <span className="icon"></span>
                </button>
                {/* Список ссылок */}
                <nav role="navigation" id="navigation" className="flex-menu__nav">
                    {this.links.map((link, index) => {
                        return (
                            <li className="flex-menu__li">
                                <NavLink key={index}
                                    onlyActiveOnIndex={true}
                                    to={link.url}
                                    className="flex-menu__a flex-menu__a--link">
                                    {link.title}
                                </NavLink>
                            </li>
                        )
                    })}
                </nav>
            </div>
        )
    }
}