import { BaseFetch } from '../../utils/BaseFetch';

import { push } from 'react-router-redux';
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
    WIDGET_SERVER_ERROR,
    PROGRESS_BAR_WIDGET_START,
    PROGRESS_BAR_WIDGET_STOP,
    PAGINATION_GET,
} from '../../constants';

const getPaginationData = (response) => {
    return {
        total: response.headers.get('X-Pagination-Total-Count'),
        current: response.headers.get('X-Pagination-Current-Page'),
        perPage: response.headers.get('X-Pagination-Per-Page'),
    };
};

export function UsersGetAction() {
    return (dispatch, getState) => {

        return BaseFetch.get({
            url: USER_URL_REQUEST,
            dispatch: dispatch,
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

}

export function UserDeleteAction() {

}