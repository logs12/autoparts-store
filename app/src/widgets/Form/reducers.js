import * as FORM from './constants';

const initialState = { //define initial state - an empty form
};


export default function FormReducer(state = initialState, action) {
    console.log( 'Form редуктор вызван с состоянием', state, 'и действием', action );
    switch (action.type) {

        case FORM.FORM_UPDATE_VALUE:{
            return {
                ...state,
                [action.formName] : {
                    [action.textInputName]: {
                        value: action.textInputName.value,
                        error: action.textInputName.error,
                    },
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
