import './style.scss';

import React, { Component, PropTypes } from "react";

import {
    WIDGET_FORM_REQUEST,
} from '../../constants';

import Button from 'react-mdl/lib/Button';

export default class ButtonLoadingComponent extends Component {

    static propTypes = {
        className: PropTypes.string,
        label: PropTypes.string,
        disabled: PropTypes.bool,
        stateElement: PropTypes.object,
    };

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
                        onClick={this.props.handleClickButton}
                >
                    {this.props.label}
                </Button>
                <div className="widget-button-loading__state-container">
                    {this.props.stateElement}
                </div>
            </div>
        )
    }
}