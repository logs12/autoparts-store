import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
} from '../constants';

const initialTimeState = {
    user: {},
    environment: 'dev',
    info: {},
    isAuthenticated: false,
};

export function ConfigData(state = initialTimeState, action) {
    console.log( 'SearchForArticul редуктор вызван с состоянием', state, 'и действием', action );
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return {
                ...state,
                ...action.payload.configData,
                ...{isAuthenticated: true},
            };
        }
        default: {
            return state;
        }
    }
}