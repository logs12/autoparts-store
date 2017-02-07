import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace, push } from 'react-router-redux';
import {bindActionCreators} from "redux";

import { loginAction } from '../actions/AuthAction';

import configDataAction from '../actions/ConfigDataAction';

import { LOGIN_ROUTE } from '../constants';

import Preloader from '../components/Preloader';
import ErrorPage from "../pages/ErrorPage";

/**
 * Контейнер обертка для проверки компонентов на права
 * @param Component
 * @param isRequireAuthentication - флаг делать ли проверку на аутентификацию компонента
 * @returns {AuthenticatedComponent}
 * @constructor
 */
export default function ApplicationContainer(Component, isRequireAuthentication = true) {
    @connect(
        (state) => ({ // mapStateToProps
            configData: state.ConfigData,
            systemError: state.SystemError,
            routing: state.routing,
        }),
        dispatch => ({ // mapDispatchToProps
            actions: bindActionCreators({ loginAction, configDataAction}, dispatch),
            dispatch: dispatch,
        })
    )

    class ApplicationComponent extends React.Component {

        /**
         * false - показывается обычный компонент, true - компонент ошибки
         * @type {boolean}
         */
        isError = false;

        component = <Preloader />

        componentWillReceiveProps(nextProps) {
            this.isError = nextProps.systemError.isError;
            this.checkAuth(nextProps);
        }

        /**
         * Проверка аутентификации пользователя, если нет перенаправление на страницу авторизации
         * @param props
         */
        checkAuth(props) {
            debugger;
            if (!props.configData.isAuthenticated && isRequireAuthentication) {
                this.props.dispatch(replace(LOGIN_ROUTE));
            } else {
                this.component = <Component { ...props } />
            }
        }

        render() {
            return (
                (!this.isError) ? this.component : <ErrorPage/>
            )
        }
    }
    return ApplicationComponent;
}