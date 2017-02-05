import { combineReducers } from 'redux';
import SearchForArticul from '../frontend/reducers/SearchForArticul';
import FormReducer from '../widgets/form/reducers';
import { SystemError } from '../widgets/error/reducers';
import { ConfigData } from './ConfigDataReducer';

import { routerReducer } from 'react-router-redux';

export default combineReducers({
    FormReducer,
    SystemError,
    ConfigData,
    SearchForArticul,
    routing: routerReducer
})
