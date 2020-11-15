import { combineReducers } from 'redux';
import item from './item';
import auth from './auth';

const reducer = combineReducers({
    items: item,
    auth
});

export default reducer;
