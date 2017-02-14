import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../../common/reducers/RootReducer';
import ThunkMiddleware from '../../common/middlewares/ThunkMiddleware';
import createLogger from 'redux-logger';
import PromiseMiddleware from '../../common/middlewares/PromiseMiddleware';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import DevTools from '../../DevTools'

export default function configureStore() {
    const store = compose(
        applyMiddleware(ThunkMiddleware),
        applyMiddleware(PromiseMiddleware),
        applyMiddleware(createLogger()),
        applyMiddleware(routerMiddleware(browserHistory)),
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        DevTools.instrument()
    )(createStore)(rootReducer);

    return store;
}