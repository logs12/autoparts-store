import { combineReducers } from 'redux';
import SearchForArticul from './SearchForArticul';
import combineFormReducers from '../../widgets/Form/reducers';
import InputTextReducer from '../../widgets/InputText/reducers';


export default combineReducers({
    SearchForArticul,
    combineFormReducers,
    InputTextReducer
})
