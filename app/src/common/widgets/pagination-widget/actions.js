import ActionsFactory from '../../services/ActionsFactory';

/**
 * Actions pagination
 * @param actionName {string} - name action which process get data
 * @param data {object} - object with options for action
 * data{
 *  url {string} - url for request pagination data
 * }
 * @returns {{types: *[], promise: (function())}}
 */
export function paginationAction(actionName, data) {
    return ActionsFactory(actionName, data);
}