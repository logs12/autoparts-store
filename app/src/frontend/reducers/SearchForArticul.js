import {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE
} from '../constants/SearchForArticul';

const initialTimeState = {};

export default function SearchForArticul(state = initialTimeState, action) {
    console.log( 'SearchForArticul редуктор вызван с состоянием', state, 'и действием', action );
    switch (action.type) {
        case GET_PRODUCTS_REQUEST: {
            return {
                ...state,
                pending: true
            };
        }
        case GET_PRODUCTS_SUCCESS: {
            return {
                ...state,
                products: action.result.products,
                pending: false
            }
        }
        case GET_PRODUCTS_FAILURE: {
            const errorMessage = 'Ошибка, получение данных прерванно';
            return {
                ...state,
                pending: false,
                errorMessage
            }
        }
        default: {
            return state;
        }
    }
}