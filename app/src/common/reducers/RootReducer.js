import { combineReducers } from 'redux';
import SearchForArticul from '../../frontend/reducers/SearchForArticul';
import FormWidget from '../widgets/form/reducers';
import SystemError from '../widgets/error/reducers';
import ConfigData from './ConfigDataReducer';
import ProgressBarWidget from '../widgets/progress-bar-widget/reducer';
import SnackbarWidget from '../widgets/snackbar-widget/reducer';
import CollectionPaginations from '../../backend/reducers/CollectionPaginations';

import Users from '../../backend/reducers/UserReducer'

import { routerReducer } from 'react-router-redux';

export default combineReducers({
    FormWidget,
    SystemError,
    ConfigData,
    SearchForArticul,
    ProgressBarWidget,
    SnackbarWidget,
    Users,
    CollectionPaginations,
    routing: routerReducer
})
