import { CLEAR_ERROR } from '../constants';

export const clearError = () => {
    return function(dispatch) {
        dispatch({
            type: CLEAR_ERROR
        });
    }
}

