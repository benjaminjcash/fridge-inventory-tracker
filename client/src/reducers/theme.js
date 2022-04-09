import { TOGGLE_THEME } from '../utils/constants';
import { NEON, BASIC } from '../styles/colors';

const theme = (state = NEON, action) => {
  switch(action.type) {
    case TOGGLE_THEME:
      return action.data;
    default:
      return state;
  }
}

export default theme;