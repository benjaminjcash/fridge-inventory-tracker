import { CLEARED_DATA } from '../utils/constants';

export const clearData = () => {
    return (dispatch) => {
        dispatch({
            type: CLEARED_DATA
        });
    }
}