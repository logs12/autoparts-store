import * as INPUT from './constants';

const initialState = { //define initial state - an empty form
    values: {}
};

export default function InpitReducer(state = initialState, action) {
    console.log( 'Form редуктор вызван с состоянием', state, 'и действием', action );
    switch (action.type) {

        case INPUT.INPUT_UPDATE_VALUE:{
            return { ...state,
                values: { ...state.values,
                    [action.name]: action.value
                }
            };
        }
        default: {
            return state;
        }
    }
}