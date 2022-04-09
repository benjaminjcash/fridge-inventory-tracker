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
import produce from './produce';
import produces from './produces';
import selectedItems from './selectedItems';
import theme from './theme';

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
  selectedItems,
  produce,
  produces,
  theme
});

export default reducer;
