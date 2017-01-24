import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger';
import promiseMiddleware from '../../middlewares/promiseMiddleware';
import { redirect } from '../../middlewares/redirect';
import DevTools from '../../DevTools'

export default function configureStore() {
    const store = compose(
        applyMiddleware(thunkMiddleware),
        applyMiddleware( promiseMiddleware ),
        applyMiddleware(createLogger()),
        applyMiddleware( redirect ),
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        //DevTools.instrument()
    )(createStore)(rootReducer);

    return store;
}