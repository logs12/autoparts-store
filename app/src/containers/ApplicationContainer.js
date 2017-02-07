import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace, push } from 'react-router-redux';
import {bindActionCreators} from "redux";

import { authAction } from '../actions/AuthAction';

import configDataAction from '../actions/ConfigDataAction';

import { LOGIN_ROUTE } from '../constants';

import Preloader from '../components/Preloader';
import ErrorPage from "../pages/ErrorPage";

/*import configureStore from '../store/ConfigureStore';

 const store = configureStore();

 export default function ApplicationContainer() {

     let rtrt = store.dispatch(configDataAction());
     rtrt.then((resolve) => {
     debugger;
     let sdd = store.getState();
     if (!sdd.ConfigData.isAuthenticated) {
     store.dispatch(replace(LOGIN_ROUTE));
     }
     });
 }*/

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
        }),
        dispatch => ({ // mapDispatchToProps
            actions: bindActionCreators({ authAction, configDataAction}, dispatch),
            dispatch: dispatch,
        })
    )

    class ApplicationComponent extends React.Component {

        /**
         * false - показывается обычный компонент, true - компонент ошибки
         * @type {boolean}
         */
        isError = false;

        comp = <Preloader />;

        state = {
            isAuthenticated: false,
        };

        componentWillMount() {
            //debugger;
            //this.checkAuth(this.props.configData.isAuthenticated);

            this.state.isAuthenticated = this.props.configData.isAuthenticated;
        }


        componentWillReceiveProps(nextProps) {
            debugger;
            this.isError = nextProps.systemError.isError;
            this.state.isAuthenticated = nextProps.configData.isAuthenticated;
            //this.checkAuth(nextProps.configData.isAuthenticated);
        }

        /**
         * Проверка аутентификации пользователя, если нет перенаправление на страницу авторизации
         * @param isAuthenticated {bool} - флаг аутентифицирован ли пользователь
         */
        checkAuth(isAuthenticated) {

            if (!isAuthenticated && isRequireAuthentication) {
                this.props.dispatch(replace(LOGIN_ROUTE));
            } else {
                this.comp = null;
                /// Проверить props!!!
                this.comp = <Component {...this.props} />;
            }
            console.log('this.comp = ',this.comp);
            //console.log('this.comp = ',this.comp.props.router.location.pathname);
        }

        renderComponent() {

            if (!this.state.isAuthenticated && isRequireAuthentication) {
                this.props.dispatch(replace(LOGIN_ROUTE));
            }
            return  <Component {...this.props} />;
        }

        render() {
            return (
                (!this.isError) ? this.renderComponent() : <ErrorPage/>
            )
        }
    }
    return ApplicationComponent;
}