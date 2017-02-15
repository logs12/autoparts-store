import * as _ from 'lodash';
import {
    USERS_GET
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
        default: {
            return state
        }
    }

}
