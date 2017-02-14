import * as _ from 'lodash';

import {
    WIDGET_FORM_INIT,
    WIDGET_FORM_REQUEST,
    WIDGET_FORM_SUCCESS,
    WIDGET_FORM_ERROR,
    WIDGET_FORM_RESET,
    WIDGET_INPUT_TEXT_UPDATE_VALUE
} from '../../constants';

/**
 * Структура state виджета Form
 *
 * Все actions работающие с виджетом Form должны иметь обязательные типы, заканчивающиеся на
 * _REQUEST,
 * _ERROR,
 * _SUCCESS
 *
 * @param state - глобальный объект с состоянием проекта
 * @param action - действие
 * @returns {{}}
 * @constructor
 */
let initialState = {};
export default function FormReducer(state = {}, action) {
    console.log( 'Form редуктор вызван с состоянием', state, 'и действием', action );
    switch (action.type) {

        case WIDGET_FORM_INIT: {
            initialState = {
                [action.formName]: {
                    values: action.inputNames,
                    isChanged: false,
                    stateForm: WIDGET_FORM_INIT,
                    errors: action.inputNames
            }};
            return {
                ...state,
                [action.formName]: {
                    values: action.inputNames,
                    isChanged: false,
                    stateForm: WIDGET_FORM_INIT,
                    errors: action.inputNames
                }
            }
        }

        // Обновляем state формы при вводе данных в input
        case WIDGET_INPUT_TEXT_UPDATE_VALUE:
        {
            // Формируем объект с данными из input
            let values = {};
            for(let inputName in state[action.formName]['values']) {
                if (inputName === action.inputName) {
                    values[action.inputName] =  action.value ? action.value : null
                } else {
                    values[inputName] =  state[action.formName]['values'][inputName];
                }
            }

            // Чистим ошибки в state
            let errors = {}
            for(let errorFieldName in state[action.formName]['errors']) {
                errors[errorFieldName] = null;
            }

            // Флаг изменились ли данные
            let isChanged = !_.isEqual(
                initialState[action.formName].values,
                values
            );

            return {
                ...state,
                [action.formName]: {
                    ...state[action.formName],
                    values: { ...values },
                    errors: { ...errors },
                    isChanged,
                    stateForm: WIDGET_FORM_INIT,
                }
            };
        }

        case WIDGET_FORM_RESET:{
            return initialState;
        }
    }

    // Разбиваем тип action по разделителю
    let typeActionAfterSplit = action.type.split('_');
    
    let typeAction = typeActionAfterSplit[typeActionAfterSplit.length-3] + '_'
        + typeActionAfterSplit[typeActionAfterSplit.length-2] + '_'
        + typeActionAfterSplit[typeActionAfterSplit.length-1];
    // Обработка actions при submit формы
    switch (typeAction) {

        // обработка REQUEST, меняем isPending на true
        case WIDGET_FORM_REQUEST: {
            return {
                ...state,
                [action.options.formName]: {
                    ...state[action.options.formName],
                    stateForm: WIDGET_FORM_REQUEST,
                }
            }
        }

        case WIDGET_FORM_SUCCESS: {
            return {
                ...state,
                [action.options.formName]: {
                    ...state[action.options.formName],
                    isChanged: false,
                    stateForm: WIDGET_FORM_SUCCESS,
                }
            }
        }
        case WIDGET_FORM_ERROR: {
            let errors = {};
            action.errors.forEach((error) => {
                errors[error.field] = error.message;
            });
            return {
                ...state,
                [action.options.formName]: {
                    ...state[action.options.formName],
                    errors: { ...errors },
                    stateForm: WIDGET_FORM_ERROR,
                }
            }
        }
    }
    return state;
}