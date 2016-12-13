import * as FORM from './constants';

const initialState = { //define initial state - an empty form
};


export default function FormReducer(state = initialState, action) {
    console.log( 'Form редуктор вызван с состоянием', state, 'и действием', action );
    switch (action.type) {

        case FORM.INIT_FORM: {
            return {
                ...state,
                [action.formName]: {
                    values: action.inputNames,
                    errors: action.inputNames
                }
            }
        }

        case FORM.INPUT_TEXT_UPDATE_VALUE:
        {
            for(let inputName in state[action.formName]['values']) {
                if (inputName === action.inputName) {
                    state[action.formName]['values'][action.inputName] =  action.value ? action.value : null;
                }
            }

            return state;
        }

        case FORM.FORM_RESET:{
            return initialState;
        }

        default: {
            return state;
        }

    }
}

function inputTextUpdate(state = {}, action) {

    return {
        ...state,
        [action.textInputName]: {
            value: action.value,
            error: action.error,
        }
    }
}