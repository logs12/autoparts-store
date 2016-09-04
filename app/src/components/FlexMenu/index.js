import './style.scss';

import React, { Component } from 'react';
import FlexMenuHandler from './FlexMenuHandler';


export default class FlexMenu extends Component {

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
                    <a href="#" className="brand">Brand</a>
                    {/* Кнопка для мобильных */}
                    <button data-collapse data-target="#navigation" className="toggle">
                        {/* Здесь будет иконка гамбургера */}
                        <span className="icon"></span>
                    </button>
                    {/* Список ссылок */}
                    <nav role="navigation" id="navigation" className="list">
                        <a href="#" className="item -link">Home</a>
                        <a href="#" className="item -link">Articles</a>
                        <a href="#" className="item -link">Projects</a>
                        <a href="#" className="item -link">Resources</a>
                        <a href="#" className="item -link">About me</a>
                        <span className="item">

                            <i className="fa fa-search"></i>
                        </span>
                    </nav>
                   
                </div>
            </div>
        )
    }
}