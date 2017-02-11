import {
    USERS_GET
} from '../../constants';

export default function Users (state = {}, action) {

    switch (action.type) {
        case USERS_GET: {
            return [
                ...state,
                ...action.payload
            ]
        }
    }

    return state;

}