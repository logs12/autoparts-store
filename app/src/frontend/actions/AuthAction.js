import {
    LOGIN_REQUEST,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
} from '../../frontend/constants/AuthConstants';
//import Promise from 'bluebird';

export default function authAction(loginData) {
    return {
        types: [
            LOGIN_REQUEST,
            LOGIN_ERROR,
            LOGIN_SUCCESS,
            LOGOUT_SUCCESS,
        ],
        promise: () => {
            debugger;
            return new Promise(( resolve, reject ) => {
                fetch('api/login',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData)
                })
                .then(function(response) {
                    if (response.status == 422) {

                    }
                    alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
                    alert(response.status); // 200

                    return response.json();
                })
                .then(function(user) {
                    alert(user.name); //
                })
                .catch((errorMessage) => {
                    reject(new Error(errorMessage));
                });
            });
        }
    }
}