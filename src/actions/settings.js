export const DARK_SKIN = 'DARK_SKIN';

export function setSettingValue(val, type) {
    return dispatch => {
        switch (type) {
            case DARK_SKIN:
                dispatch(setDarkSkin(val));
                break;
            default:
                break;
        }
    }
}

function setDarkSkin(val) {
    return {
        type: DARK_SKIN,
        isDarkSkin: val
    };
}