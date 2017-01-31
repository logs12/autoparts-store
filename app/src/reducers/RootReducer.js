import { combineReducers } from 'redux';
import SearchForArticul from '../frontend/reducers/SearchForArticul';
import FormReducer from '../widgets/form/reducers';
import { ConfigData } from './ConfigDataReducer';

import { routerReducer } from 'react-router-redux';

export default combineReducers({
    FormReducer,
    ConfigData,
    SearchForArticul,
    routing: routerReducer
})
