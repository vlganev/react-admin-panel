import { TOAST_DANGER_MESSAGE, TOAST_SUCCESS_MESSAGE } from '../actions/service';

const service = (state = {
    toastDangerMessage: '',
    toastSuccessMessage: ''
}, action) => {
    switch (action.type) {
        case TOAST_DANGER_MESSAGE:
            return {
            ...state,
            toastDangerMessage: action.toastDangerMessage
        };
        case TOAST_SUCCESS_MESSAGE:
            return {
            ...state,
            toastSuccessMessage: action.toastSuccessMessage
        };
        default:
            return state;
    }
}

export default service;