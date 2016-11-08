import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger';
import promiseMiddleware from '../../middlewares/promiseMiddleware';
import { redirect } from '../../middlewares/redirect';

export default function configureStore() {
    const store = compose(
        applyMiddleware(thunkMiddleware),
        applyMiddleware( promiseMiddleware ),
        applyMiddleware(createLogger()),
        applyMiddleware( redirect )
    )(createStore)(rootReducer);

    return store;
}
