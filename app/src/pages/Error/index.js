import './style.scss';

import React, { Component } from 'react';

import { Link } from 'react-router'

export default class Error extends Component {

    render()  {
        return (

            <div className="error-page">
                <h3>
                    <i className="material-icons mdl-color-text--red-A200">error</i>
                    {this.props.message}
                </h3>
                <div className="error-page__message mdl-color-text--grey-600">
                    Произошла ошибка. Мы уже знаем о ней и сделаем всё возможное для её исправления.
                    <br />
                    Попробуйте обновить страницу (например, нажав клавишу F5).
                    <br />
                    <Link to="dashboard">Переход на главную страницу</Link>
                </div>
                <div className="error-page__stack-trace mdl-card__supporting-text">
                    {this.props.stackTrace}
                </div>
            </div>
        )
    }
}
