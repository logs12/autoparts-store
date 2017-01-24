import './styles/style.scss';

import React, { Component } from 'react';
import NavLink from '../../frontend/components/NavLink';
import FlexBoxMenuHandler from './FlexBoxMenuHandler';

export default class FlexBoxMenu extends Component {

    constructor(props, context) {
        super(props, context);
        new FlexBoxMenuHandler();
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

                {/* Список ссылок */}
                <nav role="navigation" id="navigation" className="flex-menu__nav">
                    {this.links.map((link, index) => {
                        return (
                            <li className="flex-menu__li" key={index}>
                                <NavLink
                                    onlyActiveOnIndex={true}
                                    to={link.url}
                                    className="flex-menu__a flex-menu__a--link">
                                    {link.title}
                                </NavLink>
                            </li>
                        )
                    })}
                </nav>
                {/* Кнопка для мобильных */}
                <button data-collapse data-target="#navigation" className="flex-menu__button">
                    {/* Здесь будет иконка гамбургера */}
                    <span className="icon"></span>
                </button>
            </div>
        )
    }
}