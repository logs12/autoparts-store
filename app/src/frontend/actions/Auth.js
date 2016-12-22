import {
    GET_AUTH_REQUEST
} from '../../frontend/constants/SearchForArticul';
//import Promise from 'bluebird';

export function getProducts(articul) {
    return {
        types: [
            GET_AUTH_REQUEST
        ],
        promise: () => {
            return new Promise(( resolve, reject ) => {
                fetch('/user/auth',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: 'Hubot',
                        login: 'hubot',
                    })
                }).then(function(response) {
                    alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
                    alert(response.status); // 200

                    return response.json();
                })
                .then(function(user) {
                    alert(user.name); // iliakan
                })
                .catch( alert );
                
                
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
