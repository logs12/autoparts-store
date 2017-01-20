/**
 *
 * @param actionForm
 * @param data
 * @returns {Function}
 */
export function actionFormDecorator(actionForm, data) {
    debugger;
    return function() {
        try {
            debugger;
            if (!data.formName) throw new Error(`В ${actionName} не передано название формы`);

            // Если actionName не равен дефолтному, то подключаем его из фабрики action
            if (actionName !== 'submitForm') {
                return ActionsFactory(actionName, data, {formName: data.formName});
            }

            if (!data.values) throw new Error(`В ${actionName} не передано данные формы`);
            if (!data.url) throw new Error(`В ${actionName} не передано значение url для отправки данных на сервер`);

            return {
                types: [
                    FORM.REQUEST,
                    FORM.SUCCESS,
                    FORM.ERROR
                ],
                promise: () => {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            type: 'POST',
                            url: data.url,
                            data: data.values,
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
        catch (Error) {
            alert(Error);
        }

        debugger;
        return actionForm.apply(this, arguments);
    }
}