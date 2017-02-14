import { BaseFetch } from '../../common/utils/BaseFetch';

import {
    USER_GET_URL_REQUEST,
    USERS_ROUTE,
    USER_VIEW_ROUTE,
    USER_UPDATE_ROUTE,
    USER_DELETE_ROUTE,
    USERS_GET,
    USER_VIEW,
    USER_CREATE,
    USER_UPDATE,
    USER_DELETE,
    USER_WIDGET_FORM_REQUEST,
    USER_WIDGET_FORM_SUCCESS,
    USER_WIDGET_FORM_ERROR,
    WIDGET_SERVER_ERROR,
    PROGRESS_BAR_WIDGET_START,
    PROGRESS_BAR_WIDGET_STOP,
    PAGINATION_GET,
} from '../../common/constants';

const getPaginationData = (response) => {
    return {
        total: response.headers.get('X-Pagination-Total-Count'),
        current: response.headers.get('X-Pagination-Current-Page'),
        perPage: response.headers.get('X-Pagination-Per-Page'),
    };
};

export function UsersGetAction() {
    return (dispatch, getState) => {
        dispatch({type: PROGRESS_BAR_WIDGET_START});
        return BaseFetch.get({
            url: USER_GET_URL_REQUEST,
            //dispatch: dispatch,
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
            }
        });
    };
}

export function UserCreateAction() {
    
}


export function UserUpdateAction() {
    try {
        if (!data.values) new Error(`В ${actionName} не передано данные формы`);
        if (!data.url) new Error(`В ${actionName} не передано значение url для отправки данных на сервер`);
        return {
            types: [
                USER_WIDGET_FORM_REQUEST,
                USER_WIDGET_FORM_SUCCESS,
                USER_WIDGET_FORM_ERROR,
            ],
            promise: (dispatch, getState) => {
                    BaseFetch.update({
                        url: USER_URL_REQUEST,
                        //dispatch: dispatch,
                        success: (response) => {
                            response.json().then((object) => {
                                // Stop ProgressBar
                                dispatch({type: PROGRESS_BAR_WIDGET_STOP});
                            })
                        }
                    });
            },
            options: options
        }
    } catch (Error) {
        alert(Error);
    }
}

export function UserDeleteAction() {

}