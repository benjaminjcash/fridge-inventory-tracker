import { PRODUCES_FOUND, CLEAR_PRODUCES, FETCHED_ALL_PRODUCES } from '../utils/constants';

const produces = (state = [], action) => {
  switch(action.type) {
    case FETCHED_ALL_PRODUCES:
      return action.data;
    case PRODUCES_FOUND:
      return action.data;
    case CLEAR_PRODUCES: 
      return [];
    default:
      return state;
  }
}

export default produces;