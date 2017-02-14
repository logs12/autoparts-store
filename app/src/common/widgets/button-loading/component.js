import './style.scss';

import React, {Component} from "react";

import {
    WIDGET_FORM_INIT,
    WIDGET_FORM_REQUEST,
    WIDGET_FORM_SUCCESS,
    WIDGET_FORM_ERROR
} from '../../constants';

import Button from 'react-mdl/lib/Button';
import Spinner from 'react-mdl/lib/Spinner';

export default class ButtonLoadingComponent extends Component {

    static propTypes = {
        className: React.PropTypes.string,
        label: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        buttonState: React.PropTypes.string,
    };

    successElement = <div className="widget-button-loading__success-text widget-button-loading__success-text--icon mdl-color-text--green-600">
                    <i className="material-icons">done</i>
                </div>;

    errorElement = <div className="widget-button-loading__error-text widget-button-loading__error-text--icon mdl-color-text--red-600">
                <i className="material-icons">error</i>
            </div>;

    /**
     * Визуализация состояния кнопки
     * @returns {*}
     */
    renderStateButton() {

        let stateElement = null;

        switch (this.props.buttonState) {
            case WIDGET_FORM_REQUEST: {
                stateElement = <Spinner />;
                break;
            }
            case WIDGET_FORM_SUCCESS: {
                stateElement = this.successElement;
                break;
            }
            case WIDGET_FORM_ERROR: {
                stateElement = this.errorElement;
                break;
            }
        }

        return stateElement;
    }

    /**
     * Метод выключения кнопки, кнопка должна быть выключенна, если нет изменений у сущности и если происходит
     * процесс коннекта с сервером
     * @returns {*}
     */
    renderDisabled() {
        if (this.props.disabled || this.props.buttonState == WIDGET_FORM_REQUEST) {
            return 'disabled';
        }
    }

    render() {
        return (
            <div className={'widget-button-loading ' + this.props.className}>
                <Button className={this.props.className}
                        disabled={this.renderDisabled()}
                >
                    {this.props.label}
                </Button>
                <div className="widget-button-loading__state-container">
                    {this.renderStateButton()}
                </div>
            </div>
        )
    }
}