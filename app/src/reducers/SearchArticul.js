import {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE
} from '../constants/SearchArticul';

const initialTimeState = {};

export default function SearchArticul(state = initialTimeState, action) {
    console.log( 'SearchArticul редуктор вызван с состоянием', state, 'и действием', action );
    switch (action.type) {
        case GET_PRODUCTS_REQUEST: {
            return {
                ...state,
                action,
                pending: true
            };
        }
        case GET_PRODUCTS_SUCCESS: {
            return {
                ...state,
                pending: false
            }
        }
        case GET_PRODUCTS_FAILURE: {
            const errorMesage = 'Ошибка, получение данных прерванно';
            return {
                ...state,
                pending: false,
                errorMesage
            }
        }
        default: {
            return state;
        }
    }
}