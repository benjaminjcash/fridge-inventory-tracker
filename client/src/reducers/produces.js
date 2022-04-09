import { PRODUCES_FOUND, CLEAR_PRODUCES } from '../utils/constants';

const produces = (state = [], action) => {
  switch(action.type) {
    case PRODUCES_FOUND:
      return action.data;
    case CLEAR_PRODUCES: 
      return [];
    default:
      return state;
  }
}

export default produces;