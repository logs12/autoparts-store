import * as INPUT from './constants';

/**
 *
 * @param entityName - название сущности в state которой принадлежит содержимое input
 * @param inputName
 * @param value
 * @returns {{type, formName: *, inputName: *, value: *}}
 */
export function updateInputText(entityName, inputName,value) {
    return {
        type: INPUT.INPUT_UPDATE_VALUE,
        entityName,
        inputName,
        value
    }
}