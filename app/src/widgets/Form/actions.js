import * as FORM from './constants';
import * as INPUTTEXT from '../InputText/constants';
import ActionsFactory from '../../services/ActionsFactory';

export function initForm(formName, inputNames, url) {
    return dispatch => dispatch({
        type: FORM.INIT_FORM,
        formName,
        inputNames,
        url
    });
}


export function updateInputText(formName, inputName,value) {
    return {
        type: FORM.INPUT_TEXT_UPDATE_VALUE,
        formName,
        inputName,
        value
    }
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
        type: FORM.FORM_RESET
    });
}