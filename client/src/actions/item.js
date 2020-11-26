import axios from 'axios';
import qs from 'qs';
import { BASE_URL, ADDED_DATA, FETCHED_ITEMS, FETCHED_ALL_TYPES } from '../utils/constants';
import { getStorage } from '../utils/storage';
const ITEM_ENDPOINT = `${BASE_URL}item`;

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
                console.error(res.data.message);
            } else {
                if(context == 'build_list') {
                    dispatch({
                        type: FETCHED_ITEMS,
                        data: res.data.data
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
                console.error(res.data.message);
            } else {
                dispatch({
                    type: ADDED_DATA,
                    data: res.data.data
                });
            }
        }).catch((err) => {
            console.error(err);
        })
    }
}