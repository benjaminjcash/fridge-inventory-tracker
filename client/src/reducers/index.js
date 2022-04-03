import { combineReducers } from 'redux';
import item from './item';
import auth from './auth';
import error from './error';
import user from './user';
import data from './data';
import types from './types';
import upc from './upc';
import product from './product';
import products from './products';
import selectedItems from './selectedItems';

const reducer = combineReducers({
  items: item,
  types,
  upc,
  auth,
  error,
  user,
  data,
  product,
  products,
  selectedItems
});

export default reducer;
