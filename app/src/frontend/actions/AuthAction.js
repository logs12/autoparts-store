import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
} from '../../frontend/constants/AuthConstants';
//import Promise from 'bluebird';

export default function authAction(loginData, url, options) {
    return {
        types: [
            LOGIN_REQUEST,
            LOGIN_SUCCESS,
            LOGIN_ERROR,
            LOGOUT_SUCCESS,
        ],
        promise: () => {
            return new Promise(( resolve, reject) => {
                fetch(url,{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/javascript, */*; q=0.01',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
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
}