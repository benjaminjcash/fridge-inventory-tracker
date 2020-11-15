import { combineReducers } from 'redux';
import item from './item';

const reducer = combineReducers({
    items: item
});

export default reducer;
