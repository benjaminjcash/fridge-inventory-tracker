import { combineReducers } from 'redux';
import item from './item';
import auth from './auth';
import error from './error';
import user from './user';
import data from './data';

const reducer = combineReducers({
    items: item,
    auth,
    error,
    user,
    data
});

export default reducer;
