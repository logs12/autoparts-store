import * as INPUT from './constants';

export function update(name, value) {
    return dispatch => dispatch({
        type: INPUT.INPUT_UPDATE_VALUE,
        name,
        value
    });
}