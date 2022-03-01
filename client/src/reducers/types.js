import { FETCHED_ALL_TYPES } from '../utils/constants';

const types = (state = [], action) => {
  switch(action.type) {
    case FETCHED_ALL_TYPES:
      return [...action.data];
    default:
      return state;
  }
}

export default types;