import { combineReducers } from 'redux';
import SearchForArticul from './frontend/reducers/SearchForArticul';
import FormReducer from './widgets/form/reducers';

export default combineReducers({
    SearchForArticul,
    FormReducer,
})
