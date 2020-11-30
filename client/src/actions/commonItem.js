import axios from 'axios';
import { BASE_URL, FETCHED_COMMON_ITEMS, CLEARED_COMMON_ITEMS } from '../utils/constants';
import { getStorage } from '../utils/storage';
const COMMON_ITEM_ENDPOINT = `${BASE_URL}commonitem`;

export const searchCommonItems = (query) => {
    const accessToken = getStorage('access_token');
    return (dispatch) => {
        axios.get(`${COMMON_ITEM_ENDPOINT}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                name: query
            }
        }).then((res) => {
            if(!res.data.success) {
                dispatch({
                    type: FETCHED_COMMON_ITEMS,
                    data: []
                });
            } else {
                dispatch({
                    type: FETCHED_COMMON_ITEMS,
                    data: res.data.data
                });
            }
        }).catch((err) => {
            console.error(err);
        });
    }
}

export const clearCommonItems = () => {
    return (dispatch) => {
        dispatch({
            type: CLEARED_COMMON_ITEMS
        });
    }
}