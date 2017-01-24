/**
 *
 * @param actionForm
 * @param data
 * @returns {Function}
 */
export function actionFormDecorator(actionName, data) {
    return function() {
        try {
            if (!data.values) throw new Error(`В ${actionName} не передано данные формы`);
            if (!data.url) throw new Error(`В ${actionName} не передано значение url для отправки данных на сервер`);
        }
        catch (Error) {
            alert(Error);
        }
        return actionForm.apply(this, arguments);
    }
}