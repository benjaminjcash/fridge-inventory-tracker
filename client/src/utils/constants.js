export const BASE_URL = 'http://localhost:3001/api/';
export const BASE_URL_APP = 'http://localhost:3000/';
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

/** Item */
export const FETCHED_ITEMS = 'fetched_items';

/** Type */
export const FETCHED_ALL_TYPES = 'fetched_all_types';

/** Data */
export const ADDED_DATA = 'added_data';
export const DELETED_DATA = 'deleted_data';
export const CLEARED_DATA = 'cleared_data';