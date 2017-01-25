import './style.scss';

import React, { Component } from 'react';

import { Link } from 'react-router';
import Article from '../../widgets/article/component';

export default class ErrorPage extends Component {

    /**
     * Инициализируем контроль типов свойств
     * @type {{buttonBackUrl: *}}
     */
    static propTypes = {
        stackTrace: React.PropTypes.string,
        message: React.PropTypes.string,
    };

    /**
     * Устанавливаем свойства по дефолту
     * @type {{buttonBackUrl: string}}
     */
    static defaultProps = {
        stackTrace: '',
        message: '',
    };

    render()  {
        return (
            <div className="error-page">
                <Article>
                    <h3>
                        <i className="error-page_icon fa fa-exclamation-triangle fa-2x mdl-color-text--red-500" aria-hidden="true"></i>
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
                </Article>
            </div>
        )
    }
}
