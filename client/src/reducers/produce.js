import { PRODUCE_FOUND, CLEAR_PRODUCE, NO_PRODUCE_FOUND } from '../utils/constants';

const produce = (state = {}, action) => {
  switch(action.type) {
    case NO_PRODUCE_FOUND:
      return {};
    case PRODUCE_FOUND:
      return action.data;
    case CLEAR_PRODUCE:
      return {};
    default:
      return state;
  }
}

export default produce;