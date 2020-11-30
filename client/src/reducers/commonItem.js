import { FETCHED_COMMON_ITEMS, CLEARED_COMMON_ITEMS } from '../utils/constants';

const commonItem = (state = [], action) => {
    switch(action.type) {
            case FETCHED_COMMON_ITEMS:
                return [...action.data];
            case CLEARED_COMMON_ITEMS:
                return [];
            default:
                return state;
    }
}

export default commonItem;