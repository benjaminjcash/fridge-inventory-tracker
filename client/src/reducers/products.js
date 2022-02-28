import { FETCHED_ALL_PRODUCTS } from '../utils/constants';

const products = (state = [], action) => {
  switch(action.type) {
    case FETCHED_ALL_PRODUCTS:
      return action.data;
    default:
      return state;
  }
}

export default products;