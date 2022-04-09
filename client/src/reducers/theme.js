import { TOGGLE_THEME } from '../utils/constants';
import { COLOR_THEMES } from '../styles/colors';

const theme = (state = COLOR_THEMES[0], action) => {
  switch(action.type) {
    case TOGGLE_THEME:
      return action.data;
    default:
      return state;
  }
}

export default theme;