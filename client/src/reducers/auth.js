import { LOGGED_IN, CHECK_LOGGED_IN } from '../utils/constants';

const auth = (state={ loggedIn: false }, action) => {
    switch(action.type) {
      case LOGGED_IN:
          return {...state, loggedIn: action.data.loggedIn};
      case CHECK_LOGGED_IN:
          return {...state, loggedIn: action.data.loggedIn};
      default:
          return state;
    }
}

export default auth;