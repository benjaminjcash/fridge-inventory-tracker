/** Auth */
export const LOGGED_IN = 'logged_in';
export const CHECK_LOGGED_IN = 'check_logged_in';

/** User */
export const FETCHED_USER = 'fetched_user';

/** Error */
export const DISPATCH_ERROR = 'dispatch_error';
export const CLEAR_ERROR = 'clear_error';

/** Item */
export const FETCHED_ITEMS = 'fetched_items';
export const ACTION_ITEM = 'item';
export const FETCHED_ALL_TYPES = 'fetched_all_types';
export const DEFAULT_FETCH_ALL_ITEMS_OPTIONS = {
  types: null,
  name: null,
  attribute: "expiration_date",
  order: "1"
}
export const SET_SELECTED_ITEM = 'set_selected_item';
export const REMOVE_SELECTED_ITEM = 'remove_selected_item';
export const CLEAR_SELECTED_ITEMS = 'clear_selected_items';
export const SELECT_ALL_ITEMS = 'select_all_items';

/** Product */
export const NO_PRODUCT_FOUND = 'no_product_found';
export const PRODUCT_FOUND = 'product_found';
export const CLEAR_PRODUCT = 'clear_product';
export const FETCHED_ALL_PRODUCTS = 'fetched_all_products';
export const ACTION_PRODUCT = 'product';

/** Produce */
export const PRODUCE_FOUND = 'produce_found';
export const NO_PRODUCE_FOUND = 'no_produce_found';
export const PRODUCES_FOUND = 'produces_found';
export const CLEAR_PRODUCE = 'clear_produce';
export const CLEAR_PRODUCES = 'clear_produces';
export const FETCHED_ALL_PRODUCES = 'fetched_all_produces';

/** Data */
export const ADDED_DATA = 'added_data';
export const UPDATED_DATA = 'updated_data';
export const UPDATED_PRODUCT = 'updated_product';
export const DELETED_PRODUCT = 'deleted_product';
export const UPDATED_PRODUCE = 'updated_produce';
export const DELETED_PRODUCE = 'deleted_produce';
export const DELETED_DATA = 'deleted_data';
export const CLEARED_DATA = 'cleared_data';
export const DELETED_ITEM = 'deleted_item';

/** Upc */
export const UPC_RESPONSE = 'upc_response';
export const UPC_RESPONSE_KEY_TITLE = 'title';
export const UPC_RESPONSE_KEY_BRAND = 'brand';
export const UPC_RESPONSE_KEY_CATEGORY = 'category';
export const UPC_RESPONSE_KEY_IMAGES = 'images';
export const CLEAR_UPC = 'clear_upc';