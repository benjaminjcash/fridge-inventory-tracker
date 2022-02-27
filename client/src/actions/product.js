import axios from 'axios';
import { getStorage } from '../utils/storage';
import { UPC_RESPONSE, ADDED_DATA } from '../utils/constants';

export const searchUPC = (barcode) => {
    const accessToken = getStorage('access_token');
    return (dispatch) => {
        const UPC_ENDPOINT = `/api/product/upc/${barcode}`;
        axios.get(`${UPC_ENDPOINT}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((res) => {
            dispatch({
                type: UPC_RESPONSE,
                data: res.data.items[0]
            });
        }).catch((err) => {
            console.error(err);
        });
    }
}

export const searchProduct = (barcode) => {
  console.log('searchproduct ' + barcode);
  const accessToken = getStorage('access_token');
    return (dispatch) => {
        const PRODUCT_ENDPOINT = `/api/product/${barcode}`;
        axios.get(`${PRODUCT_ENDPOINT}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.error(err);
        })
    }
}

export const createProduct = (product) => {
    const accessToken = getStorage('access_token');
    return (dispatch) => {
        const PRODUCT_ENDPOINT = `/api/product`;
        axios.post(`${PRODUCT_ENDPOINT}`, product, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((res) => {
            if(!res.data.success) {
                console.error(res.data.error);
            } else {
                dispatch({
                    type: ADDED_DATA,
                    data: res.data
                });
            }
        }).catch((err) => {
            console.error(err);
        })
    }
}