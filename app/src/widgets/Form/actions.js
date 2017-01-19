import * as FORM from './constants';
import ActionsFactory from '../../services/ActionsFactory';

/**
 * Первоначальная инициализация формы в глобальном state
 * @param formName
 * @param inputNames
 * @param url
 * @returns {function(*): *}
 */
export function initForm(formName, inputNames, url) {
    return dispatch => dispatch({
        type: FORM.INIT,
        formName,
        inputNames,
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
export function submitForm(actionName, data) {
    try {
        debugger;
        if (!data.formName) throw new Error(`В ${actionName} не передано название формы`);

        // Если actionName не равен дефолтному, то подключаем его из фабрики action
        if (actionName !== 'submitForm') {
            return ActionsFactory(actionName, data, {formName: data.formName});
        }

        if (!data.values) throw new Error(`В ${actionName} не передано данные формы`);
        if (!data.url) throw new Error(`В ${actionName} не передано значение url для отправки данных на сервер`);

        return {
            types: [
                FORM.REQUEST,
                FORM.SUCCESS,
                FORM.ERROR
            ],
            promise: () => {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        type: 'POST',
                        url: data.url,
                        data: data.values,
                        success: (result) => {
                            resolve(result);
                        },
                        error: (error) => {
                            reject(error);
                        }
                    });
                });
            }
        }
    }
    catch (Error) {
        alert(Error);
    }
}

export function reset() {
    return dispatch => dispatch({
        type: FORM.RESET
    });
}