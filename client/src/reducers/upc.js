import { UPC_RESPONSE, CLEAR_UPC } from '../utils/constants';

const upc = (state = {}, action) => {
  switch(action.type) {
    case UPC_RESPONSE:
      return action.data
    case CLEAR_UPC:
      return {};
    default:
      return state;
  }
}

export default upc;