import axios from 'axios';
import { BASE_URL, ADDED_DATA, FETCHED_ITEMS } from '../utils/constants';
import { getStorage } from '../utils/storage';
const ITEM_ENDPOINT = `${BASE_URL}item`;

export const fetchAllItems = (options) => {
    const accessToken = getStorage('access_token');
    return (dispatch) => {
        axios.get(`${ITEM_ENDPOINT}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((res) => {
            if(!res.data.success) {
                console.error(res.data.message);
            } else {
                dispatch({
                    type: FETCHED_ITEMS,
                    data: res.data.data
                });
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