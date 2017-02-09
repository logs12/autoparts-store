import {
    CONFIG_DATA_GET,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
} from '../constants';

import * as _ from 'lodash';

const initialState = {
    user: {},
    environment: 'dev',
    info: {},
    isAuthenticated: false,
};

/**
 * Проверка текущего пользователя на авторизацию
 * @param user
 * @returns {boolean}
 */
const checkAuthenticated = (user) => {
    if (!_.isEmpty(user)) {
        return true;
    }
    return false;
};

export default function ConfigData(state = initialState, action) {
    console.log( 'SearchForArticul редуктор вызван с состоянием', state, 'и действием', action );
    switch (action.type) {
        case LOGIN_SUCCESS: {
            let isAuthenticated = checkAuthenticated(action.payload.configData.user);

            return {
                ...state,
                ...action.payload.configData,
                ...{isAuthenticated: isAuthenticated},
            };
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                ...initialState,
                ...{isAuthenticated: false},
            }
        }
        case CONFIG_DATA_GET: {
            let isAuthenticated = checkAuthenticated(action.payload.user);

            return {
                ...state,
                ...action.payload,
                ...{isAuthenticated: isAuthenticated},
            };
        }
        default: {
            return state;
        }
    }
}