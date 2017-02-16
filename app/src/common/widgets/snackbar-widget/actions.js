import {
    SNACKBAR_WIDGET_ACTIVE,
    SNACKBAR_WIDGET_INACTIVE,
} from '../../constants';

export function SnackbarWidgetActiveAction(snackbarWidget) {
    return {
        type: SNACKBAR_WIDGET_ACTIVE,
            payload: {
        ...snackbarWidget
        },
    }
}

export function SnackbarWidgetInactiveAction() {
    return {
        type: SNACKBAR_WIDGET_INACTIVE,
    }
}