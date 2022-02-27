import { ADDED_DATA, UPDATED_DATA, DELETED_DATA, CLEARED_DATA } from '../utils/constants';

const data = (state = { success: false }, action) => {
    switch(action.type) {
            case ADDED_DATA:
                const addedData = Object.assign({
                    success: true,
                    action: 'insert',
                    data: action.data
                });
                return addedData;
            case UPDATED_DATA:
                const updatedData = Object.assign({
                    success: true,
                    action: 'update'
                });
                return updatedData;
            case DELETED_DATA:
                const deletedData = Object.assign({
                    success: true,
                    action: 'delete'
                });
                return deletedData;
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