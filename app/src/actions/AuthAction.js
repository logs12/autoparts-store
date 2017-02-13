import {
    LOGIN_WIDGET_FORM_REQUEST,
    LOGIN_WIDGET_FORM_SUCCESS,
    LOGIN_WIDGET_FORM_ERROR,
    WIDGET_ERROR_GET,
    LOGIN_SUCCESS,
    LOGIN_ROUTE,
    LOGOUT_SUCCESS,
    LOGOUT_URL_REQUEST,
    ADMIN_ROUTE,
} from '../constants';

import {actionFormDecorator} from '../widgets/form/decorators/@actionFormDecorator';

import { replace } from 'react-router-redux';


export function loginAction(data, options) {
    try {
        if (!data.values) throw new Error(`В ${actionName} не передано данные формы`);
        if (!data.url) throw new Error(`В ${actionName} не передано значение url для отправки данных на сервер`);
        return {
            types: [
                LOGIN_WIDGET_FORM_REQUEST,
                LOGIN_WIDGET_FORM_SUCCESS,
                LOGIN_WIDGET_FORM_ERROR,
            ],
            promise: (dispatch, getState) => {
                return new Promise((resolve, reject) => {
                    fetch(data.url, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/javascript, *!/!*; q=0.01',
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include', // поддержка cookie
                        body: JSON.stringify(data.values)
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            response.json().then((object) => {
                                dispatch({
                                    type: LOGIN_SUCCESS,
                                    payload: object,
                                    options: {...options},
                                });
                                dispatch(replace(ADMIN_ROUTE));
                            })
                        } else if (response.status === 500) {
                            response.json().then((object) => {
                                dispatch({
                                    type: WIDGET_ERROR_GET,
                                    payload: object,
                                });
                            })
                        } else {
                            response.json().then((object) => {
                                reject(object);
                                return object;
                            })
                        }
                    })

                    .catch((errorMessage) => {
                        reject(new Error(errorMessage));
                    });
                });
            },
            options: options
        }
    } catch (Error) {
        alert(Error);
    }
}

export function logOutAction() {
    return (dispatch, getState) => {
        let state = getState();

        return fetch(
                LOGOUT_URL_REQUEST, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, *!/!*; q=0.01',
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // поддержка cookie
            })
            .then((response) => {
                if (response.status === 200) {
                    dispatch({type:LOGOUT_SUCCESS});
                } else if (response.status === 500) {
                    response.json().then((object) => {
                        dispatch({
                            type: WIDGET_ERROR_GET,
                            payload: object,
                        });
                    })
                }
            })
            .catch((error) => {
                console.log('Fetch Error :-S', error);
            });
    };
}
