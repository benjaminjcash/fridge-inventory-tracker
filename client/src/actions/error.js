import { CLEAR_ERROR, DISPATCH_ERROR } from '../constants';

export const clearError = () => {
    return function(dispatch) {
        dispatch({
            type: CLEAR_ERROR
        });
    }
}

export const dispatchError = (message) => {
    return function(dispatch) {
        dispatch({
            type: DISPATCH_ERROR,
            message
        });
    }
}