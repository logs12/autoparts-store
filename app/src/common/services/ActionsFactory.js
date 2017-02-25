import { loginAction, logOutAction } from '../../common/actions/AuthAction';
import {
    UsersGetAction,
    UserCreateAction,
    UserUpdateAction,
} from '../../backend/actions/UserAction';

import { WIDGET_CLIENT_ERROR } from '../constants';

/**
 * Список action
 * @type {{authAction: authAction}}
 */
const ListActions = {
    loginAction: loginAction,
    logOutAction: logOutAction,
    UsersGetAction: UsersGetAction,
    UserCreateAction: UserCreateAction,
    UserUpdateAction: UserUpdateAction,
};

/**
 * Фабричная функция actions
 * @param nameAction - имя action
 * @param data - данные для отправки или обработки
 * @param options - дополнительные опции
 * @returns {*}
 */
export default function action(nameAction, data, options) {
    if (ListActions[nameAction] != undefined) {
        return ListActions[nameAction](data, options);
    } else {
        return {
            type: WIDGET_CLIENT_ERROR,
            payload: { messageError: `Action "${nameAction}" not found in ActionFactory` }
        }
    }
}