import {
    PROGRESS_BAR_WIDGET_START,
    WIDGET_SERVER_ERROR,
    WIDGET_CLIENT_ERROR,
    ERROR_ROUTE,
} from '../constants';
import { push } from 'react-router-redux';

import configureStore from '../store/ConfigureStore';


const store = configureStore();


function BaseFetch() {}

/**
 *
 * @param options
 */
BaseFetch.fetch = (options) => {

    const dispatch = options.dispatch;

    // Start ProgressBar
    store.dispatch({type: PROGRESS_BAR_WIDGET_START});

    // Check requires options
    if (!options.url) {
        dispatch({
            type: WIDGET_CLIENT_ERROR,
            payload: object,
        });
    }

    const url = options.url,
        optionsFetch = options.optionsFetch || {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/javascript, *!/!*; q=0.01',
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // поддержка cookie
            },
        success = options.success || null,
        error = options.error || null;

    fetch(url, optionsFetch)
        .then((response) => {
            if (response.status === 200) {
                if (typeof success === 'function') {
                    success(response);
                }
            } else if (response.status === 500) {
                response.json().then((object) => {
                    store.dispatch({
                        type: WIDGET_SERVER_ERROR,
                        payload: object,
                    });
                    store.dispatch(push(ERROR_ROUTE));
                    if (typeof error === 'function') {
                        error(response);
                    }
                })
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

BaseFetch.get = (options) => {
    let optionsBaseFetchGet = options;
    if (!options.optionsFetch) {
        optionsBaseFetchGet.optionsFetch = {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/javascript, *!/!*; q=0.01',
                'Content-Type': 'application/json',
            },
            credentials: 'include', // поддержка cookie
        };
    }
    BaseFetch.fetch(optionsBaseFetchGet);
};


module.exports.BaseFetch = BaseFetch;