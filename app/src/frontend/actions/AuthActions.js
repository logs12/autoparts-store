import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
} from '../../frontend/constants/Auth';
//import Promise from 'bluebird';

export function authAction(loginData) {
    return {
        types: [
            LOGIN_REQUEST,
            LOGIN_FAIL,
            LOGIN_SUCCESS,
            LOGOUT_SUCCESS,
        ],
        promise: () => {
            debugger;
            return new Promise(( resolve, reject ) => {
                fetch('api/user/auth',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData)
                })
                .then(function(response) {
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