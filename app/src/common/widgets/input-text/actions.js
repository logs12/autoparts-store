import { WIDGET_INPUT_TEXT_ACTION_NAME, WIDGET_INPUT_TEXT_UPDATE_VALUE } from '../../constants';
import ActionsFactory from '../../services/ActionsFactory';


/**
 * Обновление значений input в глобальном state
 * @param actionName
 * @param data
 * @returns {{type, formName: *, inputName: *, value: *}}
 */
export function updateInputText(actionName, data) {
    try {

        if (!data.formName) new Error(`В ${actionName} не передано название формы`);
        // Если actionName не равен дефолтному, то подключаем его из фабрики action

        if (actionName !== WIDGET_INPUT_TEXT_ACTION_NAME) {
            return ActionsFactory(actionName, data, {formName: data.formName});
        }

        if (!data.inputName) new Error(`В ${actionName} не передано название input`);
        if (! _.has(data, 'value')) new Error(`В ${actionName} не передано значение input`);
        return {
            type: WIDGET_INPUT_TEXT_UPDATE_VALUE,
            formName: data.formName,
            inputName: data.inputName,
            value: data.value,
        }
    } catch(error) {
        alert(error);
    }
}