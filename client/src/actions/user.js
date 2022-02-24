import axios from 'axios';
import { FETCHED_USER } from '../utils/constants';
import { getStorage } from '../utils/storage';

export const fetchUser = () => {
    const accessToken = getStorage('access_token');
    return (dispatch) => {
        axios.get('/api/user/me', { 
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((res) => {
            if(!res.data.success) {
                console.error(res.data.message);
            } else {
                dispatch({
                    type: FETCHED_USER,
                    data: {
                        user: res.data.data
                    }
                });
            }
        }).catch((err) => {
            console.error(err);
        });
    }
}