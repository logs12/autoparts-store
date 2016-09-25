import {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE
} from '../constants/SearchArticul';



/*export function fetchProducts(articul) {
    dispatch(requestProducts(reddit));
    return fetch(`api/web-service/get-items`)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(reddit, json)));
}*/

export function fetchProducts(articul) {
    return {
        types: [
            GET_PRODUCTS_REQUEST,
            GET_PRODUCTS_SUCCESS,
            GET_PRODUCTS_FAILURE
        ],
        promise: () => {
            let promise = new Promise((resolve, reject) => {
                $.ajax({
                    async:true,
                    url: `api/web-service/get-items`,
                    data: {articul: articul},
                    success: (result) => {
                        resolve(result);
                    },
                    error: (errorMessage) => {
                        reject(new Error(errorMessage));
                    }
                });
            });
            promise
                .then(
                    result => {
                        return result;
                    },
                    error => {
                        console.log(error.message);
                    }
                )
        }
    }
}
