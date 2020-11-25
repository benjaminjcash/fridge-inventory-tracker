import { FETCH_ITEM } from '../utils/constants';

const item = (state = [], action) => {
    switch(action.type) {
            case FETCH_ITEM:
                return [...state, action.data];
            default:
                return state;
    }
}

export default item;