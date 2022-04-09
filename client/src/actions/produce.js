import axios from 'axios';
import { getStorage } from '../utils/storage';
import { ADDED_DATA, PRODUCE_FOUND, NO_PRODUCE_FOUND, PRODUCES_FOUND, CLEAR_PRODUCE, CLEAR_PRODUCES, FETCHED_ALL_PRODUCES, UPDATED_PRODUCE, DELETED_PRODUCE } from '../utils/constants';

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

export const searchProduce = (name) => {
  const accessToken = getStorage('access_token');
  return (dispatch) => {
    const PRODUCE_ENDPOINT = `/api/produce/${name}`;
    axios.get(`${PRODUCE_ENDPOINT}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((res) => {
      const data = res.data;
      if(!data.success) {
        dispatch({
          type: NO_PRODUCE_FOUND
        });
      } else {
        dispatch({
          type: PRODUCES_FOUND,
          data: data.data
        });
      }
    }).catch((err) => {
      console.error(err);
    })
  }
}

export const clearProduce = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_PRODUCE
    });
  }
}

export const clearProduces = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_PRODUCES
    });
  }
}

export const setProduce = (produce) => {
  return dispatch => {
    dispatch({
      type: PRODUCE_FOUND,
      data: produce
    });
  }
}

export const fetchAllProduces = () => {
  const accessToken = getStorage('access_token');
  return (dispatch) => {
    const PRODUCE_ENDPOINT = `/api/produce`;
    axios.get(`${PRODUCE_ENDPOINT}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((res) => {
      if(res.data.success) {
        dispatch({
          type: FETCHED_ALL_PRODUCES,
          data: res.data.data
        });
      } else {
        console.error('error fetching produces');
      }
    }).catch((err) => {
      console.error(err);
    })
  }
}

export const updateProduce = (id, produce) => {
  const PRODUCE_ENDPOINT = `/api/produce`;
  const accessToken = getStorage('access_token');
  return (dispatch) => {
    axios.put(`${PRODUCE_ENDPOINT}/${id}`, produce, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((res) => {
      if(!res.data.success) {
        console.error(res.data.error);
      } else {
        dispatch({
          type: UPDATED_PRODUCE
        });
      }
    }).catch((err) => {
      console.error(err);
    });
  }
}

export const deleteProduce = (produce) => {
  const PRODUCE_ENDPOINT = `/api/produce`;
  const accessToken = getStorage('access_token');
  return (dispatch) => {
      axios.delete(`${PRODUCE_ENDPOINT}/${produce._id}`, {
          headers: {
              Authorization: `Bearer ${accessToken}`
          }
      }).then((res) => {
          if(!res.data.success) {
              console.error(res.data.message);
          } else {
              dispatch({
                  type: DELETED_PRODUCE
              });
          }
      }).catch((err) => {
          console.error(err);
      })
  }
}