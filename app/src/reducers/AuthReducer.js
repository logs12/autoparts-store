import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
} from '../constants';

const initialTimeState = {};

export default function AuthReducer(state = initialTimeState, action) {
    console.log( 'SearchForArticul редуктор вызван с состоянием', state, 'и действием', action );
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return {
                ...state,
                pending: true
            };
        }
        default: {
            return state;
        }
    }
}