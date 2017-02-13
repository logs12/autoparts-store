import {
    WIDGET_SERVER_ERROR,
    CONFIG_DATA_GET,
    CONFIG_DATA_URL_REQUEST,
    ERROR_ROUTE
} from '../constants';
import { push } from 'react-router-redux';

/**
 * Action get config
 * @returns {function(*=, *)}
 */
export default function configDataAction() {
    return (dispatch, getState) => {
        let state = getState();

        return new Promise((resolve, reject) => {
            fetch(CONFIG_DATA_URL_REQUEST, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/javascript, *!/!*; q=0.01',
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // поддержка cookie
            })
                .then((response) => {
                    if (response.status === 200) {
                        response.json().then((object) => {
                            dispatch({
                                type: CONFIG_DATA_GET,
                                payload: object,
                            });
                            resolve(object);
                        })
                    } else if (response.status === 500) {
                        response.json().then((object) => {
                            dispatch({
                                type: WIDGET_SERVER_ERROR,
                                payload: object,
                            });
                            dispatch(push(ERROR_ROUTE));
                            reject(object);
                        })
                    }
                })
                .catch(function (err) {
                    alert("Oops...", "Couldn't fetch repos for user: " + state.user, "error");
                });
        });
    };
}