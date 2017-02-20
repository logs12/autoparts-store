import * as _ from 'lodash';
import {
    PROGRESS_BAR_WIDGET_START,
    PROGRESS_BAR_WIDGET_STOP,
    WIDGET_SERVER_ERROR,
    WIDGET_CLIENT_ERROR,
    ERROR_ROUTE,
    SNACKBAR_WIDGET_ACTIVE,
    PAGINATION_GET,
} from '../constants';
import { push } from 'react-router-redux';
import * as actionsSnackbarWidget from '../widgets/snackbar-widget/actions';


const getPaginationData = (response) => {
    return {
        total: response.headers.get('X-Pagination-Total-Count'),
        current: response.headers.get('X-Pagination-Current-Page'),
        perPage: response.headers.get('X-Pagination-Per-Page'),
    };
};

const BaseFetch = {};

/**
 * Basic method fetch request
 * @param options
 */
BaseFetch.fetch = options => {

    const dispatch = options.dispatch;

    // Start ProgressBar
    dispatch({type: PROGRESS_BAR_WIDGET_START});

    // Check requires options
    if (!options.url) {
        dispatch({
            type: WIDGET_CLIENT_ERROR,
            payload: {
                messageError: 'There is not required parameter "url" in fetch request',
            }
        });
    }
    if (!options.headers) {
        dispatch({
            type: WIDGET_CLIENT_ERROR,
            payload: {
                messageError: 'There is not required parameters "headers" in fetch request',
            }
        });
    }

    const url = options.url,
        headers = options.headers,
        success = options.success || null,
        error = options.error || null;

    return fetch(url, headers)
        .then((response) => {
            switch (response.status) {
                // status code for success get
                case 200: {
                    let headerPagination = getPaginationData(response);
                    dispatch({
                        type: PAGINATION_GET,
                        payload: headerPagination,
                    });
                    response.json().then((object) => {
                        // Stop ProgressBar
                        dispatch({type: PROGRESS_BAR_WIDGET_STOP});

                        if (typeof success === 'function') {
                            success(object);
                        }
                    });
                    break;
                }
                // status code success update
                case 201: {
                    response.json().then((object) => {
                        // Stop ProgressBar
                        dispatch({type: PROGRESS_BAR_WIDGET_STOP});

                        if (typeof success === 'function') {
                            success(object);
                        }
                    });
                    break;
                }
                // status code success delete
                case 204: {
                    dispatch({type: PROGRESS_BAR_WIDGET_STOP});
                    if (typeof success === 'function') {
                        success();
                    }
                    break;
                }
                // status code error validate on server
                case 422: {
                    response.json().then((object) => {

                        // Stop ProgressBar
                        dispatch({type: PROGRESS_BAR_WIDGET_STOP});

                        if (typeof error === 'function') {
                            error(object);
                        }
                    });
                    break;
                }
                // status code server error
                case 500: {
                    response.json().then((object) => {

                        // Stop ProgressBar
                        dispatch({type: PROGRESS_BAR_WIDGET_STOP});

                        dispatch({
                            type: WIDGET_SERVER_ERROR,
                            payload: object,
                        });
                        dispatch(push(ERROR_ROUTE));
                        if (typeof error === 'function') {
                            error(object);
                        }
                    });
                    break;
                }
            }
        })
        .catch((error) => {
            dispatch({
                type: WIDGET_CLIENT_ERROR,
                payload: {
                    messageError: 'Fetch Error :-S', error
                },
            });
        });
};

/**
 * Basic method for sending the request to get or error
 * @param options
 */
BaseFetch.get = options => {

    options.headers = _.merge({
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/javascript, *!/!*; q=0.01',
            'Content-Type': 'application/json',
        },
        credentials: 'include', // поддержка cookie
    }, options.headers);

    BaseFetch.fetch(options);
};

/**
 * Basic method for sending the request to save or error
 * @param options
 */
BaseFetch.saveOrError = options => {

    // Check requires options
    if (!options.body) {
        options.dispatch({
            type: WIDGET_CLIENT_ERROR,
            payload: {
                messageError: 'There is not required parameter "body" in fetch request',
            }
        });
    }

    options.headers = _.merge({
        headers: {
            'Accept': 'application/json, text/javascript, *!/!*; q=0.01',
            'Content-Type': 'application/json',
        },
        credentials: 'include', // поддержка cookie
        body: JSON.stringify(options.body),
    }, options.headers);

    BaseFetch.fetch(options);
};

/**
 *
 * @param options
 * @param snackbarWidget (bool) - show or hide snackbar
 */
BaseFetch.delete = (options, snackbarWidget = {}) => {

    options.headers = _.merge({
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/javascript, *!/!*; q=0.01',
            'Content-Type': 'application/json',
        },
        credentials: 'include', // поддержка cookie
    }, options.headers);

    if (!_.isEmpty(snackbarWidget)) {
        snackbarWidget['actionTimeoutSnackbar'] = () => BaseFetch.fetch(options);
        options.dispatch(actionsSnackbarWidget.SnackbarWidgetActiveAction(snackbarWidget));
    } else {
        BaseFetch.fetch(options);
    }

};

module.exports.BaseFetch = BaseFetch;