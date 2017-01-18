import * as INPUT from './constants';

/**
 * Обновление значений input в глобальном state
 * @param formName
 * @param inputName
 * @param value
 * @returns {{type, formName: *, inputName: *, value: *}}
 */
export function updateInputText(formName, inputName,value) {
    return {
        type: INPUT.UPDATE_VALUE,
        formName,
        inputName,
        value
    }
}