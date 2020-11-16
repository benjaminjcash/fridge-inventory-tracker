import { REQUEST_LOGIN, DISPATCH_ERROR } from '../constants';
import axios from 'axios';

export const requestLogin = (credentials) => {
    return function(dispatch) {
        axios.post('http://localhost:3001/api/auth/login', credentials).then((res) => {
            if(res.data.success) {
                const data = {
                    token: res.headers['auth-token']
                }
                dispatch({
                    type: REQUEST_LOGIN,
                    data
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