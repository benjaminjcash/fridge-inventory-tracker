import axios from 'axios';
import { LOGGED_IN, DISPATCH_ERROR } from '../utils/constants';
import { setStorage, getStorage, storageHasData } from '../utils/storage';

export const requestLogin = (credentials) => {
    return (dispatch) => {
        axios.post('http://localhost:3001/api/auth/login', credentials).then((res) => {
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
        const loggedIn = storageHasData() ? getStorage('loggedIn') : false;
        dispatch({
            type: LOGGED_IN,
            data: {
                loggedIn
            }
        });
    }
}