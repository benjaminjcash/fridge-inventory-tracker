import { NO_PRODUCT_FOUND, PRODUCT_FOUND } from '../utils/constants';

const product = (state = {}, action) => {
    switch(action.type) {
      case NO_PRODUCT_FOUND:
          return {};
      case PRODUCT_FOUND:
        return action.data;
      default:
          return state;
    }
}

export default product;