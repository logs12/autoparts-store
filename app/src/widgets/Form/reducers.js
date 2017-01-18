import * as FORM from './constants';
import * as INPUT from '../InputText/constants';
import * as _ from 'underscore';

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

        case FORM.INIT: {
            initialState = {
                [action.formName]: {
                    values: action.inputNames,
                    isPending: false,
                    isChanged: false,
                    errors: action.inputNames
            }};
            return {
                ...state,
                [action.formName]: {
                    values: action.inputNames,
                    isPending: false,
                    errors: action.inputNames
                }
            }
        }

        // Обновляем state формы при вводе данных в input
        case INPUT.UPDATE_VALUE:
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

            // Флаг изменились ли данные
            let isChanged = !_.isEqual(
                initialState[action.formName].values,
                values
            );

            return {
                ...state,
                [action.formName]: {
                    ...state[action.formName],
                    isChanged,
                    values: { ...values }
                }
            };
        }

        case FORM.RESET:{
            return initialState;
        }
    }

    // Разбиваем тип action по разделителю
    let typeActionAfterSplit = action.type.split('_');

    // Обработка actions при submit формы
    switch (typeActionAfterSplit[typeActionAfterSplit.length-1]) {
        // обработка REQUEST, меняем isPending на true
        case FORM.REQUEST: {
            let isChanged = _.isEqual(
                initialState[action.options.formName].value,
                state[action.options.formName].value
            );
            return {
                ...state,
                [action.options.formName]: {
                    ...state[action.options.formName],
                    isPending: true
                }
            }
        }
        case FORM.SUCCESS: {
            return {
                ...state,
                [action.options.formName]: {
                    ...state[action.options.formName],
                    isPending: false
                }
            }
        }
        case FORM.ERROR: {
            let errors = {};
            action.errors.forEach((error) => {
                errors[error.field] = error.message;
            });
            return {
                ...state,
                [action.options.formName]: {
                    ...state[action.options.formName],
                    errors: { ...errors },
                    isPending: false
                }
            }
        }
    }
    return state;
}