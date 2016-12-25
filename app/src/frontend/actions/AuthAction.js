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
                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    body: JSON.stringify(loginData)
                })
                .then((response) => {
                    if (response.status === 200) {
                        return resolve(response.json());
                    }
                    response.json().then((object) => {
                        reject(object);
                    });
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