export const TOAST_DANGER_MESSAGE = 'TOAST_DANGER_MESSAGE';
export const TOAST_SUCCESS_MESSAGE = 'TOAST_SUCCESS_MESSAGE';

export function setServiceStatus(val, type) {
    return dispatch => {
        switch (type) {
            case TOAST_DANGER_MESSAGE:
                dispatch(setToastDangerMessage(val));
                dispatch(setToastDangerMessage(''));
                break;
            case TOAST_SUCCESS_MESSAGE:
                dispatch(setToastSuccessMessage(val));
                dispatch(setToastSuccessMessage(''));
                break;
            default:
                break;
        }
    }
}

function setToastDangerMessage(val) {
    return {
        type: TOAST_DANGER_MESSAGE,
        toastDangerMessage: val
    };
}

function setToastSuccessMessage(val) {
    return {
        type: TOAST_SUCCESS_MESSAGE,
        toastSuccessMessage: val
    };
}