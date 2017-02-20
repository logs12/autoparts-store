import { BaseFetch } from '../../common/services/BaseFetch';

import {
    USER_URL_REQUEST,
    USERS_GET,
    USER_DELETE,
    USER_WIDGET_FORM_REQUEST,
    USER_WIDGET_FORM_SUCCESS,
    USER_WIDGET_FORM_ERROR,
    PAGINATION_GET,
} from '../../common/constants';

export function UsersGetAction(userId = null) {

    return (dispatch, getState) => {
        return BaseFetch.get({
            url: USER_URL_REQUEST(userId),
            dispatch: dispatch,
            success: object => {
                dispatch({
                    type: USERS_GET,
                    payload: object,
                });
            },
            /*
            success: (response) => {
                let configPagination = getPaginationData(response);
                response.json().then((object) => {
                    dispatch({
                        type: USERS_GET,
                        payload: object,
                    });
                    dispatch({
                        type: PAGINATION_GET,
                        payload: {UserPagination : configPagination},
                    });
                    // Stop ProgressBar
                    dispatch({type: PROGRESS_BAR_WIDGET_STOP});
                })
            }*/
        });
    };
}

export function UserCreateAction(data, options) {
    return {
        types: [
            USER_WIDGET_FORM_REQUEST,
            USER_WIDGET_FORM_SUCCESS,
            USER_WIDGET_FORM_ERROR,
        ],
        promise: (dispatch, getState) => {
            return new Promise((resolve, reject) => {
                BaseFetch.saveOrError({
                    url: data.url,
                    headers: { method: 'POST' },
                    body: data.values,
                    dispatch: dispatch,
                    success: object => resolve(object),
                    error: object => reject(object),
                });
            });
        },
        options: options
    }
}


export function UserUpdateAction(data, options) {
    return {
        types: [
            USER_WIDGET_FORM_REQUEST,
            USER_WIDGET_FORM_SUCCESS,
            USER_WIDGET_FORM_ERROR,
        ],
        promise: (dispatch, getState) => {
            return new Promise((resolve, reject) => {
                BaseFetch.saveOrError({
                    url: data.url,
                    headers: { method: 'PUT' },
                    body: data.values,
                    dispatch: dispatch,
                    success: object => resolve(object),
                    error: object => reject(object),
                });
            });
        },
        options: options
    }
}

export function UserDeleteAction(userId) {
    return (dispatch, getState) => {
        return BaseFetch.delete(
            {
                url: USER_URL_REQUEST(userId),
                dispatch: dispatch,
                getState: getState,
                success: () => {
                    dispatch({
                        type: USER_DELETE,
                        payload: {
                            userId: userId,
                        }
                    });
                },
            },
            { messageSnackbar: 'User deleted' }
        );
    }
}