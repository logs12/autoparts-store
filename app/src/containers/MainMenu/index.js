import './styles/style.scss';

import React, { Component } from 'react';
import NavLink from '../../components/NavLink';
import FlexMenuHandler from './FlexMenuHandler';


export default class MainMenu extends Component {

    constructor(props, context) {
        super(props, context);
        new FlexMenuHandler();
    }

    render() {
        return (
            <div className="navbar-component">
                {/* Класс `area` — это простой контейнер (об этом позднее) */}
                <div className="navbar area">
                    {/* Логотип */}
                    <li><NavLink to="#" className="brand">Brand</NavLink></li>
                    {/* Кнопка для мобильных */}
                    <button data-collapse data-target="#navigation" className="toggle">
                        {/* Здесь будет иконка гамбургера */}
                        <span className="icon"></span>
                    </button>
                    {/* Список ссылок */}
                    <nav role="navigation" id="navigation" className="list">
                        <li><NavLink onlyActiveOnIndex={true} to="/" className="item-link">Home</NavLink></li>
                        <li><NavLink  to='/test'>тест</NavLink></li>
                    </nav>

                </div>
            </div>
        )
    }
}