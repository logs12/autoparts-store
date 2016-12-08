import * as INPUT from './constants';

const initialState = { //define initial state - an empty form
};

export default function InputTextReducer(state = initialState, action) {
    console.log( 'Form редуктор вызван с состоянием', state, 'и действием', action );
    switch (action.type) {

        case INPUT.INPUT_UPDATE_VALUE:{
            return {
                ...state,
                    [action.name]: {
                        value: action.value,
                        error: action.error
                    }
            };
        }
        default: {
            return state;
        }
    }
}