import { SET_SELECTED_ITEM, REMOVE_SELECTED_ITEM, CLEAR_SELECTED_ITEMS } from "../utils/constants";

const selectedItems = (state = [], action) => {
  switch(action.type) {
    case SET_SELECTED_ITEM:
      return [...state, action.data];
    case REMOVE_SELECTED_ITEM:
      return state.filter(item => item != action.data);
    case CLEAR_SELECTED_ITEMS:
      return [];
    default:
      return state;
  }
}

export default selectedItems;