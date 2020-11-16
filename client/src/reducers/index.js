import { combineReducers } from 'redux';
import item from './item';
import auth from './auth';
import error from './error';

const reducer = combineReducers({
    items: item,
    auth,
    error
});

export default reducer;
