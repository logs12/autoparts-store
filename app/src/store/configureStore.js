import { createStore, applyMiddleware, combineReducers  } from 'redux';
import rootReducer from '../reducers';
import PromiseMiddleware from '../middleware/PromiseMiddleware';

export default function configureStore(initialState) {
    const store = createStore( 
            rootReducer,
            initialState,
            applyMiddleware( promiseMiddleware )
        );

    return store;
}
