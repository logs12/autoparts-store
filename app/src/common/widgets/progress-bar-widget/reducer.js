import {
    PROGRESS_BAR_WIDGET_START,
    PROGRESS_BAR_WIDGET_STOP,
} from '../../constants';

let initialState = {
    status: 'disabled'
};

export default function ProgressBarWidget(state = initialState, action) {
    switch (action.type) {
        case PROGRESS_BAR_WIDGET_START: {
            return {
                ...state,
                ...{status: 'enabled'}
            }
        }
        case PROGRESS_BAR_WIDGET_STOP: {
            return {
                ...state,
                ...{status: 'disabled'}
            }
        }
    }

    return state;
}