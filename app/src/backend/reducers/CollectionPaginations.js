import { PAGINATION_GET } from '../../common/constants';

export default function CollectionPaginations(state = {}, action) {
    switch(action.type) {
        case PAGINATION_GET: {
            return {
                ...state,
                ...action.payload
            };
        }
    }

    return state;
}