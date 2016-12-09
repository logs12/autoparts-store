import { combineReducers } from 'redux';
import SearchForArticul from './SearchForArticul';
import FormReducer from '../../widgets/Form/reducers';
import InputTextReducer from '../../widgets/InputText/reducers';


export default combineReducers({
    SearchForArticul,
    FormReducer,
    InputTextReducer
})
