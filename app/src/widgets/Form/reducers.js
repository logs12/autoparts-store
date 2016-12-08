import { combineReducers } from 'redux';
import * as FORM from './constants';

const initialState = { //define initial state - an empty form
};

export function FormReducer(state = initialState, action) {
    console.log( 'Form редуктор вызван с состоянием', state, 'и действием', action );
    switch (action.type) {

        case FORM.FORM_UPDATE_VALUE:{
            return {
                ...state,
                [action.formName] : {
                    url: action.url
                }

            }
        }

        case FORM.FORM_RESET:{
            return initialState;
        }

        default: {
            return state;
        }
    }
}

export default combineFormReducers({
    FormReducer,
    InputTextReducer
})
