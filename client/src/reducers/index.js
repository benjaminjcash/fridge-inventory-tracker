import { combineReducers } from 'redux';
import item from './item';
import commonItem from './commonItem';
import auth from './auth';
import error from './error';
import user from './user';
import data from './data';
import types from './types';
import upc from './upc';

const reducer = combineReducers({
    items: item,
    commonItems: commonItem,
    types,
    upc,
    auth,
    error,
    user,
    data
});

export default reducer;
