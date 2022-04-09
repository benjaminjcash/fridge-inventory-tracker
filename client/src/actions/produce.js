import axios from 'axios';
import { getStorage } from '../utils/storage';
import { ADDED_DATA, PRODUCE_FOUND } from '../utils/constants';

export const createProduce = (produce) => {
  const accessToken = getStorage('access_token');
  return (dispatch) => {
    const PRODUCE_ENDPOINT = `/api/produce`;
    axios.post(`${PRODUCE_ENDPOINT}`, produce, {
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
          type: PRODUCE_FOUND,
          data: res.data.data
        });
      }
    }).catch((err) => {
      console.error(err);
    })
  }
}