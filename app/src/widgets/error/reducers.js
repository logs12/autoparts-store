import { WIDGET_ERROR_GET } from '../../constants';

let initialState = {
    messageError: null,
    stackTraceError: null,
};
export function SystemError(state = initialState, action) {
    switch (action.type) {
        case WIDGET_ERROR_GET: {
            let error = {
                messageError: `${action.payload.statusCode} - ${action.payload.error}`,
                stackTraceError: action.payload.stackTrace,
            };
            return {
                ...state,
                ...error
            }
        }
    }

    return state;
}