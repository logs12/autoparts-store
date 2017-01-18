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
 * @param formName {string} - название формы
 * @param actionName {string} - название action который обрабатывает submit
 * @param data {object} - объект с данными формы
 * @param url {string} - url на который происходит отправка данных
 * @returns {{types: *[], promise: (function())}}
 */
export function submitForm(formName, actionName, data, url) {
    // Если actionName не равен дефолтному, то подключаем его из фабрики action
    if (actionName !== 'submitForm') {
        return ActionsFactory(actionName, data, url, {formName: formName});
    }
    return {
        types: [
            FORM.REQUEST,
            FORM.SUCCESS,
            FORM.ERROR
        ],
        promise: () => {
            return new Promise(( resolve, reject ) => {
                debugger;
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: data,
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

export function reset() {
    return dispatch => dispatch({
        type: FORM.RESET
    });
}