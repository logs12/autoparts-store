import * as INPUT from './constants';
import * as _ from 'underscore';


const initialState = {

};

/**
 * Структура state виджета Form
 *
 *
 * @param state - глобальный объект с состоянием проекта
 * @param action - действие
 * @returns {{}}
 * @constructor
 */

export default function InputTextReducer(state = initialState, action) {
    console.log( 'InputReducer редуктор вызван с состоянием', state, 'и действием', action );

    debugger;
    switch (action.type) {

        // Обновляем state формы при вводе данных в input
        case INPUT.INPUT_UPDATE_VALUE:
        {
            // Формируем объект с данными из input
            let values = {};
            for(let inputName in state[action.entityName]['values']) {
                if (inputName === action.inputName) {
                    values[action.inputName] =  action.value ? action.value : null
                } else {
                    values[inputName] =  state[action.entityName]['values'][inputName];
                }
            }

            // Флаг изменились ли данные
            let isChanged = !_.isEqual(
                initialState[action.entityName].values,
                values
            );

            return {
                ...state,
                [action.entityName]: {
                    ...state[action.entityName],
                    isChanged,
                    values: { ...values }
                }
            };
        }
    }

    return state;
}