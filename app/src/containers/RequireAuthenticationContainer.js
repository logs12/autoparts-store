import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import * as authActions from '../actions/AuthAction';

import {bindActionCreators} from "redux";
import { LOGIN_ROUTE } from '../constants';

/**
 * Контейнер обертка для проверки компонентов на права
 * @param Component
 * @returns {AuthenticatedComponent}
 * @constructor
 */
export default function RequireAuthenticationContainer(Component) {

    @connect(
        (state) => ({ // mapStateToProps
            configData: state.ConfigData
        }),
        dispatch => ({ // mapDispatchToProps
            actions: bindActionCreators(authActions, dispatch),
            dispatch: dispatch,
        })
    )

    class AuthenticatedComponent extends React.Component {

        componentWillMount() {
            this.checkAuth(this.props.configData.isAuthenticated);
            debugger;
            // При перезагруке странички(f5) заново отсылаем авторизационные данные на сервер
            this.props.authAction();


            this.props.formActions.initForm(
                this.props.formName,
                this.getInputNames(),
                this.props.url
            );
        }

        componentWillReceiveProps(nextProps) {
            debugger;
            this.checkAuth(nextProps.configData.isAuthenticated);
        }

        /**
         * Проверка аутентификации пользователя, если нет перенаправление на страницу авторизации
         * @param isAuthenticated {bool}
         */
        checkAuth(isAuthenticated) {
            if (!isAuthenticated) {
                this.props.dispatch(replace(LOGIN_ROUTE));
            }
        }

        render() {
            return (
                <Component {...this.props} />
            )
        }
    }
    return AuthenticatedComponent;
}