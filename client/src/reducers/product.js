import { NO_PRODUCT_FOUND, PRODUCT_FOUND } from '../utils/constants';

const product = (state = {}, action) => {
    switch(action.type) {
      case NO_PRODUCT_FOUND:
          return {
            ...state,
            found: false
          };
      case PRODUCT_FOUND:
        return {
          found: true,
          data: action.data
        };
      default:
          return state;
    }
}

export default product;