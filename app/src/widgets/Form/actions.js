import * as FORM from './constants';

export function update(name, value) {
    return dispatch => dispatch({
        type: FORM.FORM_UPDATE_VALUE,
        name,
        value
    });
}

export function reset() {
    return dispatch => dispatch({
        type: FORM.FORM_RESET
    });
}