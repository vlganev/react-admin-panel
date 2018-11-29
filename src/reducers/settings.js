import { DARK_SKIN } from '../actions/settings';

const settings = (state = {
    isDarkSkin: false
}, action) => {
    switch (action.type) {
        case DARK_SKIN:
            return {
            ...state,
            isDarkSkin: action.isDarkSkin
        };

        default:
            return state;
    }
}

export default settings;