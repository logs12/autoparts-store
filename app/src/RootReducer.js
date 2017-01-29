import { combineReducers } from 'redux';
import SearchForArticul from './frontend/reducers/SearchForArticul';
import FormReducer from './widgets/form/reducers';

import { routerReducer } from 'react-router-redux';

export default combineReducers({
    SearchForArticul,
    FormReducer,
    routing: routerReducer
})
