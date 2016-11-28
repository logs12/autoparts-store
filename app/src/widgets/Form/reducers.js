import * as FORM from './constants';

const initialState = { //define initial state - an empty form
    values: {}
};

export default (state = initialState, action) => {
    console.log( 'Form редуктор вызван с состоянием', state, 'и действием', action );
    switch (action.type) {

        case FORM.FORM_UPDATE_VALUE:{
            return { ...state,
                values: { ...state.values,
                    [action.name]: action.value
                }
            };
        }

        case FORM.FORM_RESET:{
            return initialState;
        }

        default: {
            return state;
        }
    }
}