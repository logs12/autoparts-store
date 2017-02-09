import { combineReducers } from 'redux';
import SearchForArticul from '../frontend/reducers/SearchForArticul';
import FormReducer from '../widgets/form/reducers';
import SystemError from '../widgets/error/reducers';
import ConfigData from './ConfigDataReducer';
import ProgressBar from '../widgets/progress-bar-widget/reducer';

import Users from '../backend/reducers/UserReducer'

import { routerReducer } from 'react-router-redux';

export default combineReducers({
    FormReducer,
    SystemError,
    ConfigData,
    SearchForArticul,
    ProgressBar,
    Users,
    routing: routerReducer
})
