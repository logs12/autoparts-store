import { combineReducers } from 'redux';
import SearchForArticul from '../frontend/reducers/SearchForArticul';
import FormReducer from '../widgets/form/reducers';
import AuthReducer from './AuthReducer';

import { routerReducer } from 'react-router-redux';

export default combineReducers({
    FormReducer,
    AuthReducer,
    SearchForArticul,
    routing: routerReducer
})
