import { NO_PRODUCT_FOUND, PRODUCT_FOUND, CLEAR_PRODUCT } from '../utils/constants';

const product = (state = {}, action) => {
  switch(action.type) {
    case NO_PRODUCT_FOUND:
      return {};
    case PRODUCT_FOUND:
      return action.data;
    case CLEAR_PRODUCT:
      return {};
    default:
      return state;
  }
}

export default product;