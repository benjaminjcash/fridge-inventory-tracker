import { ADDED_DATA, CLEARED_DATA } from '../utils/constants';

const data = (state = { success: false }, action) => {
    switch(action.type) {
            case ADDED_DATA:
                const stateWithData = Object.assign({
                    success: true,
                    data: action.data
                });
                return stateWithData;
            case CLEARED_DATA:
                const originalState = {
                    success: false
                }
                return originalState;
            default:
                return state;
    }
}

export default data;