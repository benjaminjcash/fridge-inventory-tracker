import axios from 'axios';
import { BASE_URL, FETCH_ITEM, ADDED_DATA } from '../utils/constants';
import { getStorage } from '../utils/storage';
const ITEM_ENDPOINT = `${BASE_URL}item`;

export const fetchItem = (id) => {
    return (dispatch) => {
        axios.get(`${ITEM_ENDPOINT}${id}`, {
            headers: { 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjBjNWI3ODQwMGJmMDcxZWM4OTU5MSIsImlhdCI6MTYwNTQ2NDg0NCwiZXhwIjoxNjA1NDY4NDQ0fQ.BVKaUBv-FW2FYHhsa6hgH_O8rYk_dHKEg_XeaK30nX4' }
        }).then((res) => {
            dispatch({
                type: FETCH_ITEM,
                data: res.data
            })
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