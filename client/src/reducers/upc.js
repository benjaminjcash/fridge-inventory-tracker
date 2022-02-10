import { UPC_RESPONSE } from '../utils/constants';

const upc = (state = [], action) => {
    switch(action.type) {
        case UPC_RESPONSE:
            return action.data
        default:
            return state;
    }
}

export default upc;