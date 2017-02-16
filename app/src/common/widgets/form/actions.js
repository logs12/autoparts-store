import {
    WIDGET_FORM_INIT,
    WIDGET_FORM_RESET
} from '../../constants';
import ActionsFactory from '../../services/ActionsFactory';

/**
 * Первоначальная инициализация формы в глобальном state
 * @param formName
 * @param modelForm
 * @param modelFormError
 * @param url
 * @returns {function(*): *}
 */
export function initForm(formName, modelForm, modelFormError, url) {
    return dispatch => dispatch({
        type: WIDGET_FORM_INIT,
        formName,
        modelForm,
        modelFormError,
        url
    });
}

/**
 * Actions submit form
 * @param actionName {string} - название action который обрабатывает submit
 * @param data {object} - объект с данными формы
 * data{
 *  formName {string} - название формы
 *  data {object} - объект с данными формы
 *  url {string} - url на который происходит отправка данных
 * }
 * @returns {{types: *[], promise: (function())}}
 */
export function submitFormAction(actionName, data) {
    return ActionsFactory(actionName, data, {formName: data.formName});
}

export function reset() {
    return dispatch => dispatch({
        type: WIDGET_FORM_RESET
    });
}