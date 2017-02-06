import {
    LOGIN_WIDGET_FORM_REQUEST,
    LOGIN_WIDGET_FORM_SUCCESS,
    LOGIN_WIDGET_FORM_ERROR,
    WIDGET_ERROR_GET,
    CONFIG_DATA_URL_REQUEST,
    LOGIN_SUCCESS,
} from '../constants';

import {actionFormDecorator} from '../widgets/form/decorators/@actionFormDecorator';

import { push } from 'react-router-redux';


export function authAction(data, options) {
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
                                debugger;
                                dispatch({
                                    type: LOGIN_SUCCESS,
                                    payload: object,
                                    options: {...options},
                                });
                                dispatch(push('/admin'));
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

