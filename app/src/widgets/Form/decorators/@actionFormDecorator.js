/**
 *
 * @param actionForm
 * @param data
 * @returns {Function}
 */
export default function actionFormDecorator(actionForm, data) {
    debugger;
    return function() {
        debugger;
        return actionForm.apply(this, arguments);
    }
}