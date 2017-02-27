import { combineReducers } from 'redux';
import SearchForArticul from '../../frontend/reducers/SearchForArticul';
import FormWidget from '../widgets/form/reducers';
import SystemError from '../widgets/error-widget/reducers';
import ConfigData from './ConfigDataReducer';
import ProgressBarWidget from '../widgets/progress-bar-widget/reducer';
import SnackbarWidget from '../widgets/snackbar-widget/reducer';
import PaginationWidget from '../../common/widgets/pagination-widget/reducer';

import Users from '../../backend/reducers/UserReducer'

import { routerReducer } from 'react-router-redux';

const createReducer = () => {
    return combineReducers({
        Users: combineReducers({
            collection: Users,
            pagination: PaginationWidget,
        }),
        common: combineReducers({
            formWidget: FormWidget,
            snackbarWidget: SnackbarWidget,
            progressBarWidget: ProgressBarWidget,
            configData: ConfigData,
            systemError: SystemError,
        }),
        routing: routerReducer,
    })
};
export default createReducer();
