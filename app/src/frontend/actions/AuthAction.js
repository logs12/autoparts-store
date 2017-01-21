import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
} from '../../frontend/constants/AuthConstants';
//import Promise from 'bluebird';

import {actionFormDecorator} from '../../widgets/Form/decorators/@actionFormDecorator';

export default function authAction(data, options) {
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
            promise: () => {
                return new Promise((resolve, reject) => {
                    fetch(data.url, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/javascript, */*; q=0.01',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data.values)
                    })
                        .then((response) => {
                            if (response.status === 200) {
                                resolve(response.json());
                            } else {
                                response.json().then((object) => {
                                    reject(object);
                                });
                            }
                        })/*
                         .then(function(user) {
                         alert(user.name); //
                         })*/
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