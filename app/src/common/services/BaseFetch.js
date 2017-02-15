import * as _ from 'lodash';
import {
    PROGRESS_BAR_WIDGET_START,
    PROGRESS_BAR_WIDGET_STOP,
    WIDGET_SERVER_ERROR,
    WIDGET_CLIENT_ERROR,
    ERROR_ROUTE,
} from '../constants';
import { push } from 'react-router-redux';

const BaseFetch = {};

/**
 * Basic method fetch request
 * @param options
 */
BaseFetch.fetch = (options) => {

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
                case 200: {
                    response.json().then((object) => {
                        // Stop ProgressBar
                        dispatch({type: PROGRESS_BAR_WIDGET_STOP});

                        if (typeof success === 'function') {
                            success(object);
                        }
                    });
                    break;
                }
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
BaseFetch.get = (options) => {

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
BaseFetch.saveOrError = (options) => {

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

module.exports.BaseFetch = BaseFetch;