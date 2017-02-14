import {
    USERS_GET
} from '../../common/constants';

export default function Users (state = {}, action) {

    switch (action.type) {
        case USERS_GET: {
            return [
                ...action.payload
            ]
        }
        default: {
            return state
        }
    }

}
