import {
    PROGRESS_BAR_WIDGET_START,
    PROGRESS_BAR_WIDGET_STOP,
} from '../../constants';

export function ProgressBarWidgetStartAction() {
    return {type: PROGRESS_BAR_WIDGET_START}
}

export function ProgressBarWidgetStopAction() {
    return {type: PROGRESS_BAR_WIDGET_STOP}
}