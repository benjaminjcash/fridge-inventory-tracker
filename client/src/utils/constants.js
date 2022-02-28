export const DEFAULT_FETCH_ALL_ITEMS_OPTIONS = {
    types: null,
    name: null,
    attribute: "expiration_date",
    order: "1"
}

/** Auth */
export const LOGGED_IN = 'logged_in';
export const CHECK_LOGGED_IN = 'check_logged_in';

/** User */
export const FETCHED_USER = 'fetched_user';

/** Error */
export const DISPATCH_ERROR = 'dispatch_error';
export const CLEAR_ERROR = 'clear_error';

/** Item/Product */
export const FETCHED_ITEMS = 'fetched_items';
export const NO_PRODUCT_FOUND = 'no_product_found';
export const PRODUCT_FOUND = 'product_found';
export const CLEAR_PRODUCT = 'clear_product';
export const FETCHED_ALL_PRODUCTS = 'fetched_all_products';

/** Type */
export const FETCHED_ALL_TYPES = 'fetched_all_types';

/** Data */
export const ADDED_DATA = 'added_data';
export const ACTION_PRODUCT = 'product';
export const ACTION_ITEM = 'item';
export const UPDATED_DATA = 'updated_data';
export const DELETED_DATA = 'deleted_data';
export const CLEARED_DATA = 'cleared_data';

/** Upc */
export const UPC_RESPONSE = 'upc_response';
export const UPC_RESPONSE_KEY_TITLE = 'title';
export const UPC_RESPONSE_KEY_BRAND = 'brand';
export const UPC_RESPONSE_KEY_CATEGORY = 'category';
export const UPC_RESPONSE_KEY_IMAGES = 'images';
export const CLEAR_UPC = 'clear_upc';