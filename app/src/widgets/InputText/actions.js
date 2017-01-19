import * as INPUT from './constants';
import ActionsFactory from '../../services/ActionsFactory';

/**
 * Обновление значений input в глобальном state
 * @param formName
 * @param inputName
 * @param value
 * @returns {{type, formName: *, inputName: *, value: *}}
 */
export function updateInputText(/*formName, inputName,value ,*/actionName, data) {
    try {

        if (!data.formName) throw new Error(`В ${actionName} не передано название формы`);
        // Если actionName не равен дефолтному, то подключаем его из фабрики action

        if (actionName !== INPUT.ACTION_NAME) {
            return ActionsFactory(actionName, data, {formName: data.formName});
        }

        if (!data.inputName) throw new Error(`В ${actionName} не передано название input`);
        if (!data.value) throw new Error(`В ${actionName} не передано значение input`);
        return {
            type: INPUT.UPDATE_VALUE,
            formName: data.formName,
            inputName: data.inputName,
            value: data.value,
        }
    } catch(error) {
        alert(error);
    }
}