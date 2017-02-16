import * as _ from 'lodash';
import {
    USERS_GET,
    USER_DELETE,
} from '../../common/constants';

export default function Users (state = [], action) {

    switch (action.type) {
        case USERS_GET: {
            if (!_.isArray(action.payload)) {
                return [
                    {...action.payload}
                ];
            }
            return [
                ...action.payload
            ];
        }
        case USER_DELETE: {
            // Filter the collection of deleted item
            return [
                ..._.filter(state, (user) => user.id !== action.payload['userId']),
            ];
        }
        default: {
            return state
        }
    }

}
