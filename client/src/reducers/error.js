import { DISPATCH_ERROR, CLEAR_ERROR } from '../utils/constants';

const error = (state={ error: false }, action) => {
  switch(action.type) {
    case DISPATCH_ERROR:
      return {error: true, message: action.message};
    case CLEAR_ERROR:
      return {error: false}
    default:
      return state;
  }
}

export default error;