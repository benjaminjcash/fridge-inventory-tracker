import { FETCHED_ITEMS } from '../utils/constants';

const item = (state = [], action) => {
  switch(action.type) {
    case FETCHED_ITEMS:
      return [...action.data];
    default:
      return state;
  }
}

export default item;