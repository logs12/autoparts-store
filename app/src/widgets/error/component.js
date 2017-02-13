import './style.scss';

import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

import Article from '../../widgets/article/component';

const renderStackTraceError = stackTraceError => {
    if (stackTraceError) {
        return stackTraceError.map((error, index) => <p key={index}>{error}</p>);
    }
    return null;
};

/**
 * Компонент отрисовки ошибки
 * @param props - {
 *  messageError - текст ошибки
 *  stackTraceError - stack trace ошибки
 * }
 * @returns {XML}
 * @constructor
 */
const ErrorComponent = (props) => {
    return (
        <Article>
            <h3>
                <i className="error_icon fa fa-exclamation-triangle fa-2x mdl-color-text--red-500" aria-hidden="true"></i>
                {props.messageError}
            </h3>
            <div className="error__message mdl-color-text--grey-600">
                Произошла ошибка. Мы уже знаем о ней и сделаем всё возможное для её исправления.
                <br />
                Попробуйте обновить страницу (например, нажав клавишу F5).
                <br />
                <Link to="/">Переход на главную страницу</Link>
            </div>
            <div className="error__stack-trace mdl-card__supporting-text">
                {renderStackTraceError(props.stackTraceError)}
            </div>

        </Article>
    );
};

export default ErrorComponent;