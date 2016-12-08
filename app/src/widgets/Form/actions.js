import * as FORM from './constants';

export function update(formName, url) {
    return dispatch => dispatch({
        type: FORM.FORM_UPDATE_VALUE,
        formName,
        url
    });
}

export function reset() {
    return dispatch => dispatch({
        type: FORM.FORM_RESET
    });
}