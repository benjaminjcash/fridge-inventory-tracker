import axios from 'axios';
import { getStorage } from '../utils/storage';
import { UPC_RESPONSE, ADDED_DATA, NO_PRODUCT_FOUND } from '../utils/constants';

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
  const accessToken = getStorage('access_token');
  return (dispatch) => {
    const PRODUCT_ENDPOINT = `/api/product/${barcode}`;
    axios.get(`${PRODUCT_ENDPOINT}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((res) => {
      const data = res.data;
      if(!data.success) {
        dispatch({
          type: NO_PRODUCT_FOUND
        });
      } else {
        dispatch({
          type: PRODUCT_FOUND,
          data
        });
      }
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