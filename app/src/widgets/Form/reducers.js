import * as FORM from './constants';

const initialState = { //define initial state - an empty form
};


export default function FormReducer(state = initialState, action) {
    console.log( 'Form редуктор вызван с состоянием', state, 'и действием', action );
    switch (action.type) {

        case FORM.INIT_FORM: {
            return {
                ...state,
                [action.formName]: action.inputNames

            }
        }

        case FORM.INPUT_TEXT_UPDATE_VALUE:
        {
            for(let inputName in state[action.formName]) {
                if (inputName === action.inputName) {
                    state[action.formName][inputName] = {
                        value: action.value,
                        error: action.error,
                    }
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

function inputTextUpdate(state = {},action) {

    return {
    ...state,
        [action.textInputName]: {
            value: action.value,
            error: action.error,
        }
    }
}

function posts(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}