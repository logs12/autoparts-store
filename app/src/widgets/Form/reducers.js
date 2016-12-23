import * as FORM from './constants';

const initialState = { //define initial state - an empty form
};

/**
 * Все actions работающие с виджетом Form должны иметь обязательные типы, заканчивающиеся на
 * _REQUEST,
 * _ERROR,
 * _SUCCESS
 *
 * @param state
 * @param action
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
                    errors: action.inputNames
                }
            }
        }

        // Обновляем state формы при вводе данных
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

        default: {
            return state;
        }
    }

    // Разбиваем тип action по разделителю
    let typeActionAfterSplit = action.type.split('_');
    // Обработка actions при submit формы
    switch (typeActionAfterSplit[typeActionAfterSplit.length-1]) {
        case FORM.REQUEST: {
            return {
                ...state,

            }
        }
        case FORM.SUCCESS: {
            return {
                ...state,

            }
        }
    }

}

function inputTextUpdate(state = {}, action) {

    return {
        ...state,
        [action.textInputName]: {
            value: action.value,
            error: action.error,
        }
    }
}