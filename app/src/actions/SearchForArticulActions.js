import {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE
} from '../constants/SearchForArticul';
//import Promise from 'bluebird';

export function getProducts(articul) {
    return {
        types: [
            GET_PRODUCTS_REQUEST,
            GET_PRODUCTS_SUCCESS,
            GET_PRODUCTS_FAILURE
        ],
        promise: () => {
            return new Promise(( resolve, reject ) => {
                $.ajax({
                    type: 'POST',
                    url: `api/web-service/get-items`,
                    data: {articul: articul},
                    success: (result) => {
                        resolve({products:result});
                    },
                    error: (errorMessage) => {
                        reject(new Error(errorMessage));
                    }
                });
            });
        }
    }
}
