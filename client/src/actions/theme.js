import { TOGGLE_THEME } from '../utils/constants';

export const toggleTheme = (next) => {
    return function(dispatch) {
        dispatch({
            type: TOGGLE_THEME,
            data: next
        });
    }
}