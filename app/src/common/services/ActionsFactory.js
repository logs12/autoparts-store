import { loginAction, logOutAction } from '../../common/actions/AuthAction';
import { UserUpdateAction } from '../../backend/actions/UserAction';

/**
 * Список action
 * @type {{authAction: authAction}}
 */
const ListActions = {
    loginAction: loginAction,
    logOutAction: logOutAction,
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
    }
}