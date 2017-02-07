import {
    CONFIG_DATA_GET,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
} from '../constants';

import * as _ from 'lodash';

const initialTimeState = {
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

export function ConfigData(state = initialTimeState, action) {
    console.log( 'SearchForArticul редуктор вызван с состоянием', state, 'и действием', action );
    switch (action.type) {
        case LOGIN_SUCCESS: {
            debugger;
            let isAuthenticated = checkAuthenticated(action.payload.configData.user);

            return {
                ...state,
                ...action.payload.configData,
                ...{isAuthenticated: isAuthenticated},
            };
        }
        case CONFIG_DATA_GET: {
            debugger;
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