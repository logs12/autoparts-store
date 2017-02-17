import { PAGINATION_GET } from '../../../common/constants';

const initialState = {

};

export default function PaginationWidget(state = {}, action) {
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