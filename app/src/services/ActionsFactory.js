import authAction from '../frontend/actions/AuthAction';
import formAction from '../frontend/actions/AuthAction';

/**
 * Список action
 * @type {{authAction: authAction}}
 */
const ListActions = {
    authAction: authAction,
};

/**
 * Фабричная функция actions
 * @param nameAction - имя action
 * @param data - данные для отправки или обработки
 * @param url {string} - url на который происходит отправка данных
 * @param options - дополнительные опции
 * @returns {*}
 */
export default function action(nameAction, data, url, options) {
    if (ListActions[nameAction] != undefined) {
        return ListActions[nameAction](data, url, options);
    }
}