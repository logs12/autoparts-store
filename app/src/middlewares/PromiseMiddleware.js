export default function PromiseMiddleware() {
    return next => (dispatch, getState, action) => {

        const { promise, types, ...rest } = action;

        if( !promise ) {
            return next( action );
        }

        const [REQUEST, SUCCESS, ERROR] = types;

        next({ ...rest, type: REQUEST });

        return promise(dispatch, getState).then(
            (result) => {
                next({ ...rest, result, type: SUCCESS });
            },
            (errors) => {
                next({ ...rest, errors, type: ERROR });
            }
        );
    }
}