import axios from 'axios';
import { getStorage } from '../utils/storage';
import { UPC_RESPONSE, ADDED_DATA, NO_PRODUCT_FOUND, PRODUCT_FOUND, CLEAR_UPC, CLEAR_PRODUCT, FETCHED_ALL_PRODUCTS, UPDATED_DATA } from '../utils/constants';

export const lookupUPC = (barcode) => {
  const accessToken = getStorage('access_token');
  return (dispatch) => {
    const UPC_ENDPOINT = `/api/product/upc/${barcode}`;
    axios.get(`${UPC_ENDPOINT}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((res) => {
      if(res.data.items.length > 0) {
        dispatch({
          type: UPC_RESPONSE,
          data: res.data.items[0]
        });
      } else {
        alert("Unable to locate item in UPC database.");
        dispatch({
          type: UPC_RESPONSE,
          data: {}
        });
      }
    }).catch((err) => {
      console.error(err);
    });
  }
}

/**
 * 
 * @param {*} SearchRequest 
    SearchRequest {
      s (string, optional),
      type (string, optional),
      offset (number, optional),
      match_mode (number, optional),
      filter (Inline Model 1, optional)
    }
    Inline Model 1 {
      brand (string, optional),
      category (string, optional),
      title (string, optional),
      model (string, optional)
    }
 * @returns 
 */

/**
 {
  "s": "iphone 6",
  "type": "product",
  "offset": 0,
  "match_mode": 1,
  "filter": {
    "brand": "apple",
    "category": "phones",
    "title": "64gb",
    "model": "mg5a2ll"
    }
  }
*/

export const searchUPC = (query) => {
  const accessToken = getStorage('access_token');
  return (dispatch) => {
    const UPC_ENDPOINT = `/api/product/upc/search`;
    axios.post(`${UPC_ENDPOINT}`, query, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((res) => {
      dispatch({
        type: UPC_RESPONSE,
        data: res.data
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
          data: data.data[0]
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
        dispatch({
          type: PRODUCT_FOUND,
          data: res.data.data
        });
      }
    }).catch((err) => {
      console.error(err);
    })
  }
}

export const setUPC = (upcProduct) => {
  return (dispatch) => {
    dispatch({
      type: UPC_RESPONSE,
      data: upcProduct
    });
  }
}

export const clearUPC = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_UPC
    })
  }
}

export const clearProduct = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_PRODUCT
    })
  }
}

export const fetchAllProducts = () => {
  const accessToken = getStorage('access_token');
  return (dispatch) => {
    const PRODUCT_ENDPOINT = `/api/product`;
    axios.get(`${PRODUCT_ENDPOINT}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((res) => {
      if(res.data.success) {
        dispatch({
          type: FETCHED_ALL_PRODUCTS,
          data: res.data.data
        });
      } else {
        console.error('error fetching products');
      }
    }).catch((err) => {
      console.error(err);
    })
  }
}

export const updateProduct = (id, product) => {
  const PRODUCT_ENDPOINT = `/api/product`;
  const accessToken = getStorage('access_token');
  return (dispatch) => {
    axios.put(`${PRODUCT_ENDPOINT}/${id}`, product, {
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

export const deleteProduct = (product) => {
  console.log('delete product');
  console.log(product)
  // const accessToken = getStorage('access_token');
  // return (dispatch) => {
  //   const PRODUCT_ENDPOINT = `/api/product`;
  //   axios.get(`${PRODUCT_ENDPOINT}/`, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`
  //     }
  //   }).then((res) => {
  //     if(res.data.success) {
  //       dispatch({
  //         type: FETCHED_ALL_PRODUCTS,
  //         data: res.data.data
  //       });
  //     } else {
  //       console.error('error fetching products');
  //     }
  //   }).catch((err) => {
  //     console.error(err);
  //   })
  // }
}