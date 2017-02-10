import { PAGINATION_GET } from '../../constants';

export default function CollectionPaginations(state = {}, action) {
    switch(action.type) {
        case PAGINATION_GET: {
            debugger;
            let oo = action.payload;
            return [
                ...state,
                ...action.payload
            ];
        }
    }

    return state;
}