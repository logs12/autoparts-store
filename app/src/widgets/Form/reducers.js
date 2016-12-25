import * as FORM from './constants';

const initialState = {};

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
export default function FormReducer(state = initialState, action) {
    console.log( 'Form редуктор вызван с состоянием', state, 'и действием', action );
    switch (action.type) {

        case FORM.INIT_FORM: {
            return {
                ...state,
                [action.formName]: {
                    values: action.inputNames,
                    pending: false,
                    errors: action.inputNames
                }
            }
        }

        // Обновляем state формы при вводе данных в input
        case FORM.INPUT_TEXT_UPDATE_VALUE:
        {
            let values = {};
            for(let inputName in state[action.formName]['values']) {
                if (inputName === action.inputName) {
                    values[action.inputName] =  action.value ? action.value : null
                } else {
                    values[inputName] =  state[action.formName]['values'][inputName];
                }
            }
            return {
                ...state,
                [action.formName]: {
                    ...state[action.formName],
                    values: { ...values }
                }
            };
        }

        case FORM.FORM_RESET:{
            return initialState;
        }
    }

    // Разбиваем тип action по разделителю
    let typeActionAfterSplit = action.type.split('_');

    // Обработка actions при submit формы
    switch (typeActionAfterSplit[typeActionAfterSplit.length-1]) {
        // обработка REQUEST, меняем pending на true
        case FORM.REQUEST: {
            return {
                ...state,
                [action.options.formName]: {
                    ...state[action.options.formName],
                    pending: true
                }
            }
        }
        case FORM.SUCCESS: {
            return {
                ...state,
                [action.options.formName]: {
                    ...state[action.options.formName],
                    pending: false
                }
            }
        }
        case FORM.ERROR: {
            try{
                debugger;
                let ds = action;
                let errors = {};
                // Названия полей формы
                let inputNames = Object.keys(state[action.options.formName]['errors']);
                inputNames.forEach((inputName) => {
                    action.errors.forEach((error) => {
                        if(error.field === inputName) {
                            errors[error.field] = error.message;
                        } else {
                            throw new Error(`Данного поля ${error.field} не существует`);
                        }
                    });
                });

                return {
                    ...state,
                    [action.options.formName]: {
                        ...state[action.options.formName],
                        errors: { ...errors }
                    }

                }
            } catch (e) {
                alert(e);
            }

        }
    }
    return state;
}