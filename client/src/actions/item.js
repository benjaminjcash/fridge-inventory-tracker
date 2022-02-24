import axios from 'axios';
import qs from 'qs';
import { ADDED_DATA, UPDATED_DATA, DELETED_DATA, FETCHED_ITEMS, FETCHED_ALL_TYPES } from '../utils/constants';
import { getStorage } from '../utils/storage';
const ITEM_ENDPOINT = `/api/item`;

export const fetchAllItems = (options, context) => {
    const accessToken = getStorage('access_token');
    return (dispatch) => {
        axios.get(`${ITEM_ENDPOINT}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                sortby: options?.attribute,
                direction: options?.order,
                filterbyname: options?.name,
                filterbytype: options?.types
            },
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        }).then((res) => {
            if(!res.data.success) {
                dispatch({
                    type: FETCHED_ITEMS,
                    data: []
                });
            } else {
                if(context == 'build_list') {
                    const populatedData = res.data.data.map((item) => {
                        const expirationHealth = calculateExpirationHealth(item);
                        return {
                            ...item,
                            expiration_health: expirationHealth
                        }
                    })
                    dispatch({
                        type: FETCHED_ITEMS,
                        data: populatedData
                    });
                } else if(context == 'get_all_types') {
                    dispatch({
                        type: FETCHED_ALL_TYPES,
                        data: [... new Set(res.data.data.map(item => item.type))]
                    });
                }
                
            }
        }).catch((err) => {
            console.error(err);
        });
    }
}

export const createItem = (item) => {
    const accessToken = getStorage('access_token');
    return (dispatch) => {
        axios.post(`${ITEM_ENDPOINT}`, item, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((res) => {
            if(!res.data.success) {
                console.error(res.data.error);
            } else {
                dispatch({
                    type: ADDED_DATA
                });
            }
        }).catch((err) => {
            console.error(err);
        })
    }
}

export const updateItem = (item) => {
    const accessToken = getStorage('access_token');
    return (dispatch) => {
        axios.put(`${ITEM_ENDPOINT}/${item.id}`, item, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((res) => {
            if(!res.data.success) {
                console.error(res.data.error);
            } else {
                dispatch({
                    type: UPDATED_DATA
                });
            }
        }).catch((err) => {
            console.error(err);
        });
    }
}

export const deleteItem = (item) => {
    const accessToken = getStorage('access_token');
    return (dispatch) => {
        axios.delete(`${ITEM_ENDPOINT}/${item.id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((res) => {
            if(!res.data.success) {
                console.error(res.data.message);
            } else {
                dispatch({
                    type: DELETED_DATA
                });
            }
        }).catch((err) => {
            console.error(err);
        })
    }
}

const calculateExpirationHealth = (item) => {
    let health = "";
    const expDate = new Date(item.expiration_date);
    const now = new Date();
    const twoDaysFromNow = new Date(now.getFullYear(),now.getMonth(),now.getDate() + 2);
    const sevenDaysFromNow = new Date(now.getFullYear(),now.getMonth(),now.getDate() + 7);
    if(expDate <= now) {
        health = "bad";
    } else if(expDate <= twoDaysFromNow) {
        health = "close";
    } else if(expDate <= sevenDaysFromNow) {
        health = "fine";
    } else {
        health = "fresh";
    }
    return health;
};