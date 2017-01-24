import './style.scss';

import React, { Component } from 'react';
import { Link } from 'react-router';

import Article from '../../widgets/article/component';

export default class NotFound extends Component {
    render() {
        return (
            <div className="not-found-page">
                <Article>
                    <h3>
                        <i className="not-found-page_icon fa fa-exclamation-triangle fa-2x mdl-color-text--red-500" aria-hidden="true"></i>
                        Страница не найдена
                    </h3>
                    Произошла ошибка. Мы уже знаем о ней и сделаем всё возможное для её исправления.
                    Попробуйте обновить страницу (например, нажав клавишу F5). <br />
                    <Link to='/'>Переход на главную страницу</Link>
                </Article>
            </div>
        )
    }
}