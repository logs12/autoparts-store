import { WIDGET_CLIENT_ERROR, WIDGET_SERVER_ERROR } from '../../constants';

let initialState = {
    isError: false,
};
export default function SystemError(state = initialState, action) {
    switch (action.type) {
        case WIDGET_SERVER_ERROR: {
            let error = {
                messageError: `(${action.payload.statusCode}) - ${action.payload.error}`,
                stackTraceError: action.payload.stackTrace,
                isError: true,
            };
            return {
                ...error
            }
        }

        case WIDGET_CLIENT_ERROR: {
            let error = {
                messageError: action.payload.messageError,
                isError: true,
            };
            return {
                ...error
            }
        }
        default: {
            return state;
        }
    }
}