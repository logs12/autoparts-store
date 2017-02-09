import {
    USER_URL_REQUEST,
    USERS_ROUTE,
    USER_VIEW_ROUTE,
    USER_UPDATE_ROUTE,
    USER_DELETE_ROUTE,
    USERS_GET,
    USER_VIEW,
    USER_CREATE,
    USER_UPDATE,
    USER_DELETE,
    WIDGET_ERROR_GET,
    PROGRESS_BAR_WIDGET_START,
    PROGRESS_BAR_WIDGET_STOP,
} from '../../constants';

export function UsersGetAction() {
    return (dispatch, getState) => {
        let state = getState();

        // Start ProgressBar
        dispatch({type: PROGRESS_BAR_WIDGET_START});

        return fetch(USER_URL_REQUEST, {
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
                            type: USERS_GET,
                            payload: object,
                        });
                        // Stop ProgressBar
                        dispatch({type: PROGRESS_BAR_WIDGET_STOP});
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