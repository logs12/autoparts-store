function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
        }

        return next(dispatch, getState, action);
    };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
