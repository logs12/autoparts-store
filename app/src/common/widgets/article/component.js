import './style.scss';

import React, { Component } from 'react';

import { Link } from 'react-router';

export default class Article extends Component {

    /**
     * Инициализируем контроль типов свойств
     * @type {{buttonBackUrl: *}}
     */
    static propTypes = {
        buttonBackUrl: React.PropTypes.string,
    };

    renderButtonBackUrl() {
        if (this.props.buttonBackUrl) {
            return <Link to={this.props.buttonBackUrl} className="widget-article__button-back mdl-button mdl-js-button mdl-js-ripple-effect">
                Вернуться к списку
            </Link>;
        }
        return false;
    }

    render() {
        return(
            <div className="widget-article">
                <div className="widget-article__ribbon"></div>
                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--2-col"></div>
                    <div className="mdl-cell mdl-cell--8-col">
                        <div className="widget-article__page mdl-shadow--4dp">
                            <div className="widget-article__title-actions">
                                {this.renderButtonBackUrl()}
                            </div>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
