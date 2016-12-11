import * as INPUT from './constants';

export function update(name, value, error) {
    
    return {
        type: INPUT.INPUT_UPDATE_VALUE,
            name,
            value,
            error

    }
}