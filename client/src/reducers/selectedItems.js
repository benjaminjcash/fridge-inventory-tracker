import { SET_SELECTED_ITEM, REMOVE_SELECTED_ITEM, CLEAR_SELECTED_ITEMS, SELECT_ALL_ITEMS } from "../utils/constants";

const selectedItems = (state = [], action) => {
  switch(action.type) {
    case SET_SELECTED_ITEM:
      return [...state, action.data];
    case REMOVE_SELECTED_ITEM:
      return state.filter(item => item != action.data);
    case CLEAR_SELECTED_ITEMS:
      return [];
    case SELECT_ALL_ITEMS:
      return action.data
    default:
      return state;
  }
}

export default selectedItems;