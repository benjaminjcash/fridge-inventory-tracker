import axios from 'axios';
import { LOGGED_IN, CHECK_LOGGED_IN, DISPATCH_ERROR } from '../utils/constants';
import { setStorage, getStorage, storageHasData } from '../utils/storage';

export const requestLogin = (credentials) => {
  return (dispatch) => {
    axios.post('/api/auth/login', credentials).then((res) => {
      if(res.data.success) {
        setStorage('loggedIn', true);
        setStorage('access_token', res.data.access_token);
        setStorage('refresh_token', res.data.refresh_token);
        dispatch({
          type: LOGGED_IN,
          data: {
            loggedIn: true
          }
        });
      }
    }).catch((err) => {
      let errorMessage = err.response?.data?.error;
      dispatch({
        type: DISPATCH_ERROR,
        message: errorMessage
      });
    });
  }
}

export const checkLoggedIn = () => {
  return (dispatch) => {
    if(!storageHasData()) {
      return dispatch({
        type: CHECK_LOGGED_IN,
        data: {
          loggedIn: false
        }
      });
    }
    if(storageHasData() && !getStorage('loggedIn')) {
      return dispatch({
        type: CHECK_LOGGED_IN,
        data: {
          loggedIn: false
        }
      });
    }
    const accessToken = getStorage('access_token');
    axios.get('/api/user/me', { 
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((res) => {
      if(!res.data.success && res.data.message == 'invalid token') {
        alert('Your session has expired, please log in again.');
        dispatch({
          type: CHECK_LOGGED_IN,
          data: {
            loggedIn: false
          }
        });
      } else {
        dispatch({
          type: CHECK_LOGGED_IN,
          data: {
            loggedIn: true
          }
        });
      }
    }).catch((err) => {
      console.error(err);
    });
  }
}