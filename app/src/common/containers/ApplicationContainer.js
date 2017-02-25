import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace, push } from 'react-router-redux';

import { LOGIN_ROUTE } from '../constants';

import ErrorPage from "../pages/ErrorPage";

/**
 * Контейнер обертка для проверки компонентов на права
 * @param Component
 * @param isRequireAuthentication - флаг делать ли проверку на аутентификацию компонента
 * @returns {ApplicationComponent}
 * @constructor
 */
export default function ApplicationContainer(Component, isRequireAuthentication = true) {

    @connect(
        (state) => ({ // mapStateToProps
            configData: state.common.configData,
            systemError: state.common.systemError,
            routing: state.routing,
        })
    )

    class ApplicationComponent extends React.Component {

        /**
         * false - показывается обычный компонент, true - компонент ошибки
         * @type {boolean}
         */
        isError = false;

        componentWillMount() {
            this.checkAuth(this.props);
        }

        componentWillReceiveProps(nextProps) {
            this.isError = nextProps.systemError.isError;
            this.checkAuth(nextProps);
        }

        /**
         * Проверка аутентификации пользователя, если нет перенаправление на страницу авторизации
         * @param props
         */
        checkAuth(props) {
            if (!props.configData.isAuthenticated && isRequireAuthentication) {
                this.props.dispatch(push(LOGIN_ROUTE));
            }
        }

        render() {
            return (
                (!this.isError) ? <Component { ...this.props } /> : <ErrorPage/>
            )
        }
    }

    return ApplicationComponent;
}