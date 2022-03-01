import { FETCHED_USER } from '../utils/constants';

const item = (state = {}, action) => {
  switch(action.type) {
    case FETCHED_USER:
        return {...action.data.user};
    default:
        return state;
  }
}

export default item;