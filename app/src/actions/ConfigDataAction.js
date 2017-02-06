import {
    WIDGET_ERROR_GET,
    CONFIG_DATA_URL_REQUEST,
    LOGIN_SUCCESS,
} from '../constants';

/**
 * Action get config
 * @returns {function(*=, *)}
 */
export function configDataAction() {
    return (dispatch, getState) => {
        var state = getState();

        return fetch(CONFIG_DATA_URL_REQUEST,{
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
                        type: LOGIN_SUCCESS,
                        payload: object,
                    });
                })
            } else if (response.status === 500) {
                response.json().then((object) => {
                    dispatch({
                        type: WIDGET_ERROR_GET,
                        payload: object,
                    });
                })
            }
        })
        .catch(function (err) {
            alert("Oops...", "Couldn't fetch repos for user: " + state.user, "error");
        });
    };
}