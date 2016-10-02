import './styles/style.scss';

import React, { Component } from 'react';
import FlexMenu from '../../widgets/FlexMenu';


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
        ]
    }

    render() {
        return (
            <div className="main-menu">
                <FlexMenu brand = {this.brand} links = {this.links}/>
            </div>
        )
    }
}