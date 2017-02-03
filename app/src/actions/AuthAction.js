import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
} from '../constants';

import {actionFormDecorator} from '../widgets/form/decorators/@actionFormDecorator';

import { push } from 'react-router-redux';


export function authAction(data, options) {
    try {
        if (!data.values) throw new Error(`В ${actionName} не передано данные формы`);
        if (!data.url) throw new Error(`В ${actionName} не передано значение url для отправки данных на сервер`);
        return {
            types: [
                LOGIN_REQUEST,
                LOGIN_SUCCESS,
                LOGIN_ERROR,
                LOGOUT_SUCCESS,
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

                                //resolve(object);
                                //return object;
                                // Не используем re
                                dispatch({
                                    type: LOGIN_SUCCESS,
                                    payload: object,
                                    options: {...options},
                                });
                                dispatch(push('/admin'));
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