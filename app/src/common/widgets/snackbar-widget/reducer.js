import {
    SNACKBAR_WIDGET_ACTIVE,
    SNACKBAR_WIDGET_INACTIVE,
} from '../../constants';

let initialState = {
    isSnackbarActive: false,
    messageSnackbar: null,
    actionTitle: 'Undo'
};

export default function SnackbarWidget(state = initialState, action) {
    switch (action.type) {
        case SNACKBAR_WIDGET_ACTIVE: {
            return {
                ...state,
                ...action.payload,
                ...{ isSnackbarActive: true },
            }
        }
        case SNACKBAR_WIDGET_INACTIVE: {
            return {
                ...state,
                ...initialState
            }
        }
    }

    return state;
}