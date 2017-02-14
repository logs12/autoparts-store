import {
    WIDGET_FORM_INIT,
    WIDGET_FORM_REQUEST,
    WIDGET_FORM_SUCCESS,
    WIDGET_FORM_ERROR,
    WIDGET_FORM_RESET
} from '../../constants';
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
        type: WIDGET_FORM_INIT,
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
export function submitFormAction(actionName, data) {
    try {
        if (!data.formName) throw new Error(`В ${actionName} не передано название формы`);

        // Если actionName не равен дефолтному, то подключаем его из фабрики action
        if (actionName !== 'submitForm') {
            return ActionsFactory(actionName, data, {formName: data.formName});
        }

        if (!data.values) throw new Error(`В ${actionName} не передано данные формы`);
        if (!data.url) throw new Error(`В ${actionName} не передано значение url для отправки данных на сервер`);

        return {
            types: [
                WIDGET_FORM_REQUEST,
                WIDGET_FORM_SUCCESS,
                WIDGET_FORM_ERROR,
            ],
            promise: () => {
                return new Promise((resolve, reject) => {
                    fetch(data.url, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/javascript, */*; q=0.01',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data.values)
                    }).then((response) => {
                        if (response.status === 200) {
                            resolve(response.json());
                        } else {
                            response.json().then((object) => {
                                reject(object);
                            });
                        }
                    }).catch((errorMessage) => {
                        reject(new Error(errorMessage));
                    });
                });
            },
            options: {formName: data.formName},
        }
    }
    catch (Error) {
        alert(Error);
    }
}

export function reset() {
    return dispatch => dispatch({
        type: WIDGET_FORM_RESET
    });
}